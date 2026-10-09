import "./globals.css"
import { Bricolage_Grotesque, Instrument_Serif, Geist_Mono } from "next/font/google"
import { Providers } from "./providers"

const bricolage = Bricolage_Grotesque({
	subsets: ["latin"],
	axes: ["opsz", "wdth"],
	variable: "--font-bricolage",
	display: "swap"
})

const instrument = Instrument_Serif({
	subsets: ["latin"],
	weight: "400",
	style: ["normal", "italic"],
	variable: "--font-instrument",
	display: "swap"
})

const geistMono = Geist_Mono({
	subsets: ["latin"],
	variable: "--font-geist-mono",
	display: "swap"
})

export const metadata = {
	metadataBase: new URL("https://existence.technology"),
	title: { default: "Existence", template: "%s · Existence" },
	description:
		"Existence. Technology at the frontiers of tomorrow. Makers of Sentient, your personal AI assistant, running on your own computer.",
	openGraph: {
		title: "Existence",
		description: "Technology at the frontiers of tomorrow.",
		url: "https://existence.technology",
		siteName: "Existence",
		type: "website",
		images: [{ url: "/existencering.png", width: 730, height: 740 }]
	},
	twitter: {
		card: "summary_large_image",
		title: "Existence",
		description: "Technology at the frontiers of tomorrow."
	},
	icons: { icon: "/favicon.ico" }
}

export const viewport = { themeColor: "#0a0a0a" }

export default function RootLayout({ children }) {
	return (
		<html
			lang="en"
			className={`${bricolage.variable} ${instrument.variable} ${geistMono.variable}`}
		>
			<body>
				<Providers>{children}</Providers>
				<div className="grain" aria-hidden="true" />
			</body>
		</html>
	)
}
