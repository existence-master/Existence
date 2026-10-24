"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "motion/react"
import { Magnetic } from "./ui"
import SoundToggle from "./SoundToggle"

const LINKS = [
	["#vision", "Vision"],
	["#sentient", "Sentient"],
	["#contact", "Contact"]
]

const EASE_OUT = [0.16, 1, 0.3, 1]
const EASE_IN_OUT = [0.76, 0, 0.24, 1]

function goTo(href) {
	const el = document.querySelector(href)
	if (!el) return
	if (window.__lenis) window.__lenis.scrollTo(el, { duration: 1.4 })
	else el.scrollIntoView({ behavior: "smooth" })
}

/* On phones: two thin lines that cross into an X. No words, no frame. */
function MenuButton({ open, onClick, buttonRef }) {
	const line = "absolute left-1/2 h-[1.5px] w-[22px] -translate-x-1/2 bg-current transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
	return (
		<button
			ref={buttonRef}
			type="button"
			onClick={onClick}
			aria-expanded={open}
			aria-controls="mobile-menu"
			aria-label={open ? "Close menu" : "Open menu"}
			className="relative h-11 w-11 sm:hidden"
		>
			<span className={`${line} ${open ? "top-1/2 rotate-45" : "top-[calc(50%-4px)]"}`} aria-hidden="true" />
			<span className={`${line} ${open ? "top-1/2 -rotate-45" : "top-[calc(50%+3px)]"}`} aria-hidden="true" />
		</button>
	)
}

/* The full-screen panel on phones: it wipes down, the sections rise in at poster size. */
function MobileMenu({ onPick, panelRef }) {
	return (
		<motion.div
			id="mobile-menu"
			ref={panelRef}
			role="dialog"
			aria-modal="true"
			aria-label="Menu"
			className="fixed inset-0 z-40 flex flex-col bg-ink text-paper sm:hidden"
			initial={{ clipPath: "inset(0 0 100% 0)" }}
			animate={{ clipPath: "inset(0 0 0% 0)" }}
			exit={{ clipPath: "inset(0 0 100% 0)" }}
			transition={{ duration: 0.75, ease: EASE_IN_OUT }}
		>
			<div className="gutter flex flex-1 flex-col justify-between pb-[max(1.75rem,env(safe-area-inset-bottom))] pt-[calc(6rem+env(safe-area-inset-top))]">
				<nav aria-label="Sections">
					<ul className="border-t border-paper/15">
						{LINKS.map(([href, label], i) => (
							<li key={href} className="overflow-hidden border-b border-paper/15">
								<motion.a
									href={href}
									aria-label={label}
									onClick={(e) => {
										e.preventDefault()
										onPick(href)
									}}
									className="mega flex items-baseline justify-between py-4 text-[15vw] leading-[0.9]"
									initial={{ y: "110%" }}
									animate={{ y: 0 }}
									exit={{ y: "110%", transition: { duration: 0.35, ease: EASE_IN_OUT } }}
									transition={{ delay: 0.28 + i * 0.07, duration: 0.85, ease: EASE_OUT }}
								>
									<span>{label}</span>
									<span className="label !opacity-50">0{i + 1}</span>
								</motion.a>
							</li>
						))}
					</ul>
				</nav>

				<motion.div
					className="flex items-end justify-between gap-6"
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, transition: { duration: 0.2 } }}
					transition={{ delay: 0.55, duration: 0.7, ease: EASE_OUT }}
				>
					<p className="serif-it max-w-[13rem] text-[1.6rem] leading-[1.1]">Make the impossible ordinary.</p>
					<span className="relative block h-10 w-10 shrink-0 animate-spin-slow" aria-hidden="true">
						<Image src="/existencering.png" alt="" fill sizes="40px" className="object-contain" />
					</span>
				</motion.div>
			</div>
		</motion.div>
	)
}

export default function Nav() {
	const [open, setOpen] = useState(false)
	const buttonRef = useRef(null)
	const panelRef = useRef(null)

	// while the menu is open: no page scroll, Escape closes it, focus moves in and comes back after
	useEffect(() => {
		if (!open) return
		const html = document.documentElement
		window.__lenis?.stop()
		html.style.overflow = "hidden"
		const onKey = (e) => e.key === "Escape" && setOpen(false)
		window.addEventListener("keydown", onKey)
		const focus = setTimeout(() => panelRef.current?.querySelector("a")?.focus({ preventScroll: true }), 400)
		return () => {
			clearTimeout(focus)
			window.removeEventListener("keydown", onKey)
			html.style.overflow = ""
			window.__lenis?.start()
			buttonRef.current?.focus({ preventScroll: true })
		}
	}, [open])

	// if the screen grows past the phone layout (rotation, resize), the menu has no reason to stay open
	useEffect(() => {
		const mq = window.matchMedia("(min-width: 640px)")
		const onChange = () => mq.matches && setOpen(false)
		mq.addEventListener("change", onChange)
		return () => mq.removeEventListener("change", onChange)
	}, [])

	const pick = (href) => {
		setOpen(false)
		// wait a frame for the scroll lock to lift, then glide to the section
		setTimeout(() => goTo(href), 80)
	}

	return (
		<>
			<header className="fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)] text-white mix-blend-difference">
				<div className="gutter flex items-center justify-between py-3 sm:py-4">
					<a
						href="#top"
						onClick={() => setOpen(false)}
						className="flex items-center gap-3 py-2"
						aria-label="Existence, top"
					>
						<span className="relative block h-7 w-7">
							<Image src="/existencering.png" alt="" fill sizes="28px" className="object-contain" priority />
						</span>
						{/* the hero already says EXISTENCE in huge type, so phones keep just the ring */}
						<span className="hidden font-mono text-[0.7rem] uppercase tracking-[0.32em] sm:inline">Existence</span>
					</a>

					<div className="flex items-center gap-2 sm:gap-6">
						<nav className="hidden items-center gap-6 sm:flex" aria-label="Sections">
							{LINKS.map(([href, label]) => (
								<Magnetic key={href} strength={0.25}>
									<a href={href} className="label block px-2 py-3 !opacity-90 hover:!opacity-100">
										{label}
									</a>
								</Magnetic>
							))}
						</nav>
						<span className="hidden h-4 w-px bg-white/30 sm:block" aria-hidden="true" />
						<SoundToggle />
						<MenuButton open={open} onClick={() => setOpen((v) => !v)} buttonRef={buttonRef} />
					</div>
				</div>
			</header>

			<AnimatePresence>{open && <MobileMenu onPick={pick} panelRef={panelRef} />}</AnimatePresence>
		</>
	)
}
