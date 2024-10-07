"use client";

import Link from "next/link";
import Image from "next/image";
import { TypewriterEffect } from "@components/TypewriterEffect";
import { WobbleCard } from "@components/WobbleCard";
import TextTicker from "@components/TextTicker";
import { TypeAnimation } from "react-type-animation";
import { FloatingNav } from "@components/FloatingNavbar";
import { useState } from "react";
import {
  GlowingStarsBackgroundCard,
  GlowingStarsDescription,
  GlowingStarsTitle,
} from "@components/GlowingStarsCard";

const Services = () => {
  const [buttonText, setButtonText] = useState("Submit");
  const navItems = [
    {
      name: "Services",
      link: "#services-types",
      //icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Projects",
      link: "#past-projects",
      /*icon: (
        <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),*/
    },
    {
      name: "Contact",
      link: "#get-in-touch",
      /*icon: (
        <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),*/
    },
  ];

  const words = [
    {
      text: "Transforming",
      className: "text-white xs:text-3xl md:text-6xl",
    },
    {
      text: "ideas",
      className: "text-white xs:text-3xl md:text-6xl",
    },
    {
      text: "to",
      className: "text-white xs:text-3xl md:text-6xl",
    },
    {
      text: "reality.",
      className: "xs:text-3xl md:text-6xl text-blue-400",
    },
  ];

  const logos = [
    {
      name: "NextJS",
      url: "/techlogos/nextjs.svg",
    },

    {
      name: "ReactJS",
      url: "/techlogos/reactjs.svg",
    },

    {
      name: "MongoDB",
      url: "/techlogos/mongodb.svg",
    },

    {
      name: "Python",
      url: "/techlogos/python.svg",
    },

    {
      name: "JavaScript",
      url: "/techlogos/javascript.svg",
    },

    {
      name: "NodeJS",
      url: "/techlogos/nodejs.svg",
    },
    {
      name: "MySQL",
      url: "/techlogos/mysql.svg",
    },
    {
      name: "TailwindCSS",
      url: "/techlogos/tailwind.svg",
    },
    {
      name: "Tensorflow",
      url: "/techlogos/tensorflow.svg",
    },
    {
      name: "Pandas",
      url: "/techlogos/pandas.svg",
    },
    {
      name: "Arduino",
      url: "/techlogos/arduino.svg",
    },
    {
      name: "Selenium",
      url: "/techlogos/selenium.svg",
    },
    {
      name: "Solidity",
      url: "/techlogos/solidity.svg",
    },
    {
      name: "Docker",
      url: "/techlogos/Docker.svg",
    },
    {
      name: "Kubernetes",
      url: "/techlogos/kubernetes.svg",
    },
    {
      name: "LangChain",
      url: "/techlogos/langchain.svg",
    },
    {
      name: "ChromaDB",
      url: "/techlogos/chromadb.svg",
    },
    {
      name: "Git",
      url: "/techlogos/git.svg",
    },
    {
      name: "Figma",
      url: "/techlogos/figma.svg",
    },
    {
      name: "Vercel",
      url: "/techlogos/vercel.svg",
    },
    {
      name: "HuggingFace",
      url: "/techlogos/huggingface.svg",
    },
    {
      name: "GitHub",
      url: "/techlogos/github.svg",
    },
    {
      name: "Unreal",
      url: "/techlogos/ue4.svg",
    },
    {
      name: "Blender",
      url: "/techlogos/blender.svg",
    },
    {
      name: "Linux",
      url: "/techlogos/linux.svg",
    },
  ];

  return (
		<main>
			<FloatingNav navItems={navItems} className="xs:hidden md:flex" />
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
				id="services-tech"
				className="bg-black w-screen relative flex flex-col"
			>
				<div className="w-full py-12">
					<div className="mx-auto w-full px-4 md:px-8">
						<div
							className="group relative mt-6 flex gap-6 overflow-hidden p-2"
							style={{
								maskImage:
									"linear-gradient(to left, transparent 0%, black 20%, black 80%, transparent 95%)"
							}}
						>
							{Array(5)
								.fill(null)
								.map((index) => (
									<div
										key={index}
										className="flex shrink-0 animate-logo-cloud flex-row justify-around gap-6"
									>
										{logos.map((logo, key) => (
											<img
												key={key}
												src={logo.url}
												className="h-[100px] w-[100px] px-2"
												alt={`${logo.name}`}
											/>
										))}
									</div>
								))}
						</div>
					</div>
				</div>
				<div className="w-full h-[80px] flex flex-row items-center justify-center">
					<p className="font-mono text-white md:text-2xl xs:ml-4">
						Serving clients in{" "}
						<TypeAnimation
							sequence={[
								"AI",
								3000,
								"Education",
								3000,
								"Healthcare",
								3000,
								"Finance",
								3000,
								"Retail",
								3000,
								"Automation",
								3000
							]}
							repeat={Infinity}
							speed={20}
							deletionSpeed={20}
						/>
					</p>
				</div>
				<div className="w-full">
					<div className="xs:text-2xl md:mt-4 md:mb-4 md:text-4xl text-center font-semibold text-white tabular-nums tracking-tight">
						<TextTicker value={1000000} />+ lines of code written so
						far.
						{/* use direction param for "up" or "down" */}
					</div>
				</div>
			</section>
			<section
				id="services-types"
				className="bg-black w-screen md:h-[500px] xs:h-[1200px] relative flex flex-col"
			>
				<div className="w-full h-[80px]">
					<p
						className="text-[100px] xs:text-5xl xs:mt-4 xs:ml-4 md:ml-24 md:mt-4 text-white font-mono xs:text-center md:text-left"
						style={{ zIndex: 10 }}
					>
						Our Services
					</p>
				</div>
				<div className="w-full flex items-center justify-center">
					<WobbleCard containerClassName="w-[80%] col-span-1 lg:col-span-3 bg-gray-800 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
						<Link href="https://existence-bloomify.vercel.app">
							<div className="max-w-sm">
								<h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
									Bloomify makes assessment creation easy for
									educators everywhere.
								</h2>
								<p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
									Powered by AI, Bloomify makes it easy for
									educators to create balanced assessments
									that test various cognitive abilities of a
									student.
								</p>
							</div>
							<Image
								src="/BloomifyExample.png"
								width={500}
								height={500}
								alt="linear demo image"
								className="absolute -right-10 md:-right-[20%] lg:-right-[10%] -bottom-10 object-contain rounded-2xl"
							/>
						</Link>
					</WobbleCard>
				</div>
			</section>
			<section
				id="past-projects"
				className="bg-black w-screen md:h-[900px] xs:h-[1500px] relative flex flex-col"
			>
				<div className="w-full">
					<p
						className="h-[80px] text-[100px] xs:text-5xl xs:mt-4 xs:ml-4 md:ml-24 md:mt-8 text-white font-mono xs:text-center md:text-left"
						style={{ zIndex: 10 }}
					>
						Our Projects
					</p>
				</div>
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full p-4">
					<WobbleCard
						containerClassName="col-span-1 lg:col-span-2 h-full bg-gray-800 min-h-[500px] lg:min-h-[300px]"
						className=""
					>
						<Link href="https://existence-mindsync.vercel.app">
							<div className="max-w-xs">
								<h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
									Mindsync makes mindmapping easy.
								</h2>
								<p className="mt-4 text-left  text-base/6 text-neutral-200">
									Go from text, images, audio and video to
									mindmaps in seconds. Easily edit your
									mindmaps with our AI Editor.
								</p>
							</div>
							<Image
								src="/MindSyncExample.png"
								width={500}
								height={500}
								alt="linear demo image"
								className="absolute -right-4 lg:-right-[20%] -bottom-10 object-contain rounded-2xl"
							/>
						</Link>
					</WobbleCard>
					<WobbleCard containerClassName="col-span-1 min-h-[300px] bg-gray-600">
						<h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
							Future Projects
						</h2>
						<p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
							We have several other product ideas in the
							development pipeline.
						</p>
					</WobbleCard>
				</div>
			</section>
			<section
				id="get-in-touch"
				className="bg-black w-screen md:h-[500px] xs:h-[600px] relative flex flex-col"
			>
				<div className="w-full">
					<p
						className="h-[80px] text-[100px] xs:text-5xl xs:mt-4 xs:ml-4 md:ml-24 md:mt-8 text-white font-mono xs:text-center md:text-left"
						style={{ zIndex: 10 }}
					>
						Get in touch
					</p>
				</div>

				<form
					className="w-full xs:px-4 md:px-36"
					onSubmit={async (e) => {
						e.preventDefault()
						const email = e.target.email.value
						const description = e.target.description.value
						const available = e.target.available.value
						const first_name = e.target.first_name.value
						const last_name = e.target.last_name.value
						const phone = e.target.phone.value
						const company = e.target.company.value
						const response = await fetch(
							"/api/send-services-email",
							{
								method: "POST",
								headers: {
									"Content-Type": "application/json"
								},
								body: JSON.stringify({
									email,
									description,
									available,
									first_name,
									last_name,
									phone,
									company
								})
							}
						)
						if (response.ok) {
							console.log("Thank you for signing up!")
							setButtonText("Thank you")
						} else {
							console.log(
								"Something went wrong. Please try again later."
							)
						}
					}}
				>
					<div className="relative z-0 w-full mb-5 group">
						<input
							type="email"
							name="email"
							id="email"
							className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
							placeholder=" "
							required
						/>
						<label
							for="email"
							className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
						>
							Email address
						</label>
					</div>
					<div className="relative z-0 w-full mb-5 group">
						<input
							type="name"
							name="description"
							id="description"
							className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
							placeholder=" "
						/>
						<label
							for="description"
							className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
						>
							Short Description of Project (Optional)
						</label>
					</div>
					<div className="relative z-0 w-full mb-5 group">
						<input
							type="name"
							name="available"
							id="available"
							className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
							placeholder=" "
							required
						/>
						<label
							for="available"
							className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
						>
							When are you available for meetings?
						</label>
					</div>
					<div className="grid md:grid-cols-2 md:gap-6">
						<div className="relative z-0 w-full mb-5 group">
							<input
								type="text"
								name="first_name"
								id="first_name"
								className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
								placeholder=" "
								required
							/>
							<label
								for="first_name"
								className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
							>
								First name
							</label>
						</div>
						<div className="relative z-0 w-full mb-5 group">
							<input
								type="text"
								name="last_name"
								id="last_name"
								className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
								placeholder=" "
								required
							/>
							<label
								for="last_name"
								className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
							>
								Last name
							</label>
						</div>
					</div>
					<div className="grid md:grid-cols-2 md:gap-6">
						<div className="relative z-0 w-full mb-5 group">
							<input
								type="tel"
								name="phone"
								id="phone"
								className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
								placeholder=" "
								required
							/>
							<label
								for="phone"
								className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
							>
								Phone number (123-456-7890)
							</label>
						</div>
						<div className="relative z-0 w-full mb-5 group">
							<input
								type="text"
								name="company"
								id="company"
								className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
								placeholder=" "
								required
							/>
							<label
								for="company"
								className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
							>
								Company (Ex. Google)
							</label>
						</div>
					</div>
					<button
						type="submit"
						className="inline-flex mt-4 h-[50px] w-[200px] animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#ffffff,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
					>
						{buttonText}
					</button>
				</form>
			</section>

			<footer className="bg-black shadow">
				<div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
					<div className="sm:flex sm:items-center sm:justify-between">
						<a
							href="/"
							className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
						>
							<Image
								src="/logo-transparent.png"
								width={200}
								height={50}
								alt="Existence Logo"
							/>
						</a>
						<ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
							<li>
								<a
									href="#"
									className="hover:underline me-4 md:me-6"
								>
									About
								</a>
							</li>
							<li>
								<a
									href="#"
									className="hover:underline me-4 md:me-6"
								>
									Privacy Policy
								</a>
							</li>
							<li>
								<a
									href="#"
									className="hover:underline me-4 md:me-6"
								>
									Licensing
								</a>
							</li>
							<li>
								<a href="#" className="hover:underline">
									Contact
								</a>
							</li>
						</ul>
					</div>
					<hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
					<span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
						2024{" "}
						<a href="/" className="hover:underline">
							Existence
						</a>
						. All Rights Reserved.
					</span>
				</div>
			</footer>
		</main>
  )
};

export default Services;
