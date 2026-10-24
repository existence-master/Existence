"use client"

import { useRef } from "react"
import dynamic from "next/dynamic"
import { motion, useScroll, useTransform } from "motion/react"

const LiquidWord = dynamic(() => import("@components/three/LiquidWord"), { ssr: false })

export default function Hero() {
	const ref = useRef(null)
	const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
	const y = useTransform(scrollYProgress, [0, 1], ["0%", "35%"])
	const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
	const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15])

	return (
		<section
			id="top"
			ref={ref}
			data-theme-section="ink"
			className="relative flex h-[100svh] items-center justify-center overflow-hidden"
		>
			<motion.div style={{ y, opacity, scale }} className="absolute inset-0">
				<LiquidWord word="EXISTENCE" />
			</motion.div>

			{/* corners */}
			<div className="gutter pointer-events-none absolute inset-x-0 bottom-[max(1.5rem,env(safe-area-inset-bottom))] flex items-end justify-between sm:bottom-[max(2rem,env(safe-area-inset-bottom))]">
				<motion.figure
					className="max-w-[17rem]"
					initial={{ opacity: 0, y: 12 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 2.2, duration: 1 }}
				>
					<blockquote className="serif-it text-[1.15rem] leading-snug opacity-90">
						&ldquo;The best way to predict the future is to invent it.&rdquo;
					</blockquote>
					<figcaption className="label mt-3">Alan Kay</figcaption>
				</motion.figure>
				<motion.div
					className="hidden flex-col items-center gap-3 sm:flex"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 2.4, duration: 1 }}
				>
					<span className="label">Scroll</span>
					<span className="relative block h-12 w-px overflow-hidden bg-[var(--line)]">
						<motion.span
							className="absolute left-0 top-0 h-full w-px bg-paper"
							animate={{ y: ["-100%", "100%"] }}
							transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
						/>
					</span>
				</motion.div>
			</div>
		</section>
	)
}
