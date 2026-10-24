"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import { AnimatePresence, animate, motion, useMotionTemplate, useMotionValue, useTransform } from "motion/react"
import { isOn, playFromGesture } from "@lib/sound"
import { Wave } from "./SoundToggle"

const EASE_OUT = [0.16, 1, 0.3, 1]
const EASE_IN_OUT = [0.76, 0, 0.24, 1]
const INK = "237, 232, 220"
const GOLD = "#e8b254"
const START = (-100 * Math.PI) / 180 // where the ghost enso begins, just left of twelve o'clock
const ENOUGH = (300 * Math.PI) / 180 // how far round a stroke has to travel to count as a circle

/*
 * The way in is drawn, not clicked. The Existence mark is a hand-drawn ring, an enso, so
 * the door is a small ritual: a ghost enso traces itself while the site loads, then the
 * visitor draws the circle in ink. Letting go of a closed circle is a real gesture, so the
 * score starts, and the drawn circle itself becomes the iris that opens onto the site.
 * Enter draws it for keyboard users; after two misses a plain tap works too.
 */

// a brush ring: thick where it starts, tapering into the gap where it ends
function ensoPath(cx, cy, R) {
	const n = 180
	const outer = []
	const inner = []
	for (let i = 0; i <= n; i++) {
		const t = i / n
		const a = START + t * ((350 * Math.PI) / 180)
		const r = R * (1 + 0.022 * Math.sin(3 * a + 1) + 0.012 * Math.sin(7 * a + 2))
		const w = 12 * Math.pow(1 - t, 0.55) + 1.2
		outer.push([cx + Math.cos(a) * (r + w / 2), cy + Math.sin(a) * (r + w / 2)])
		inner.push([cx + Math.cos(a) * (r - w / 2), cy + Math.sin(a) * (r - w / 2)])
	}
	return "M" + [...outer, ...inner.reverse()].map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(" L") + " Z"
}

// how circular is a stroke: centre, mean radius, how far round it travelled, how even it is
function analyse(points) {
	if (points.length < 8) return null
	let cx = 0
	let cy = 0
	for (const p of points) {
		cx += p.x
		cy += p.y
	}
	cx /= points.length
	cy /= points.length
	let sweep = 0
	let prev = Math.atan2(points[0].y - cy, points[0].x - cx)
	let sum = 0
	const radii = []
	for (const p of points) {
		const a = Math.atan2(p.y - cy, p.x - cx)
		let d = a - prev
		if (d > Math.PI) d -= 2 * Math.PI
		if (d < -Math.PI) d += 2 * Math.PI
		sweep += d
		prev = a
		const r = Math.hypot(p.x - cx, p.y - cy)
		radii.push(r)
		sum += r
	}
	const meanR = sum / radii.length
	const sd = Math.sqrt(radii.reduce((acc, r) => acc + (r - meanR) ** 2, 0) / radii.length)
	return { cx, cy, meanR, sweep: Math.abs(sweep), roundness: meanR ? sd / meanR : 1 }
}

const isCircle = (s) => s && s.meanR > 28 && s.sweep >= ENOUGH && s.roundness < 0.42

export default function Preloader({ onEnter }) {
	const [count, setCount] = useState(0)
	const [phase, setPhase] = useState("loading") // loading, ready, leaving, gone
	const [soundOn, setSoundOn] = useState(true)
	const [touch, setTouch] = useState(false)
	const [progress, setProgress] = useState(0) // 0..1 of the way round, while drawing
	const [drawing, setDrawing] = useState(false)
	const [misses, setMisses] = useState(0)
	const [inkFading, setInkFading] = useState(false)
	const [glow, setGlow] = useState(false)

	const gate = useRef(null)
	const guide = useRef(null)
	const canvas = useRef(null)
	const stroke = useRef({ points: [], last: null, width: 10, time: 0 })
	// pointer moves can arrive before React re-renders, so the drawing flag lives in a ref too
	const isDrawing = useRef(false)

	// the iris: a transparent circle growing from the centre of the drawn ring
	const x = useMotionValue(0)
	const y = useMotionValue(0)
	const r = useMotionValue(0)
	const rEdge = useTransform(r, (v) => v + 1.5)
	const mask = useMotionTemplate`radial-gradient(circle at ${x}px ${y}px, transparent ${r}px, #000 ${rEdge}px)`
	const ringSize = useTransform(r, (v) => v * 2)
	const ringLeft = useTransform(() => x.get() - r.get())
	const ringTop = useTransform(() => y.get() - r.get())
	const ringOpacity = useMotionValue(0)

	const ghost = useMemo(() => ensoPath(200, 200, 150), [])

	useEffect(() => {
		setSoundOn(isOn())
		setTouch(!window.matchMedia("(hover: hover) and (pointer: fine)").matches)
	}, [])

	// the ink canvas covers the screen at device resolution
	useEffect(() => {
		const fit = () => {
			const c = canvas.current
			if (!c) return
			const dpr = Math.min(window.devicePixelRatio || 1, 2)
			c.width = Math.round(window.innerWidth * dpr)
			c.height = Math.round(window.innerHeight * dpr)
			c.getContext("2d").setTransform(dpr, 0, 0, dpr, 0, 0)
		}
		fit()
		window.addEventListener("resize", fit)
		return () => window.removeEventListener("resize", fit)
	}, [])

	// count to one hundred while the ghost enso traces itself, then wait for the visitor
	useEffect(() => {
		const t0 = performance.now()
		const duration = 1700
		let raf
		let ready
		const tick = (t) => {
			const p = Math.min(1, (t - t0) / duration)
			setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100))
			if (p < 1) raf = requestAnimationFrame(tick)
			else ready = setTimeout(() => setPhase("ready"), 300)
		}
		raf = requestAnimationFrame(tick)
		// frames pause in background tabs; never leave the visitor stuck on the counter
		const fallback = setTimeout(() => {
			setCount(100)
			setPhase((p) => (p === "loading" ? "ready" : p))
		}, 3800)
		return () => {
			cancelAnimationFrame(raf)
			clearTimeout(ready)
			clearTimeout(fallback)
		}
	}, [])

	useEffect(() => {
		if (phase === "ready") gate.current?.focus({ preventScroll: true })
	}, [phase])

	// ---- ink ------------------------------------------------------------------------------

	const ctx = () => canvas.current?.getContext("2d")

	const clearInk = () => {
		const c = canvas.current
		if (c) ctx().clearRect(0, 0, c.width, c.height)
	}

	// one stretch of brush: wide when slow, thin when fast, with dry bristle streaks beside it
	const brush = (from, to, dt) => {
		const g = ctx()
		if (!g) return
		const s = stroke.current
		const dist = Math.hypot(to.x - from.x, to.y - from.y)
		const speed = dist / Math.max(dt, 1)
		const target = Math.max(2.5, Math.min(15, 15 - speed * 6))
		s.width += (target - s.width) * 0.3
		const w = s.width
		const steps = Math.max(1, Math.ceil(dist))
		const nx = -(to.y - from.y) / (dist || 1)
		const ny = (to.x - from.x) / (dist || 1)
		g.fillStyle = `rgba(${INK}, 0.9)`
		for (let i = 0; i <= steps; i++) {
			const t = i / steps
			const px = from.x + (to.x - from.x) * t
			const py = from.y + (to.y - from.y) * t
			g.beginPath()
			g.arc(px, py, w / 2, 0, Math.PI * 2)
			g.fill()
		}
		g.lineCap = "round"
		for (const off of [-0.62, -0.42, 0.44, 0.66]) {
			if (Math.random() < 0.18) continue
			g.strokeStyle = `rgba(${INK}, ${0.18 + Math.random() * 0.2})`
			g.lineWidth = Math.max(0.6, w * 0.12)
			g.beginPath()
			g.moveTo(from.x + nx * off * w, from.y + ny * off * w)
			g.lineTo(to.x + nx * off * w, to.y + ny * off * w)
			g.stroke()
		}
	}

	const addPoint = (p) => {
		const s = stroke.current
		const now = performance.now()
		if (s.last) brush(s.last, p, now - s.time)
		s.last = p
		s.time = now
		s.points.push(p)
	}

	// ---- the way in -------------------------------------------------------------------------

	// the drawn ring becomes the iris: it opens from the ring's centre, starting at its size
	const open = (cx, cy, startR) => {
		setPhase("leaving")
		onEnter?.()
		x.set(cx)
		y.set(cy)
		r.set(startR)
		const far = Math.hypot(Math.max(cx, window.innerWidth - cx), Math.max(cy, window.innerHeight - cy))
		const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
		ringOpacity.set(reduce ? 0 : 1)
		animate(r, far + 8, {
			delay: reduce ? 0 : 0.25,
			duration: reduce ? 0.35 : 1.6,
			ease: EASE_IN_OUT,
			onComplete: () => setPhase("gone")
		})
		if (!reduce) animate(ringOpacity, 0, { delay: 1.3, duration: 0.55 })
	}

	const guideCircle = () => {
		const b = guide.current.getBoundingClientRect()
		return { cx: b.left + b.width / 2, cy: b.top + b.height / 2, R: (b.width / 2) * 0.75 }
	}

	const onPointerDown = (e) => {
		if (phase !== "ready") return
		try {
			e.currentTarget.setPointerCapture(e.pointerId)
		} catch {}
		setInkFading(false)
		clearInk()
		stroke.current = { points: [], last: null, width: 10, time: performance.now() }
		addPoint({ x: e.clientX, y: e.clientY })
		isDrawing.current = true
		setDrawing(true)
		setProgress(0)
	}

	const onPointerMove = (e) => {
		if (!isDrawing.current || phase !== "ready") return
		// coalesced events give a smoother line where supported; the list can be missing or empty
		const list = e.nativeEvent.getCoalescedEvents?.()
		const events = list && list.length ? list : [e.nativeEvent]
		for (const ev of events) addPoint({ x: ev.clientX, y: ev.clientY })
		const s = analyse(stroke.current.points)
		setProgress(s ? Math.min(1, s.sweep / ENOUGH) : 0)
	}

	const onPointerUp = (e) => {
		if (!isDrawing.current || phase !== "ready") return
		isDrawing.current = false
		setDrawing(false)
		const pts = stroke.current.points
		const s = analyse(pts)
		if (isCircle(s)) {
			// letting go is the gesture that lets the sound start
			playFromGesture()
			setGlow(true)
			open(s.cx, s.cy, s.meanR)
			return
		}
		// after two misses, a plain tap is enough
		const tiny = !s || s.meanR < 12
		if (misses >= 2 && tiny) {
			playFromGesture()
			open(e.clientX, e.clientY, 0)
			return
		}
		setMisses((m) => m + 1)
		setProgress(0)
		setInkFading(true)
		setTimeout(() => {
			clearInk()
			setInkFading(false)
		}, 700)
	}

	// keyboard: Enter draws the circle on its own, then opens it
	const autoDraw = () => {
		if (phase !== "ready" || isDrawing.current) return
		playFromGesture()
		const { cx, cy, R } = guideCircle()
		clearInk()
		stroke.current = { points: [], last: null, width: 13, time: performance.now() }
		const t0 = performance.now()
		const span = (348 * Math.PI) / 180
		const step = (now) => {
			const t = Math.min(1, (now - t0) / 850)
			const a = START + span * (1 - Math.pow(1 - t, 2))
			addPoint({ x: cx + Math.cos(a) * R, y: cy + Math.sin(a) * R })
			setProgress(t)
			if (t < 1) requestAnimationFrame(step)
			else {
				setGlow(true)
				open(cx, cy, R)
			}
		}
		requestAnimationFrame(step)
	}

	if (phase === "gone") return null

	const ready = phase === "ready"
	const done = progress >= 1
	let hint = touch ? "Trace it with your finger" : "Hold and draw · or press Enter"
	if (drawing) hint = done ? "Let go" : "Keep going"
	else if (misses === 1) hint = "Close the circle"
	else if (misses >= 2) hint = touch ? "Close the circle · or just tap" : "Close the circle · or just click"

	return (
		<>
			<motion.div
				ref={gate}
				role={ready ? "button" : undefined}
				tabIndex={ready ? 0 : -1}
				aria-label={ready ? "Draw a circle, or press Enter, to enter the site" : "Loading"}
				onPointerDown={onPointerDown}
				onPointerMove={onPointerMove}
				onPointerUp={onPointerUp}
				onPointerCancel={onPointerUp}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						e.preventDefault()
						autoDraw()
					}
				}}
				className="group fixed inset-0 z-[100] touch-none select-none bg-ink text-paper outline-none"
				style={phase === "leaving" ? { WebkitMaskImage: mask, maskImage: mask } : undefined}
			>
				{/*
				 * One column, so nothing can overlap at any size: the middle holds the words and the ring,
				 * the bottom holds the quote and the corner marks. Phones and upright tablets stack the words
				 * above and below the ring; laptops and phones held sideways put them either side of it.
				 */}
				<motion.div
					className="gutter pointer-events-none absolute inset-0 flex flex-col pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1.5rem,env(safe-area-inset-top))] sm:pb-[max(2rem,env(safe-area-inset-bottom))]"
					animate={{ opacity: phase === "leaving" ? 0 : 1 }}
					transition={{ duration: 0.35 }}
				>
					{/* the middle */}
					<div className="flex min-h-0 flex-1 items-center justify-center py-4">
						<div className="flex flex-col items-center gap-[clamp(1rem,4svh,2.5rem)] lg:flex-row lg:gap-14 short:flex-row short:gap-8">
							<motion.p
								className="label w-max text-center lg:w-60 lg:text-right short:w-36 short:text-right"
								animate={{ opacity: ready ? 0.9 : 0 }}
								transition={{ duration: 0.9, ease: EASE_OUT }}
							>
								Draw the circle
							</motion.p>

							{/* the ghost enso: traces itself while loading, brightens as the visitor's circle comes round */}
							<div
								ref={guide}
								className="relative aspect-square w-[min(66vw,34svh,24rem)] shrink-0 lg:w-[min(30vw,50svh,24rem)] short:w-[min(36vw,50svh)]"
							>
								<svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
									<defs>
										<mask id="enso-reveal">
											<circle
												cx="200"
												cy="200"
												r="150"
												fill="none"
												stroke="#fff"
												strokeWidth="44"
												pathLength="1"
												strokeDasharray="1"
												strokeDashoffset={1 - count / 100}
												transform="rotate(-100 200 200)"
											/>
										</mask>
									</defs>
									<motion.path
										d={ghost}
										mask="url(#enso-reveal)"
										animate={{
											fill: done || glow ? GOLD : "#ede8dc",
											opacity: phase === "loading" ? 0.22 : 0.12 + 0.6 * progress,
											scale: 1 + 0.035 * progress
										}}
										transition={{ duration: 0.5, ease: EASE_OUT }}
										style={{ transformOrigin: "200px 200px" }}
									/>
								</svg>
								<AnimatePresence>
									{phase === "loading" && (
										<motion.span
											key="count"
											className="label num absolute inset-0 flex items-center justify-center !opacity-70"
											exit={{ opacity: 0, filter: "blur(6px)" }}
											transition={{ duration: 0.4 }}
										>
											{String(count).padStart(3, "0")}
										</motion.span>
									)}
								</AnimatePresence>
							</div>

							<div className="min-h-[1.2rem] w-max max-w-[80vw] text-center lg:w-60 lg:text-left short:w-36 short:text-left">
								{ready && (
									<motion.p
										key={hint}
										className={`label ${done ? "!text-sol !opacity-100" : "!opacity-55"}`}
										initial={{ opacity: 0, y: 6 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.4 }}
									>
										{hint}
									</motion.p>
								)}
							</div>
						</div>
					</div>

					{/* the bottom: quote above the corner marks on narrow screens, centred between them on wide ones */}
					<div className="flex flex-col gap-6 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-end lg:gap-8">
						<motion.figure
							className="max-w-[26rem] lg:col-start-2 lg:row-start-1 lg:w-[26rem] lg:text-center short:hidden"
							initial={{ opacity: 0, y: 8 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.4, duration: 1.2, ease: EASE_OUT }}
						>
							<blockquote className="serif-it text-[1rem] leading-snug opacity-85 sm:text-[1.15rem]">
								&ldquo;Nature is an infinite sphere whose center is everywhere and whose circumference is nowhere.&rdquo;
							</blockquote>
							<figcaption className="label mt-2.5">Blaise Pascal</figcaption>
						</motion.figure>

						<div className="flex items-end justify-between lg:contents">
							<div className="flex items-center gap-4 lg:col-start-1 lg:row-start-1">
								{/* the blend sits on the spinning wrapper: a transformed element only blends with what is inside it */}
								<span className="relative block h-9 w-9 animate-spin-slow mix-blend-screen">
									<Image src="/existencering.png" alt="" fill sizes="36px" className="object-contain" priority />
								</span>
								<span className="label !opacity-80">Existence</span>
							</div>
							<span className={`flex items-center gap-3 lg:col-start-3 lg:row-start-1 lg:justify-self-end ${soundOn ? "sound-on" : ""}`}>
								<Wave />
								<span className="label !opacity-80">{soundOn ? "Sound on" : "Sound off"}</span>
							</span>
						</div>
					</div>
				</motion.div>

				{/* the ink, above everything else on the screen */}
				<canvas
					ref={canvas}
					className="pointer-events-none absolute inset-0 h-full w-full transition-[opacity,filter] duration-700"
					style={{
						opacity: inkFading ? 0 : 1,
						filter: glow ? "drop-shadow(0 0 14px rgba(232,178,84,0.55))" : "none"
					}}
				/>
			</motion.div>

			{/* the ring on the iris edge; outside the mask so the mask cannot hide it */}
			{phase === "leaving" && (
				<motion.span
					aria-hidden="true"
					className="pointer-events-none fixed z-[101] rounded-full border border-paper/60"
					style={{ width: ringSize, height: ringSize, left: ringLeft, top: ringTop, opacity: ringOpacity }}
				/>
			)}
		</>
	)
}
