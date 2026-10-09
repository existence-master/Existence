"use client"

import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import { useEffect, useMemo, useRef, useState } from "react"

/*
 * The word is painted onto a texture, then a shader warps the texture like liquid metal.
 * Noise drifts it slowly; the mouse drops ripples into it; on load it settles from chaos.
 */

const vertexShader = /* glsl */ `
	varying vec2 vUv;
	void main() {
		vUv = uv;
		gl_Position = vec4(position, 1.0);
	}
`

const fragmentShader = /* glsl */ `
	precision highp float;
	uniform sampler2D uTex;
	uniform vec2 uMouse;
	uniform vec2 uVel;
	uniform float uTime;
	uniform float uAspect;
	uniform float uIntro;
	uniform vec3 uColor;
	varying vec2 vUv;

	float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
	float noise(vec2 p) {
		vec2 i = floor(p); vec2 f = fract(p);
		f = f * f * (3.0 - 2.0 * f);
		return mix(mix(hash(i), hash(i + vec2(1,0)), f.x), mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), f.x), f.y);
	}
	float fbm(vec2 p) {
		float v = 0.0; float a = 0.5;
		for (int i = 0; i < 5; i++) { v += a * noise(p); p = p * 2.03 + 11.7; a *= 0.5; }
		return v;
	}

	void main() {
		vec2 uv = vUv;
		vec2 p = (uv - 0.5) * vec2(uAspect, 1.0);
		vec2 m = (uMouse - 0.5) * vec2(uAspect, 1.0);

		// slow liquid drift, much stronger before the intro settles
		float chaos = 1.0 - uIntro;
		vec2 warp = vec2(fbm(p * 1.6 + uTime * 0.12), fbm(p * 1.6 - uTime * 0.1 + 5.0)) - 0.5;
		float amp = 0.012 + chaos * 0.22;

		// ripple under the cursor, pushed in the direction it moves
		float d = length(p - m);
		float ripple = sin(d * 26.0 - uTime * 5.0) * exp(-d * 5.0) * (0.02 + length(uVel) * 0.12);
		vec2 dir = normalize(p - m + 0.0001);

		vec2 duv = uv + warp * amp + dir * ripple;

		float ca = 0.0014 + chaos * 0.03 + length(uVel) * 0.008;
		float r = texture2D(uTex, duv + vec2(ca, 0.0)).r;
		float g = texture2D(uTex, duv).r;
		float b = texture2D(uTex, duv - vec2(ca, 0.0)).r;
		float a = max(r, max(g, b));
		vec3 col = uColor * vec3(r, g, b);
		gl_FragColor = vec4(col, a * (0.15 + 0.85 * uIntro));
	}
`

function drawWord(text, fontFamily, width, height) {
	const canvas = document.createElement("canvas")
	canvas.width = width
	canvas.height = height
	const ctx = canvas.getContext("2d")
	ctx.fillStyle = "#000"
	ctx.fillRect(0, 0, width, height)
	ctx.fillStyle = "#fff"
	ctx.textAlign = "center"
	ctx.textBaseline = "middle"
	// size the word to ~90% of the width
	let size = height
	ctx.font = `800 ${size}px ${fontFamily}`
	const measured = ctx.measureText(text).width
	size = Math.floor((size * (width * 0.9)) / measured)
	ctx.font = `800 ${size}px ${fontFamily}`
	ctx.save()
	ctx.translate(width / 2, height / 2 + size * 0.04)
	// tighten the letters a touch
	ctx.letterSpacing = `${-size * 0.045}px`
	ctx.fillText(text, 0, 0)
	ctx.restore()
	return canvas
}

function Plane({ word, fontFamily, ready }) {
	const { size } = useThree()
	const mouse = useRef({ x: 0.5, y: 0.5, tx: 0.5, ty: 0.5, vx: 0, vy: 0 })
	const intro = useRef(0)
	const start = useRef(null)

	const texture = useMemo(() => {
		if (!ready) return null
		const w = 2048
		const h = Math.max(256, Math.round((2048 * size.height) / size.width))
		const c = drawWord(word, fontFamily, w, h)
		const t = new THREE.CanvasTexture(c)
		t.minFilter = THREE.LinearFilter
		t.magFilter = THREE.LinearFilter
		t.colorSpace = THREE.NoColorSpace
		return t
	}, [word, fontFamily, ready, size.width, size.height])

	const material = useMemo(
		() =>
			new THREE.ShaderMaterial({
				vertexShader,
				fragmentShader,
				transparent: true,
				depthWrite: false,
				uniforms: {
					uTex: { value: null },
					uMouse: { value: new THREE.Vector2(0.5, 0.5) },
					uVel: { value: new THREE.Vector2(0, 0) },
					uTime: { value: 0 },
					uAspect: { value: 1 },
					uIntro: { value: 0 },
					uColor: { value: new THREE.Color("#efece4") }
				}
			}),
		[]
	)

	useEffect(() => {
		material.uniforms.uTex.value = texture
		return () => texture?.dispose()
	}, [texture, material])

	useEffect(() => {
		const onMove = (e) => {
			mouse.current.tx = e.clientX / window.innerWidth
			mouse.current.ty = 1 - e.clientY / window.innerHeight
		}
		window.addEventListener("pointermove", onMove, { passive: true })
		return () => window.removeEventListener("pointermove", onMove)
	}, [])

	useFrame((state, dt) => {
		const u = material.uniforms
		u.uTime.value = state.clock.elapsedTime
		u.uAspect.value = size.width / size.height
		if (ready) {
			if (start.current === null) start.current = state.clock.elapsedTime
			const t = state.clock.elapsedTime - start.current
			intro.current = Math.min(1, t / 2.4)
			// ease out
			u.uIntro.value = 1 - Math.pow(1 - intro.current, 3)
		}
		const m = mouse.current
		const nx = m.x + (m.tx - m.x) * Math.min(1, dt * 6)
		const ny = m.y + (m.ty - m.y) * Math.min(1, dt * 6)
		m.vx = (nx - m.x) / Math.max(dt, 0.001)
		m.vy = (ny - m.y) / Math.max(dt, 0.001)
		m.x = nx
		m.y = ny
		u.uMouse.value.set(m.x, m.y)
		u.uVel.value.lerp(new THREE.Vector2(m.vx, m.vy).multiplyScalar(0.5), Math.min(1, dt * 4))
	})

	return (
		<mesh material={material}>
			<planeGeometry args={[2, 2]} />
		</mesh>
	)
}

export default function LiquidWord({ word = "EXISTENCE", onReady }) {
	const [font, setFont] = useState(null)

	useEffect(() => {
		let alive = true
		const family = getComputedStyle(document.documentElement).getPropertyValue("--font-bricolage").trim()
		const fam = family || "sans-serif"
		const probe = `800 200px ${fam}`
		const done = () => {
			if (!alive) return
			setFont(fam)
			onReady?.()
		}
		if (document.fonts?.load) {
			document.fonts.load(probe).then(done, done)
		} else done()
		return () => {
			alive = false
		}
	}, [onReady])

	return (
		<Canvas
			dpr={[1, 2]}
			gl={{ antialias: false, alpha: true, premultipliedAlpha: false }}
			style={{ position: "absolute", inset: 0 }}
		>
			<Plane word={word} fontFamily={font || "sans-serif"} ready={!!font} />
		</Canvas>
	)
}
