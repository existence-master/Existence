"use client"

import Image from "next/image"
import { Magnetic } from "./ui"

const LINKS = [
	["#vision", "Vision"],
	["#sentient", "Sentient"],
	["#contact", "Contact"]
]

export default function Nav() {
	return (
		<header className="fixed inset-x-0 top-0 z-50 mix-blend-difference text-white">
			<div className="flex items-center justify-between px-6 py-6 sm:px-10">
				<a href="#top" className="flex items-center gap-3" aria-label="Existence, top">
					<span className="relative block h-7 w-7">
						<Image src="/existencering.png" alt="" fill sizes="28px" className="object-contain" priority />
					</span>
					<span className="font-mono text-[0.7rem] uppercase tracking-[0.32em]">Existence</span>
				</a>
				<nav className="flex items-center gap-7 sm:gap-10">
					{LINKS.map(([href, label]) => (
						<Magnetic key={href} strength={0.25}>
							<a href={href} className="label !opacity-90 hover:!opacity-100">
								{label}
							</a>
						</Magnetic>
					))}
					<Magnetic strength={0.25}>
						<a
							href="https://github.com/existence-master"
							target="_blank"
							rel="noreferrer"
							className="label hidden !opacity-90 hover:!opacity-100 sm:block"
						>
							GitHub ↗
						</a>
					</Magnetic>
				</nav>
			</div>
		</header>
	)
}
