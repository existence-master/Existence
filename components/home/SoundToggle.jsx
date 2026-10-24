"use client"

import { useSyncExternalStore } from "react"
import { isOn, subscribe, toggleSound } from "@lib/sound"

/*
 * The sound switch in the navbar. Off: a flat line, silence. On: the same line swells into a
 * travelling sine wave. The music itself is started by the enter screen's click; this only
 * switches it off and on again, and the choice is remembered.
 */
export default function SoundToggle() {
	const on = useSyncExternalStore(subscribe, isOn, () => false)

	return (
		<button
			type="button"
			data-sound-toggle
			data-cursor={on ? "mute" : "sound"}
			onClick={toggleSound}
			aria-pressed={on}
			aria-label={on ? "Turn sound off" : "Turn sound on"}
			className={`relative flex h-11 w-11 items-center justify-center ${on ? "sound-on" : ""}`}
		>
			<Wave />
		</button>
	)
}

// two and a bit periods of a sine (period 11), so it can slide one period and loop seamlessly
const WAVE = (() => {
	let d = ""
	for (let x = 0; x <= 33; x += 0.5) d += `${x === 0 ? "M" : "L"}${x} ${(6 - Math.sin((x / 11) * Math.PI * 2) * 4).toFixed(2)} `
	return d.trim()
})()

/** the line itself; it lies flat unless an ancestor has the `sound-on` class */
export function Wave({ className = "" }) {
	return (
		<svg width="22" height="12" viewBox="0 0 22 12" className={`overflow-hidden ${className}`} aria-hidden="true">
			<g className="wave-amp">
				<path className="wave-run" d={WAVE} fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
			</g>
		</svg>
	)
}
