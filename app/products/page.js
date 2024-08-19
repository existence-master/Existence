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
            name: "FinAdvise",
            description: "One stop solution for AI driven personal finance",
            logo: "/finadvise.svg",
            link: "/finadvise"
        },
        {
            id: 2,
            name: "Sentient",
            description: "A completely private and decentralized AI companion",
            logo: "/sentient.svg",
            link: "/sentient"
        },
        {
            id: 3,
            name: "MindSync",
            description: "Information compression using AI enabled mindmapping",
            logo: "/mindsync.svg",
            link: "/mindsync"
        },
        {
            id: 4,
            name: "Bloomify",
            description: "A modern AI powered assessment creator based on Bloom's taxonomy",
            logo: "/bloomify.svg",
            link: "/bloomify"
        }
    ]

    const checkpoints = [
        {
            id: 1,
            name: "Phase 1",
            icon: "/icons/phase1.png",
            image: "idea.svg",
        },
        {
            id: 2,
            name: "Phase 1",
            icon: "/icons/phase1.png",
            image: "/images/phase1.png",
        },
        {
            id: 3,
            name: "Phase 1",
            icon: "/icons/phase1.png",
            image: "/images/phase1.png",
        },
        {
            id: 4,
            name: "Phase 1",
            icon: "/icons/phase1.png",
            image: "/images/phase1.png",
        },
        {
            id: 5,
            name: "Phase 1",
            icon: "/icons/phase1.png",
            image: "idea.svg",
        },
        {
            id: 6,
            name: "Phase 1",
            icon: "/icons/phase1.png",
            image: "/images/phase1.png",
        },
        {
            id: 7,
            name: "Phase 1",
            icon: "/icons/phase1.png",
            image: "/images/phase1.png",
        },
        {
            id: 8,
            name: "Phase 1",
            icon: "/icons/phase1.png",
            image: "/images/phase1.png",
        },
    ]

    const testimonials = [
		{
			quote: "bro this app is awesome. mindmapping during class has never been easier.",
			name: "Sarthak Karandikar",
			title: "billionaire, playboy, philanthropist"
		},
		{
			quote: "saved me from failing all my classes. i owe my life to mindsync. :D",
			name: "kabeer ahmed merchant",
			title: "an average student"
		},
		{
			quote: "makes my daily work so much easier. now all i gotta do is record my lectures and i have a mindmap of the whole thing!",
			name: "Abhijeet Suryawanshi",
			title: "Your friendly neighbourhood data scientist"
		},
		{
			quote: "bro i designed the whole damn frontend, of course i will enjoy using it. mindsync is the best.",
			name: "Ojaswini Prabhune",
			title: "UI/UX Designer"
		},
		{
			quote: "i am so happy that i found mindsync. mindsync has saved my life in so many ways.",
			name: "Varad Deshpande",
			title: "casually became a trillionaire - thanks to mindsync"
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
							Book a Call
						</button>
					</div>
				</div>
			</section>
			<section
				id="products"
				className="bg-black w-screen flex justify-center items-center h-screen relative my-10"
			>
				<div className="w-1/2">
					<h1 className="text-3xl font-Poppins font-bold text-center mb-10">
						Our Products
					</h1>
					<ProductSlider products={products} />
				</div>
			</section>
			<section
				id="roadmap"
				className="bg-black w-screen h-screen flex justify-center items-center relative my-10"
			>
				<div className="w-3/4">
					<h1 className="text-3xl font-Poppins font-bold text-center mb-10">
						Our Roadmap
					</h1>
					<Roadmap checkpoints={checkpoints} />
				</div>
			</section>
			<section
				id="testimonials"
				className="bg-black h-screen w-screen items-center relative my-10"
			>
				<div>
					<h1 className="text-3xl font-Poppins font-bold text-center mb-10">
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
							speed="fast"
						/>
					</div>
				</div>
			</section>
		</main>
	)
}

export default Products