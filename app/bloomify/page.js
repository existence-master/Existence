"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Bloomify = () => {
	const router = useRouter();

	useEffect(() => {
		// Show loading screen for a short duration before redirecting
		const timer = setTimeout(() => {
			window.location.replace("https://existence-bloomify.vercel.app");
		}, 3000); // 1 second delay for loading screen

		return () => clearTimeout(timer);
	}, [router]);

	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "100vh",
			}}
		>
			<h1>Loading Bloomify...</h1>
		</div>
	);
};

export default Bloomify