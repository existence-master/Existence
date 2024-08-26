"use client"

import ProductSlider from "@components/ProductSlider"
import Roadmap from "@components/Roadmap"
import Testimonials from "@components/Testimonials"
import { TypewriterEffect } from "@components/TypewriterEffect"
import Link from "next/link"
import Image from "next/image"

const Products = () => {
	const words = [
		{
			text: "Products",
			className: "text-white xs:text-3xl md:text-6xl"
		},
		{
			text: "that",
			className: "text-white xs:text-3xl md:text-6xl"
		},
		{
			text: "enrich",
			className: "text-white xs:text-3xl md:text-6xl"
		},
		{
			text: "your",
			className: "xs:text-3xl md:text-6xl text-blue-400"
		},
		{
			text: "life",
			className: "xs:text-3xl md:text-6xl text-blue-400"
		}
	]

	const products = [
		{
			id: 1,
			name: "Finadvise",
			logo: "/finadvise.svg",
			desc1: "AI-based Financial Management and Advisory Platform",
			desc2: "If you're confused about managing your personal finances and are looking for an affordable solution, look no further!",
			desc3: "We make finance easy for everyone, using the power of AI. FinAdvise allows you to resolve any finance-related queries, create investment strategies, track your expenses, stay up-to-date with financial news and much more!",
			link: "/finadvise"
		},
		{
			id: 2,
			name: "Sentient",
			logo: "/sentient.svg",
			desc1: "Your Personalized AI Companion",
			desc2: "Your personal AI companion that knows everything about you and continuously learns from you.",
			desc3: "We use blockchain-based federated learning that allows all your data to stay private and completely local. Leverage the full power of generative AI without giving up your data.",
			link: "/sentient"
		},
		{
			id: 3,
			name: "MindSync",
			logo: "/mindsync.svg",
			desc1: "AI-Powered Mindmap Creator with Multimodal Inputs",
			desc2: "MindSync is an AI-powered mindmap creation tool for students. Mindmaps provide upto a 15% increase in learning ability compared to traditional note-taking. However, they are cumbersome to draw.",
			desc3: "We simplified the process by allowing users to create mindmaps in one click! Simply upload your course notes, lecture recordings or textbooks and watch as a beautiful mindmap is created.",
			link: "/mindsync"
		},
		{
			id: 4,
			name: "Bloomify",
			logo: "/bloomify.svg",
			description: "AI-Based Assessment Creator",
			desc1: "AI-Based Assessment Creator",
			desc2: "Bloomify is a free and open-source assessment creation tool that helps educators create balanced assessments based on Bloom's Taxonomy.",
			desc3: "It provides an intuitive interface to generate questions that align with various levels of cognitive skills - ensuring the holistic development of students.",
			link: "/bloomify"
		}
	]

	const checkpoints = [
		{
			id: 1,
			name: "FinAdvise MVP",
			icon: "/finadvise.svg",
			image: "/idea.svg"
		},
		{
			id: 2,
			name: "Sentient MVP",
			icon: "/sentient.svg",
			image: "/idea.svg"
		},
		{
			id: 3,
			name: "MindSync Alpha",
			icon: "/mindsync.svg",
			image: "/code.svg"
		},
		{
			id: 4,
			name: "Bloomify Alpha",
			icon: "/bloomify.svg",
			image: "/code.svg"
		},
		{
			id: 5,
			name: "MindSync MVP",
			icon: "/mindsync.svg",
			image: "/deploy.svg"
		},
		{
			id: 6,
			name: "Bloomify MVP",
			icon: "/bloomify.svg",
			image: "/deploy.svg"
		}
	]

	const testimonials = [
		{
			quote: "bloomify really helps me prepare assessments with little to no effort.",
			name: "Prof. Vijayalaxmi Kanade",
			title: "Bloomify",
			logo: "/bloomify.svg"
		},
		{
			quote: "i see Bloomify as a tool which can radically change the education sector.",
			name: "Dr. Prof. Minakshi Atre",
			title: "Bloomify",
			logo: "/bloomify.svg"
		},
		{
			quote: "makes my daily work so much easier. now all i gotta do is record my lectures and i have a mindmap of the whole thing!",
			name: "Rugved Joshi",
			title: "MindSync",
			logo: "/mindsync.svg"
		},
		{
			quote: "minsync helps me compress information with ease, really love the concept.",
			name: "Swanand Wagh",
			title: "MindSync",
			logo: "/mindsync.svg"
		}
	]

	return (
		<main>
			<section
				id="hero"
				className="bg-black w-screen h-screen relative flex flex-row"
			>
				<div className="flex flex-col h-full w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative items-center justify-center">
					<div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
					<Link href="/">
						<Image
							src="/logo-transparent.png"
							width={400}
							height={400}
							alt="logo"
						/>
					</Link>
					<TypewriterEffect words={words} />
					<div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-16">
						<button className="inline-flex h-[50px] w-[200px] animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#ffffff,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
							Explore
						</button>
					</div>
				</div>
			</section>
			<section
				id="products"
				className="bg-black w-full flex flex-col justify-center items-center md:h-[600px] xs:h-[700px] relative my-10"
			>
				<div className="md:w-1/2 xs:w-full">
					<h1 className="md:text-6xl xs:text-5xl text-white font-mono font-bold text-center mb-10">
						Our Products
					</h1>
					<ProductSlider products={products} />
				</div>
			</section>
			<section
				id="roadmap"
				className="bg-black w-screen h-[600px] xs:h-[700px] flex justify-center items-center relative my-10"
			>
				<div className="md:w-3/4 xs:w-full">
					<h1 className="md:text-6xl xs:text-5xl text-white font-mono font-bold text-center mb-10">
						Our Roadmap
					</h1>
					<Roadmap checkpoints={checkpoints} />
				</div>
			</section>
			<section
				id="testimonials"
				className="bg-black md:h-[500px] xs:h-[600px] w-screen relative my-10"
			>
				<div>
					<h1 className="xs:text-3xl md:text-6xl text-white font-mono font-bold text-center mb-10">
						What Our Users Say
					</h1>
					<div className="h-full rounded-md flex flex-col antialiased bg-transparent items-center justify-center relative overflow-hidden">
						<Testimonials
							items={testimonials}
							direction="left"
							speed="slow"
						/>
					</div>
					<div className="h-full rounded-md flex flex-col antialiased bg-transparent items-center justify-center relative overflow-hidden">
						<Testimonials
							items={testimonials}
							direction="right"
							speed="slow"
						/>
					</div>
				</div>
			</section>
			<div className="w-full mx-auto max-w-screen-xl p-4 flex xs:max-md:flex-col xs:max-md:gap-5 items-center justify-between">
				<span className="text-sm text-gray-500 sm:text-center dark:text-gray-400 font-mono">
					2024 Existence. All Rights Reserved.
				</span>
				<span className="text-sm text-gray-500 sm:text-center dark:text-gray-400 font-mono">
					<a
						href="mailto:existence.master@gmail.com"
						className="hover:underline flex flex-row gap-2"
					>
						<Image
							src="/mail.svg"
							width={20}
							height={20}
							alt="Mail Icon"
						/>
						existence.master@gmail.com
					</a>
				</span>
				<ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 xs:max-md:gap-5 gap-20">
					<li>
						<a
							href="https://chat.whatsapp.com/Kf5oylkq2TaClGNM74TZjt"
							className="hover:underline me-4 md:me-6"
						>
							<Image
								src="/whatsapp.svg"
								width={20}
								height={20}
								alt="Whatsapp Community"
							/>
						</a>
					</li>
					<li>
						<a
							href="https://github.com/existence-master"
							className="hover:underline me-4 md:me-6"
						>
							<Image
								src="/github.svg"
								width={22}
								height={22}
								alt="GitHub"
							/>
						</a>
					</li>
					<li>
						<a
							href="https://www.linkedin.com/company/existence-3/"
							className="hover:underline me-4 md:me-6"
						>
							<Image
								src="/linkedin.svg"
								width={22}
								height={22}
								alt="LinkedIn"
							/>
						</a>
					</li>
				</ul>
			</div>
		</main>
	)
}

export default Products
