"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "motion/react"
import { Magnetic, Rise } from "./ui"

/*
 * Back to black. The name is pinned and outlined; scrolling pours the ink in from the left,
 * while the sentence slides across underneath it.
 */
export default function Sentient() {
	const ref = useRef(null)
	const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
	const fill = useTransform(scrollYProgress, [0.05, 0.75], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"])
	const slide = useTransform(scrollYProgress, [0, 1], ["20vw", "-60vw"])
	const badgeRotate = useTransform(scrollYProgress, [0, 1], [0, 360])
	const subOpacity = useTransform(scrollYProgress, [0.55, 0.75], [0, 1])
	const subY = useTransform(scrollYProgress, [0.55, 0.75], [30, 0])

	return (
		<section id="sentient" ref={ref} data-theme-section="ink" className="relative h-[280vh]">
			<div className="sticky top-0 flex h-[100svh] flex-col justify-between overflow-hidden px-6 pb-8 pt-28 sm:px-10">
				<div className="flex items-center gap-4">
					<span className="label !opacity-100">02</span>
					<span className="h-px w-10 bg-current opacity-40" />
					<span className="label">Our Products</span>
				</div>

				<div className="relative">
					{/* outlined name with the solid name poured in over it */}
					<div className="relative">
						<h2 className="mega outline text-[23vw] leading-[0.8] sm:text-[19vw]" aria-hidden="true">
							Sentient
						</h2>
						<motion.h2
							style={{ clipPath: fill }}
							className="mega absolute inset-0 text-[23vw] leading-[0.8] sm:text-[19vw]"
						>
							Sentient
						</motion.h2>
					</div>

					{/* the sentence, sliding under the name */}
					<motion.p
						style={{ x: slide }}
						className="mt-6 whitespace-nowrap font-grotesk text-[6vw] leading-none tracking-[-0.03em] sm:text-[3.4vw]"
					>
						Your personal AI assistant,{" "}
						<span className="serif-it text-[1.15em]">running on your own computer.</span>
						<span className="mx-[2vw] opacity-30">/</span>
						Open source.
						<span className="mx-[2vw] opacity-30">/</span>
						Yours.
					</motion.p>
				</div>

				<motion.div style={{ opacity: subOpacity, y: subY }} className="flex items-end justify-between gap-6">
					<div className="flex items-center gap-5">
						<div className="relative h-20 w-20 sm:h-28 sm:w-28">
							<motion.svg style={{ rotate: badgeRotate }} viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
								<defs>
									<path id="badge" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
								</defs>
								<text className="font-mono" fontSize="7.2" letterSpacing="1.6" fill="currentColor">
									<textPath href="#badge">OPEN SOURCE · RUNS ON YOUR COMPUTER · </textPath>
								</text>
							</motion.svg>
							<span className="absolute inset-[30%]">
								<Image src="/sentient.svg" alt="" fill sizes="40px" className="object-contain mix-blend-screen" />
							</span>
						</div>
						<p className="label hidden max-w-[16rem] !normal-case !tracking-normal sm:block">
							Long-running tasks, real memory, proactive help, voice, phones and smart glasses.
						</p>
					</div>
					<Magnetic>
						<a
							href="https://github.com/existence-master/sentient"
							target="_blank"
							rel="noreferrer"
							className="pill"
							data-cursor="open"
						>
							Learn more <span aria-hidden="true">↗</span>
						</a>
					</Magnetic>
				</motion.div>
			</div>
		</section>
	)
}
