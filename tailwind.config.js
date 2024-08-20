const defaultTheme = require("tailwindcss/defaultTheme")

const colors = require("tailwindcss/colors")
const {
	default: flattenColorPalette
} = require("tailwindcss/lib/util/flattenColorPalette")

const svgToDataUri = require("mini-svg-data-uri")

const {
	scrollbarGutter,
	scrollbarWidth,
	scrollbarColor
} = require("tailwind-scrollbar-utilities")

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}"
	],
	theme: {
		extend: {
			fontFamily: {
				Montserrat: ["Montserrat", "sans-serif"],
				Poppins: ["Poppins", "sans-serif"],
				Quicksand: ["Quicksand", "sans-serif"],
				Roboto: ["Roboto", "sans-serif"]
			},
			screens: {
				xs: "128px",
				sm: "640px",
				md: "768px",
				lg: "1024px",
				xl: "1280px",
				"2xl": "1536px"
			},
			animation: {
				"meteor-effect": "meteor 5s linear infinite",
				shimmer: "shimmer 2s linear infinite",
				"logo-cloud": "logo-cloud 30s linear infinite",
				scroll: "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite"
			},
			keyframes: {
				meteor: {
					"0%": {
						transform: "rotate(215deg) translateX(0)",
						opacity: "1"
					},
					"70%": { opacity: "1" },
					"100%": {
						transform: "rotate(215deg) translateX(-500px)",
						opacity: "0"
					}
				},
				scroll: {
					to: {
						transform: "translate(calc(-50% - 0.5rem))"
					}
				},
				"logo-cloud": {
					from: { transform: "translateX(0)" },
					to: { transform: "translateX(calc(-100% - 4rem))" }
				},
				shimmer: {
					from: {
						backgroundPosition: "0 0"
					},
					to: {
						backgroundPosition: "-200% 0"
					}
				}
			}
		}
	},
	plugins: [
		addVariablesForColors,
		scrollbarGutter(), // no options to configure
		scrollbarWidth(), // no options to configure
		scrollbarColor(), // no options to configure
		function ({ matchUtilities, theme }) {
			matchUtilities(
				{
					"bg-grid": (value) => ({
						backgroundImage: `url("${svgToDataUri(
							`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
						)}")`
					}),
					"bg-grid-small": (value) => ({
						backgroundImage: `url("${svgToDataUri(
							`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
						)}")`
					}),
					"bg-dot": (value) => ({
						backgroundImage: `url("${svgToDataUri(
							`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
						)}")`
					})
				},
				{
					values: flattenColorPalette(theme("backgroundColor")),
					type: "color"
				}
			)
		}
	]
}

function addVariablesForColors({ addBase, theme }) {
	let allColors = flattenColorPalette(theme("colors"))
	let newVars = Object.fromEntries(
		Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
	)

	addBase({
		":root": newVars
	})
}
