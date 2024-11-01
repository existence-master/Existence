export const metadata = {
	title: "WebWeave | Website Design & Development",
	description:
		"WebWeave crafts beautiful, functional websites that drive results. Let's build your online success story!",
	openGraph: {
		title: "WebWeave | Website Design & Development",
		description:
			"WebWeave crafts beautiful, functional websites that drive results. Let's build your online success story!",
		url: "https://existence-webweave.vercel.app", 
		type: "website",
		images: "/webweave.png" 
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
