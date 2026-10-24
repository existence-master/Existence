"use client"

import { useEffect, useRef, useState } from "react"
import { Ambient } from "@lib/ambient"

const KEY = "existence-sound"

const readPref = () => {
	try {
		return localStorage.getItem(KEY) === "on"
	} catch {
		return false
	}
}
const writePref = (on) => {
	try {
		localStorage.setItem(KEY, on ? "on" : "off")
	} catch {}
}

/*
 * The sound switch in the navbar. Browsers only allow sound after the visitor interacts,
 * so the score starts off; turning it on is remembered, and on a return visit it resumes
 * at the first tap or key press. It fades out whenever the tab is hidden.
 */
export default function SoundToggle() {
	const [on, setOn] = useState(false)
	const engine = useRef(null)
	const wanted = useRef(false)

	const getEngine = () => {
		if (!engine.current) {
			engine.current = new Ambient()
			// development only: lets the engine be measured from the console
			if (process.env.NODE_ENV !== "production") window.__ambient = engine.current
		}
		return engine.current
	}

	const play = () => {
		// on iPhones this lets the score play even with the ringer switch on silent
		try {
			if (navigator.audioSession) navigator.audioSession.type = "playback"
		} catch {}
		const e = getEngine()
		e.start()
		e.setProgress(progress())
		setOn(true)
	}

	const pause = () => {
		engine.current?.stop()
		setOn(false)
	}

	const toggle = () => {
		wanted.current = !on
		writePref(wanted.current)
		wanted.current ? play() : pause()
	}

	// returning visitors who left the sound on: resume at their first interaction
	useEffect(() => {
		if (!readPref()) return
		wanted.current = true
		const resume = (e) => {
			// a tap on the toggle itself is handled by the toggle
			if (!e.target?.closest?.("[data-sound-toggle]") && wanted.current) play()
			cleanup()
		}
		const cleanup = () => {
			window.removeEventListener("pointerdown", resume, true)
			window.removeEventListener("keydown", resume, true)
		}
		window.addEventListener("pointerdown", resume, true)
		window.addEventListener("keydown", resume, true)
		return cleanup
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	// the score follows the page: harmony and brightness shift as you scroll
	useEffect(() => {
		const onScroll = () => engine.current?.setProgress(progress())
		window.addEventListener("scroll", onScroll, { passive: true })
		return () => window.removeEventListener("scroll", onScroll)
	}, [])

	// fade out when the tab is hidden, back in when it returns
	useEffect(() => {
		const onVisibility = () => {
			if (!engine.current || !wanted.current) return
			if (document.hidden) engine.current.stop()
			else engine.current.start()
		}
		document.addEventListener("visibilitychange", onVisibility)
		return () => document.removeEventListener("visibilitychange", onVisibility)
	}, [])

	useEffect(() => () => engine.current?.stop(), [])

	return (
		<button
			type="button"
			data-sound-toggle
			data-cursor={on ? "mute" : "sound"}
			onClick={toggle}
			aria-pressed={on}
			aria-label={on ? "Turn sound off" : "Turn sound on"}
			className={`relative flex h-11 w-11 items-center justify-center ${on ? "sound-on" : ""}`}
		>
			{/* off: a flat line, silence. on: the same line swells into a travelling sine wave */}
			<svg width="22" height="12" viewBox="0 0 22 12" className="overflow-hidden" aria-hidden="true">
				<g className="wave-amp">
					<path className="wave-run" d={WAVE} fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
				</g>
			</svg>
		</button>
	)
}

// two and a bit periods of a sine (period 11), so it can slide one period and loop seamlessly
const WAVE = (() => {
	let d = ""
	for (let x = 0; x <= 33; x += 0.5) d += `${x === 0 ? "M" : "L"}${x} ${(6 - Math.sin((x / 11) * Math.PI * 2) * 4).toFixed(2)} `
	return d.trim()
})()

function progress() {
	const max = document.documentElement.scrollHeight - window.innerHeight
	return max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
}
