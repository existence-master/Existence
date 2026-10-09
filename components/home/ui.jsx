"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useSpring } from "motion/react"

/* ---------- custom cursor: a dot that grows into a ring over anything you can click ---------- */
export function Cursor() {
	const x = useMotionValue(-100)
	const y = useMotionValue(-100)
	const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 })
	const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 })
	const [big, setBig] = useState(false)
	const [label, setLabel] = useState("")
	const [enabled, setEnabled] = useState(false)

	useEffect(() => {
		if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return
		setEnabled(true)
		const move = (e) => {
			x.set(e.clientX)
			y.set(e.clientY)
		}
		const over = (e) => {
			const t = e.target.closest("a, button, [data-cursor]")
			setBig(!!t)
			setLabel(t?.dataset?.cursor || "")
		}
		window.addEventListener("pointermove", move, { passive: true })
		window.addEventListener("pointerover", over)
		return () => {
			window.removeEventListener("pointermove", move)
			window.removeEventListener("pointerover", over)
		}
	}, [x, y])

	if (!enabled) return null
	return (
		<motion.div
			style={{ x: sx, y: sy }}
			className="pointer-events-none fixed left-0 top-0 z-[90] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
			aria-hidden="true"
		>
			<motion.div
				animate={{ width: big ? 72 : 10, height: big ? 72 : 10 }}
				transition={{ type: "spring", stiffness: 400, damping: 30 }}
				className="flex items-center justify-center rounded-full bg-white"
			>
				{label ? (
					<span className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-black">{label}</span>
				) : null}
			</motion.div>
		</motion.div>
	)
}

/* ---------- magnetic: the element leans toward the cursor ---------- */
export function Magnetic({ children, strength = 0.35, className = "" }) {
	const ref = useRef(null)
	const x = useMotionValue(0)
	const y = useMotionValue(0)
	const sx = useSpring(x, { stiffness: 180, damping: 18, mass: 0.3 })
	const sy = useSpring(y, { stiffness: 180, damping: 18, mass: 0.3 })

	const onMove = (e) => {
		const r = ref.current.getBoundingClientRect()
		x.set((e.clientX - (r.left + r.width / 2)) * strength)
		y.set((e.clientY - (r.top + r.height / 2)) * strength)
	}
	const onLeave = () => {
		x.set(0)
		y.set(0)
	}

	return (
		<motion.div
			ref={ref}
			onPointerMove={onMove}
			onPointerLeave={onLeave}
			style={{ x: sx, y: sy }}
			className={`inline-block ${className}`}
		>
			{children}
		</motion.div>
	)
}

/* ---------- lines that rise out of a mask when they enter the viewport (plain observer + CSS) ---------- */
export function Rise({ children, delay = 0, className = "" }) {
	const ref = useRef(null)
	useEffect(() => {
		const el = ref.current
		if (!el) return
		if (!("IntersectionObserver" in window)) {
			el.classList.add("in")
			return
		}
		const io = new IntersectionObserver(
			([e]) => {
				if (e.isIntersecting) {
					el.classList.add("in")
					io.disconnect()
				}
			},
			{ threshold: 0.2 }
		)
		io.observe(el)
		return () => io.disconnect()
	}, [])
	return (
		<span ref={ref} className={`mask-line ${className}`} style={{ "--rise-delay": `${delay}s` }}>
			<span>{children}</span>
		</span>
	)
}

/* ---------- marquee strip ---------- */
export function Marquee({ children, reverse = false, className = "" }) {
	return (
		<div className={`flex w-full overflow-hidden ${className}`} aria-hidden="true">
			<div className={`flex w-max shrink-0 ${reverse ? "animate-marquee-rev" : "animate-marquee"}`}>
				{children}
				{children}
			</div>
		</div>
	)
}

/* ---------- theme: each section announces its colour; the page follows ---------- */
export function useTheme() {
	useEffect(() => {
		const sections = Array.from(document.querySelectorAll("[data-theme-section]"))
		const io = new IntersectionObserver(
			(entries) => {
				const best = entries
					.filter((e) => e.isIntersecting)
					.sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
				if (best) document.documentElement.dataset.theme = best.target.dataset.themeSection
			},
			{ threshold: [0.3, 0.5, 0.7], rootMargin: "-25% 0px -25% 0px" }
		)
		sections.forEach((s) => io.observe(s))
		return () => io.disconnect()
	}, [])
}
