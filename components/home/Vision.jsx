"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { Marquee, Rise } from "./ui"

/* The page turns to paper. One line, enormous, rising out of the fold. */
export default function Vision() {
	const ref = useRef(null)
	const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
	const ringRotate = useTransform(scrollYProgress, [0, 1], [0, 180])
	const ringY = useTransform(scrollYProgress, [0, 1], ["-10%", "30%"])

	return (
		<section
			id="vision"
			ref={ref}
			data-theme-section="paper"
			className="relative overflow-hidden py-[22vh] sm:py-[26vh]"
		>
			{/* a huge outlined ring drifting behind the words */}
			<motion.div
				style={{ rotate: ringRotate, y: ringY }}
				className="pointer-events-none absolute -right-[20vw] top-0 h-[90vw] w-[90vw] sm:-right-[12vw] sm:h-[60vw] sm:w-[60vw]"
				aria-hidden="true"
			>
				<svg viewBox="0 0 100 100" className="h-full w-full opacity-[0.18]">
					<circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="0.35" strokeDasharray="0.6 1.4" />
					<circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="0.25" />
				</svg>
			</motion.div>

			<div className="relative px-6 sm:px-10">
				<div className="mb-10 flex items-center gap-4 sm:mb-16">
					<span className="label !opacity-100">01</span>
					<span className="h-px w-10 bg-current opacity-40" />
					<span className="label">Vision</span>
				</div>

				<h2 className="mega text-[13.5vw] sm:text-[10.5vw]">
					<Rise>Technology</Rise>
					<Rise delay={0.08}>at the</Rise>
					<Rise delay={0.16}>
						<span className="serif-it text-[1.08em] tracking-normal">frontiers</span>
					</Rise>
					<Rise delay={0.24}>of tomorrow</Rise>
				</h2>

			</div>

			{/* the line keeps going, outlined, at the foot of the section */}
			<div className="mt-[18vh] border-y border-[var(--line)] py-3">
				<Marquee>
					{[0, 1, 2].map((i) => (
						<span key={i} className="mega outline whitespace-nowrap px-6 text-[9vw] sm:text-[6vw]">
							Make the impossible ordinary
							<span className="mx-6 inline-block h-[0.5em] w-[0.5em] rounded-full bg-current align-middle opacity-70" />
						</span>
					))}
				</Marquee>
			</div>
		</section>
	)
}
