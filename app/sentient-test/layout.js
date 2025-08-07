import { Metadata } from "next"

export const metadata = {
	title: "Existence | Sentient",
	description: "Sentient - Personal AI Assistant",
	openGraph: {
		title: "Existence | Sentient",
		description: "Sentient - Personal AI Assistant",
		url: "https://sentient-staging-client.existence.technology/",
		type: "website",
		images: "/existencering.png"
	}
}

export default function Layout({ children }) {
	return (
		<main>
			<div className="h-screen w-screen bg-black flex items-center justify-center">
				{children}
			</div>
		</main>
	)
}
