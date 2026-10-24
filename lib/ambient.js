/*
 * Existence ambient score.
 *
 * Generated live with the Web Audio API, so there is no audio file to download or license.
 * A low drone on A, a distant formant choir, desert wind, sparse bells in a minor scale and
 * a slow brass swell now and then, all inside a long synthetic reverb. The harmony and the
 * brightness follow how far down the page the visitor is.
 */

const ROOT = 55 // A1
const hz = (semitones, base = ROOT) => base * Math.pow(2, semitones / 12)

// A minor pentatonic, two octaves: A C D E G
const BELL_STEPS = [0, 3, 5, 7, 10, 12, 15, 17, 19, 22]
// chord tone the choir sings in each part of the page: root, fifth, minor third, fourth
const SECTION_STEPS = [12, 19, 15, 17]
// vowel formants (F1, F2) the choir drifts between: ah, oh, oo, eh
const VOWELS = [
	[730, 1090],
	[570, 840],
	[300, 870],
	[530, 1840]
]

const rand = (a, b) => a + Math.random() * (b - a)
const pick = (list) => list[Math.floor(Math.random() * list.length)]

function impulseResponse(ctx, seconds, decay) {
	const length = Math.floor(ctx.sampleRate * seconds)
	const buffer = ctx.createBuffer(2, length, ctx.sampleRate)
	for (let ch = 0; ch < 2; ch++) {
		const data = buffer.getChannelData(ch)
		for (let i = 0; i < length; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay)
	}
	return buffer
}

function brownNoise(ctx, seconds) {
	const length = Math.floor(ctx.sampleRate * seconds)
	const buffer = ctx.createBuffer(1, length, ctx.sampleRate)
	const data = buffer.getChannelData(0)
	let last = 0
	for (let i = 0; i < length; i++) {
		last = (last + 0.02 * (Math.random() * 2 - 1)) / 1.02
		data[i] = last * 3.5
	}
	return buffer
}

export class Ambient {
	constructor() {
		this.ctx = null
		this.playing = false
		this.timers = []
		this.section = -1
		this.stopToken = 0
	}

	build() {
		const ctx = new (window.AudioContext || window.webkitAudioContext)()
		this.ctx = ctx

		// master: fades in and out, a gentle compressor keeps the swells polite
		const master = ctx.createGain()
		master.gain.value = 0
		const comp = ctx.createDynamicsCompressor()
		comp.threshold.value = -20
		comp.ratio.value = 3.5
		comp.attack.value = 0.05
		comp.release.value = 0.6
		master.connect(comp).connect(ctx.destination)
		this.master = master

		// one long, dark reverb for the whole score
		const reverb = ctx.createConvolver()
		reverb.buffer = impulseResponse(ctx, 7, 2.6)
		const reverbTone = ctx.createBiquadFilter()
		reverbTone.type = "lowpass"
		reverbTone.frequency.value = 2600
		const wet = ctx.createGain()
		wet.gain.value = 0.6
		reverb.connect(reverbTone).connect(wet).connect(master)
		const dry = ctx.createGain()
		dry.gain.value = 0.7
		dry.connect(master)
		this.send = (node, amount) => {
			node.connect(dry)
			const s = ctx.createGain()
			s.gain.value = amount
			node.connect(s).connect(reverb)
		}

		this.buildDrone()
		this.buildChoir()
		this.buildWind()
	}

	buildDrone() {
		const ctx = this.ctx
		const filter = ctx.createBiquadFilter()
		filter.type = "lowpass"
		filter.frequency.value = 280
		filter.Q.value = 0.8
		const gain = ctx.createGain()
		gain.gain.value = 0.2

		// detuned saws on the root, its octave and its fifth
		for (const [freq, detune] of [
			[hz(0), -6],
			[hz(0), 6],
			[hz(12), -3],
			[hz(7), 4]
		]) {
			const o = ctx.createOscillator()
			o.type = "sawtooth"
			o.frequency.value = freq
			o.detune.value = detune
			o.connect(filter)
			o.start()
		}
		// a clean sine underneath so it has weight on small speakers too
		const sub = ctx.createOscillator()
		sub.frequency.value = hz(0)
		const subGain = ctx.createGain()
		subGain.gain.value = 0.55
		sub.connect(subGain).connect(gain)
		sub.start()

		// the filter breathes very slowly
		const lfo = ctx.createOscillator()
		lfo.frequency.value = 0.03
		const depth = ctx.createGain()
		depth.gain.value = 80
		lfo.connect(depth).connect(filter.frequency)
		lfo.start()

		filter.connect(gain)
		this.send(gain, 0.35)
		this.droneFilter = filter
	}

	buildChoir() {
		const ctx = this.ctx
		const voice = ctx.createOscillator()
		voice.type = "sawtooth"
		voice.frequency.value = hz(SECTION_STEPS[0])
		// a slow, slight wavering so it sounds sung, not generated
		const vib = ctx.createOscillator()
		vib.frequency.value = 0.18
		const vibDepth = ctx.createGain()
		vibDepth.gain.value = 9
		vib.connect(vibDepth).connect(voice.detune)
		vib.start()

		const out = ctx.createGain()
		out.gain.value = 0.08
		const formants = VOWELS[0].map((f) => {
			const band = ctx.createBiquadFilter()
			band.type = "bandpass"
			band.frequency.value = f
			band.Q.value = 9
			voice.connect(band).connect(out)
			return band
		})
		voice.start()

		// a swell in and out every half minute or so
		const swell = ctx.createOscillator()
		swell.frequency.value = 0.035
		const swellDepth = ctx.createGain()
		swellDepth.gain.value = 0.035
		swell.connect(swellDepth).connect(out.gain)
		swell.start()

		this.send(out, 0.9)
		this.voice = voice
		this.formants = formants
	}

	buildWind() {
		const ctx = this.ctx
		const noise = ctx.createBufferSource()
		noise.buffer = brownNoise(ctx, 6)
		noise.loop = true
		const band = ctx.createBiquadFilter()
		band.type = "bandpass"
		band.frequency.value = 520
		band.Q.value = 0.7
		const gain = ctx.createGain()
		gain.gain.value = 0.045

		// the wind's pitch wanders, and it gusts on a different, slower cycle
		const sweep = ctx.createOscillator()
		sweep.frequency.value = 0.045
		const sweepDepth = ctx.createGain()
		sweepDepth.gain.value = 320
		sweep.connect(sweepDepth).connect(band.frequency)
		sweep.start()
		const gust = ctx.createOscillator()
		gust.frequency.value = 0.07
		const gustDepth = ctx.createGain()
		gustDepth.gain.value = 0.03
		gust.connect(gustDepth).connect(gain.gain)
		gust.start()

		noise.connect(band).connect(gain)
		noise.start()
		this.send(gain, 0.5)
		this.wind = gain
	}

	bell() {
		const ctx = this.ctx
		const t = ctx.currentTime + 0.05
		const freq = hz(pick(BELL_STEPS), 220)
		const out = ctx.createGain()
		out.gain.setValueAtTime(0, t)
		out.gain.linearRampToValueAtTime(0.045, t + 0.02)
		out.gain.exponentialRampToValueAtTime(0.0001, t + 6)
		for (const [mult, level] of [
			[1, 1],
			[2.76, 0.3],
			[5.4, 0.12]
		]) {
			const o = ctx.createOscillator()
			o.type = "sine"
			o.frequency.value = freq * mult
			const g = ctx.createGain()
			g.gain.value = level
			o.connect(g).connect(out)
			o.start(t)
			o.stop(t + 6.2)
		}
		this.send(out, 1.4)
	}

	brass() {
		const ctx = this.ctx
		const t = ctx.currentTime + 0.1
		const filter = ctx.createBiquadFilter()
		filter.type = "lowpass"
		filter.Q.value = 1.2
		filter.frequency.setValueAtTime(110, t)
		filter.frequency.exponentialRampToValueAtTime(1300, t + 2.6)
		filter.frequency.exponentialRampToValueAtTime(140, t + 8)
		const out = ctx.createGain()
		out.gain.setValueAtTime(0.0001, t)
		out.gain.exponentialRampToValueAtTime(0.13, t + 2.4)
		out.gain.exponentialRampToValueAtTime(0.0001, t + 8.5)
		for (const [step, detune] of [
			[0, -8],
			[0, 8],
			[7, 0],
			[12, -4]
		]) {
			const o = ctx.createOscillator()
			o.type = "sawtooth"
			o.frequency.value = hz(step)
			o.detune.value = detune
			o.connect(filter)
			o.start(t)
			o.stop(t + 9)
		}
		filter.connect(out)
		this.send(out, 0.8)
	}

	shiftVowel() {
		const ctx = this.ctx
		const [f1, f2] = pick(VOWELS)
		this.formants[0].frequency.setTargetAtTime(f1, ctx.currentTime, 2.5)
		this.formants[1].frequency.setTargetAtTime(f2, ctx.currentTime, 2.5)
	}

	schedule(fn, min, max) {
		const run = () => {
			if (!this.playing) return
			fn.call(this)
			this.timers.push(setTimeout(run, rand(min, max)))
		}
		this.timers.push(setTimeout(run, rand(min, max)))
	}

	/** 0 at the top of the page, 1 at the bottom */
	setProgress(p) {
		if (!this.ctx) return
		const now = this.ctx.currentTime
		this.droneFilter.frequency.setTargetAtTime(260 + p * 460, now, 2)
		const section = Math.min(SECTION_STEPS.length - 1, Math.floor(p * SECTION_STEPS.length))
		if (section !== this.section) {
			this.section = section
			this.voice.frequency.setTargetAtTime(hz(SECTION_STEPS[section]), now, 1.8)
		}
	}

	/** resolves true once sound is actually playing, false if the browser refused (no user gesture yet) */
	async start() {
		if (!this.ctx) this.build()
		this.stopToken++
		if (this.ctx.state !== "running") {
			try {
				await this.ctx.resume()
			} catch {}
		}
		// without a user gesture the context stays suspended; don't schedule anything against a frozen clock
		if (this.ctx.state !== "running") return false
		const now = this.ctx.currentTime
		this.master.gain.cancelScheduledValues(now)
		this.master.gain.setValueAtTime(this.master.gain.value, now)
		this.master.gain.linearRampToValueAtTime(0.55, now + 3)
		if (!this.playing) {
			this.playing = true
			this.schedule(this.bell, 6000, 15000)
			this.schedule(this.brass, 22000, 38000)
			this.schedule(this.shiftVowel, 8000, 12000)
		}
		return true
	}

	stop() {
		if (!this.ctx) return
		this.playing = false
		this.timers.forEach(clearTimeout)
		this.timers = []
		const now = this.ctx.currentTime
		this.master.gain.cancelScheduledValues(now)
		this.master.gain.setValueAtTime(this.master.gain.value, now)
		this.master.gain.linearRampToValueAtTime(0, now + 1.2)
		const token = ++this.stopToken
		setTimeout(() => {
			if (token === this.stopToken && this.ctx.state === "running") this.ctx.suspend()
		}, 1400)
	}
}
