"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const MindSync = () => {
	const router = useRouter();

	useEffect(() => {
		// Show loading screen for a short duration before redirecting
		const timer = setTimeout(() => {
			window.location.href = "https://existence-mindsync.vercel.app";
		}, 1000); // 1 second delay for loading screen

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
			<h1>Loading MindSync...</h1>
		</div>
	);
};

export default MindSync