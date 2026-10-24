"use client"

import { useState } from "react"
import Preloader from "./Preloader"
import Nav from "./Nav"
import Hero from "./Hero"
import Vision from "./Vision"
import Sentient from "./Sentient"
import Contact from "./Contact"
import { Cursor, useTheme } from "./ui"

export default function Site() {
	// nothing scrolls, and the hero waits, until the visitor walks through the enter screen
	const [entered, setEntered] = useState(false)
	useTheme()

	return (
		<>
			<Preloader onEnter={() => setEntered(true)} />
			<Cursor />
			<Nav />
			<main className={entered ? "" : "h-screen overflow-hidden"}>
				<Hero entered={entered} />
				<Vision />
				<Sentient />
				<Contact />
			</main>
		</>
	)
}
