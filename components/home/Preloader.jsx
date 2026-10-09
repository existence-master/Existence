"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "motion/react"

/* A counter to one hundred, then the curtain lifts. */
export default function Preloader({ onDone }) {
	const [n, setN] = useState(0)
	const [gone, setGone] = useState(false)

	useEffect(() => {
		const t0 = performance.now()
		const dur = 1500
		let raf
		const tick = (t) => {
			const p = Math.min(1, (t - t0) / dur)
			const eased = 1 - Math.pow(1 - p, 3)
			setN(Math.round(eased * 100))
			if (p < 1) raf = requestAnimationFrame(tick)
			else setTimeout(() => setGone(true), 250)
		}
		raf = requestAnimationFrame(tick)
		const fallback = setTimeout(() => setGone(true), 3500)
		return () => {
			cancelAnimationFrame(raf)
			clearTimeout(fallback)
		}
	}, [])

	return (
		<AnimatePresence onExitComplete={onDone}>
			{!gone && (
				<motion.div
					key="curtain"
					className="fixed inset-0 z-[100] flex items-end justify-between bg-ink px-6 pb-6 text-paper sm:px-10 sm:pb-8"
					exit={{ y: "-100%" }}
					transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
				>
					<div className="flex items-center gap-4">
						<span className="relative block h-9 w-9 animate-spin-slow">
							<Image src="/existencering.png" alt="" fill sizes="36px" className="object-contain" priority />
						</span>
						<span className="label !opacity-80">Existence</span>
					</div>
					<span className="mega num text-[22vw] leading-none sm:text-[12vw]">{String(n).padStart(3, "0")}</span>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
