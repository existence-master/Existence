"use client"

import Image from "next/image"
import { Rise } from "./ui"

/*
 * Two doors. Mail on the left, GitHub on the right. Whichever you hover swells open
 * and shows the address; the other one narrows to a sliver.
 */
function Door({ href, external, name, value, hint, tone, children }) {
	const paper = tone === "paper"
	return (
		<a
			href={href}
			target={external ? "_blank" : undefined}
			rel={external ? "noreferrer" : undefined}
			data-cursor={external ? "open" : "write"}
			className={`door group relative flex min-h-[46vh] overflow-hidden sm:min-h-0 ${
				paper ? "bg-paper text-ink" : "bg-ink text-paper"
			}`}
		>
			{/* the vertical name, always visible */}
			<div className="absolute left-5 top-6 flex items-center gap-4 sm:left-8 sm:top-8">
				<span className="label !opacity-100">{hint}</span>
			</div>
			<span className="mega vertical absolute bottom-6 left-4 text-[13vw] leading-none opacity-100 transition-opacity duration-700 sm:bottom-8 sm:left-6 sm:text-[9vw] sm:group-hover:opacity-20">
				{name}
			</span>

			{/* what opens */}
			<div className="relative flex w-full flex-col justify-between pb-6 pl-[24vw] pr-6 pt-20 sm:pb-8 sm:pl-[16vw] sm:pr-8 sm:pt-24 sm:opacity-0 sm:transition-all sm:duration-700 sm:[transition-delay:0.15s] sm:group-hover:opacity-100">
				<div className="flex justify-end">{children}</div>
				<div>
					<p className="font-grotesk text-[7vw] leading-[0.95] tracking-[-0.04em] sm:text-[3.6vw]">{value}</p>
					<p className="label mt-5 flex items-center gap-3">
						<span className="inline-block h-px w-8 bg-current transition-all duration-700 group-hover:w-16" />
						{external ? "Opens in a new tab" : "Opens your mail app"}
					</p>
				</div>
			</div>
		</a>
	)
}

export default function Contact() {
	return (
		<section id="contact" data-theme-section="ink" className="relative pt-[18vh]">
			<div className="px-6 sm:px-10">
				<div className="mb-8 flex items-center gap-4 sm:mb-12">
					<span className="label !opacity-100">03</span>
					<span className="h-px w-10 bg-current opacity-40" />
					<span className="label">Contact</span>
				</div>
				<h2 className="mega text-[12vw] sm:text-[6.5vw]">
					<Rise>Two doors.</Rise>
					<Rise delay={0.08}>
						<span className="serif-it">Pick one.</span>
					</Rise>
				</h2>
			</div>

			<div className="mt-10 flex flex-col border-y border-[var(--line)] sm:mt-14 sm:h-[78vh] sm:flex-row">
				<Door
					href="mailto:existence.master@gmail.com"
					name="Mail"
					hint="01 · Write to us"
					value="existence.master@gmail.com"
					tone="paper"
				>
					<svg viewBox="0 0 48 48" className="h-14 w-14 sm:h-20 sm:w-20" fill="none" stroke="currentColor" strokeWidth="1.2">
						<rect x="4" y="10" width="40" height="28" rx="1" />
						<path d="M4 12l20 14 20-14" />
					</svg>
				</Door>
				<Door
					href="https://github.com/existence-master"
					external
					name="GitHub"
					hint="02 · Read the code"
					value="github.com/existence-master"
					tone="ink"
				>
					<span className="relative block h-14 w-14 sm:h-20 sm:w-20">
						<Image src="/github.svg" alt="" fill sizes="80px" className="object-contain invert" />
					</span>
				</Door>
			</div>

			<footer className="px-6 sm:px-10">
				<div className="flex items-center justify-between py-6">
					<span className="label">© 2026 Existence. All Rights Reserved.</span>
					<a href="#top" className="label hover:!opacity-100">
						Top ↑
					</a>
				</div>
			</footer>
		</section>
	)
}
