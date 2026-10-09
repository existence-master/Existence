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
	const [loaded, setLoaded] = useState(false)
	useTheme()

	return (
		<>
			<Preloader onDone={() => setLoaded(true)} />
			<Cursor />
			<Nav />
			<main className={loaded ? "" : "h-screen overflow-hidden"}>
				<Hero />
				<Vision />
				<Sentient />
				<Contact />
			</main>
		</>
	)
}
