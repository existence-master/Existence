/*
 * One sound engine for the whole site, shared by the enter screen and the navbar toggle.
 *
 * Sound is on unless this visitor turned it off before. Browsers only start audio inside a
 * real click, tap or key press, which is what the enter screen provides; play() must be
 * called from inside that event. If a browser still refuses, the next real gesture retries.
 */

import { Ambient } from "./ambient"

const KEY = "existence-sound"
const GESTURES = ["pointerup", "touchend", "keydown", "click"]

let engine = null
let wanted = null
let retryArmed = false
let listenersReady = false
const subscribers = new Set()

function readPref() {
	try {
		return localStorage.getItem(KEY) !== "off"
	} catch {
		return true
	}
}

function writePref(on) {
	try {
		localStorage.setItem(KEY, on ? "on" : "off")
	} catch {}
}

function emit() {
	subscribers.forEach((fn) => fn())
}

function progress() {
	const max = document.documentElement.scrollHeight - window.innerHeight
	return max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
}

function getEngine() {
	if (!engine) {
		engine = new Ambient()
		// development only: lets the engine be measured from the console
		if (process.env.NODE_ENV !== "production") window.__ambient = engine
	}
	return engine
}

function armRetry() {
	if (retryArmed) return
	retryArmed = true
	const onGesture = (e) => {
		if (e.target?.closest?.("[data-sound-toggle]")) return disarm()
		if (!isOn()) return disarm()
		start().then((playing) => playing && disarm())
	}
	const disarm = () => {
		retryArmed = false
		GESTURES.forEach((t) => window.removeEventListener(t, onGesture, true))
	}
	GESTURES.forEach((t) => window.addEventListener(t, onGesture, true))
}

function start() {
	// on iPhones this lets the score play even with the ringer switch on silent
	try {
		if (navigator.audioSession) navigator.audioSession.type = "playback"
	} catch {}
	const e = getEngine()
	e.setProgress(progress())
	return e.start()
}

function setupListeners() {
	if (listenersReady || typeof window === "undefined") return
	listenersReady = true
	// the score follows the page: harmony and brightness shift as you scroll
	window.addEventListener("scroll", () => engine?.setProgress(progress()), { passive: true })
	// fade out when the tab is hidden, back in when it returns
	document.addEventListener("visibilitychange", () => {
		if (!engine?.ctx || !isOn()) return
		if (document.hidden) engine.stop()
		else engine.start()
	})
}

/** whether sound is switched on (the visitor's choice, not whether audio is audible yet) */
export function isOn() {
	if (wanted === null) wanted = typeof window === "undefined" ? false : readPref()
	return wanted
}

export function subscribe(fn) {
	subscribers.add(fn)
	return () => subscribers.delete(fn)
}

/** call from inside a real click, tap or key press; starts the score if sound is on */
export function playFromGesture() {
	setupListeners()
	if (!isOn()) return Promise.resolve(false)
	return start().then((playing) => {
		if (!playing) armRetry()
		return playing
	})
}

/** flips sound on or off; call from inside the toggle's click */
export function toggleSound() {
	setupListeners()
	wanted = !isOn()
	writePref(wanted)
	if (wanted) playFromGesture()
	else engine?.stop()
	emit()
}
