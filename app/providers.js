"use client"

import { useEffect } from "react"
import Lenis from "lenis"

export function Providers({ children }) {
	useEffect(() => {
		if ("scrollRestoration" in history) history.scrollRestoration = "manual"
		if (!window.location.hash) window.scrollTo(0, 0)
		const reduce = window.matchMedia(
			"(prefers-reduced-motion: reduce)"
		).matches
		if (reduce) return

		const lenis = new Lenis({
			lerp: 0.085,
			wheelMultiplier: 0.95,
			smoothWheel: true,
			anchors: true
		})
		window.__lenis = lenis

		let raf
		const loop = (t) => {
			lenis.raf(t)
			raf = requestAnimationFrame(loop)
		}
		raf = requestAnimationFrame(loop)

		return () => {
			cancelAnimationFrame(raf)
			lenis.destroy()
			delete window.__lenis
		}
	}, [])

	return children
}
