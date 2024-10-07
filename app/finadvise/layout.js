export const metadata = {
	title: "Existence | FinAdvise",
	description: "FinAdvise - AI Powered Financial Management",
	openGraph: {
		title: "Existence | FinAdvise",
		description: "FinAdvise - AI Powered Financial Management",
		url: "https://existence-finadvise.vercel.app",
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
