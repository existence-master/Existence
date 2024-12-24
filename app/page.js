"use client"

import { BackgroundBeams } from "@components/BackgroundBeams"
import { AnimatedTooltip } from "@components/AnimatedTip"
import { Meteors } from "@components/AnimatedMeteors"
import { shuffleArray } from "@utils/helpers"
import Image from "next/image"
import Link from "next/link"
import DotBackground from "@components/DotBackground"
import ThreeDModel from "@components/3DModel"
import { useScroll, motion, useTransform } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import ScrollIndicator from "@components/ScrollIndicator"
import { CardBody, CardContainer, CardItem } from "@components/3DCard"


const Home = () => {
	const pageRef = useRef()
	const pageScrollProgress = useScroll(pageRef)

	const heroSectionOpacity = useTransform(
		pageScrollProgress.scrollYProgress,
		[0.0, 0.0714, 0.1429],
		[1, 0.5, 0]
	)

	const heroSectionScale = useTransform(
		pageScrollProgress.scrollYProgress,
		[0.0, 0.0714, 0.1429],
		[1, 2.5, 2.5]
	)

	const philosophySectionOpacity = useTransform(
		pageScrollProgress.scrollYProgress,
		[0.1029, 0.2143, 0.2857],
		[0, 1, 0]
	)

	const philosophySectionScale = useTransform(
		pageScrollProgress.scrollYProgress,
		[0.1029, 0.2143, 0.2857],
		[0, 1, 2.5]
	)

	const missionSectionOpacity = useTransform(
		pageScrollProgress.scrollYProgress,
		[0.2457, 0.3571, 0.4286],
		[0, 1, 0]
	)

	const missionSectionScale = useTransform(
		pageScrollProgress.scrollYProgress,
		[0.2457, 0.3571, 0.4286],
		[0, 1, 2.5]
	)

	const productsSectionOpacity = useTransform(
		pageScrollProgress.scrollYProgress,
		[0.3886, 0.5, 0.5714],
		[0, 1, 0]
	)

	const productsSectionScale = useTransform(
		pageScrollProgress.scrollYProgress,
		[0.3886, 0.5, 0.5714],
		[0, 1, 2.5]
	)

	const servicesSectionOpacity = useTransform(
		pageScrollProgress.scrollYProgress,
		[0.5314, 0.6429, 0.7143],
		[0, 1, 0]
	)

	const servicesSectionScale = useTransform(
		pageScrollProgress.scrollYProgress,
		[0.5314, 0.6429, 0.7143],
		[0, 1, 2.5]
	)

	const communitySectionOpacity = useTransform(
		pageScrollProgress.scrollYProgress,
		[0.6743, 0.7857, 0.8571],
		[0, 1, 0]
	)

	const communitySectionScale = useTransform(
		pageScrollProgress.scrollYProgress,
		[0.6743, 0.7857, 0.8571],
		[0, 1, 2.5]
	)

	const teamSectionOpacity = useTransform(
		pageScrollProgress.scrollYProgress,
		[0.8171, 0.9286, 1.0],
		[0, 1, 1]
	)

	const teamSectionScale = useTransform(
		pageScrollProgress.scrollYProgress,
		[0.8171, 0.9286, 1.0],
		[0, 1, 1]
	)

	const team = [
		{
			id: 1,
			name: "Sarthak Karandikar",
			designation: "Co-Founder",
			image: "/sarthak.jpeg",
			link: "https://www.linkedin.com/in/sarthak-karandikar-0223b7228/"
		},
		{
			id: 2,
			name: "Kabeer Ahmed Merchant",
			designation: "Co-Founder",
			image: "/kabeer.jpeg",
			link: "https://www.linkedin.com/in/kabeer-ahmed-merchant/"
		},
		{
			id: 3,
			name: "Abhijeet Suryawanshi",
			designation: "AI Engineer",
			image: "/abhijeet.jpeg",
			link: "https://www.linkedin.com/in/abhijeet-suryawanshi-597a50240/"
		},
	]
	const [isParallaxEnabled, setIsParallaxEnabled] = useState(false)
	const [shuffledTeam, setShuffledTeam] = useState([])
	const [scrollIndicator, setScrollIndicator] = useState(true)

	useEffect(() => {
		setShuffledTeam(shuffleArray([...team]))
	}, [])

	useEffect(() => {
		return pageScrollProgress.scrollYProgress.on("change", (value) => {
			if (value > 0.8171) {
				setScrollIndicator(false)
			} else {
				setScrollIndicator(true)
			}
		})
	}, [pageScrollProgress.scrollYProgress])

	return (
		<>
			<div
				className={`${
					isParallaxEnabled
						? "h-[950vh] overflow-hidden"
						: "h-screen overflow-y-scroll"
				} bg-black w-screen overflow-x-hidden`}
				ref={pageRef}
			>
				<section className="h-full flex justify-center items-center relative">
					{isParallaxEnabled ? (
						<motion.div
							style={{
								scale: heroSectionScale,
								opacity: heroSectionOpacity
							}}
							className="fixed top-0 h-screen w-screen flex justify-center items-center"
						>
							<Image
								src="/logo.svg"
								width={1050}
								height={300}
								alt="Existence Logo"
								className="md:hidden"
							/>
							<div className="xs:max-md:hidden h-screen w-screen">
								<ThreeDModel />
							</div>
							<BackgroundBeams />
							{scrollIndicator && <ScrollIndicator />}
						</motion.div>
					) : (
						<div className="h-screen w-screen flex justify-center items-center relative">
							<Image
								src="/logo.svg"
								width={1050}
								height={300}
								alt="Existence Logo"
								className="md:hidden"
							/>
							<div className="xs:max-md:hidden h-screen w-screen">
								<ThreeDModel />
							</div>
							<BackgroundBeams />
						</div>
					)}
					<button
						onClick={() => setIsParallaxEnabled(!isParallaxEnabled)}
						className="absolute top-4 right-4 px-4 py-2 bg-transparent text-gray-400 border border-gray-400 rounded-2xl"
					>
						{isParallaxEnabled ? (
							<>Disable Parallax</>
						) : (
							<>Enable Parallax</>
						)}
					</button>
				</section>
				<section className="h-full flex justify-center items-center">
					{isParallaxEnabled ? (
						<motion.div
							style={{
								scale: philosophySectionScale,
								opacity: philosophySectionOpacity
							}}
							className="fixed h-screen w-screen top-0 flex items-center justify-center"
						>
							<div
								className="h-full w-full relative flex flex-col items-center justify-center"
								style={{ position: "relative", zIndex: 1 }}
							>
								<DotBackground />
								<div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
								<p className="lg:text-4xl md:text-3xl sm:text-2xl xs:text-xl xs:p-0 xs:w-[90%] font-mono text-gray-400 text-justify p-2 md:w-2/3 font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
									Our philosophy promotes a holistic
									upliftment of all forms of existence,
									emphasizing progress, sustainability, and
									unification. We seek to transcend
									human-centric perspectives by valuing every
									entity, fostering innovation that harmonizes
									with nature, and committing to ethical
									responsibility. Our vision is to create a
									future where all aspects of reality are
									uplifted and interconnected.
								</p>
							</div>
						</motion.div>
					) : (
						<div className="h-screen w-screen flex items-center justify-center relative">
							<div
								className="h-full w-full relative flex flex-col items-center justify-center"
								style={{ position: "relative", zIndex: 1 }}
							>
								<DotBackground />
								<div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
								<p className="lg:text-4xl md:text-3xl sm:text-2xl xs:text-xl xs:p-0 xs:w-[90%] font-mono text-gray-400 text-justify p-2 md:w-2/3 font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
									Our philosophy promotes a holistic
									upliftment of all forms of existence,
									emphasizing progress, sustainability, and
									unification. We seek to transcend
									human-centric perspectives by valuing every
									entity, fostering innovation that harmonizes
									with nature, and committing to ethical
									responsibility. Our vision is to create a
									future where all aspects of reality are
									uplifted and interconnected
								</p>
							</div>
						</div>
					)}
				</section>

				<section className="md:h-[1100px] flex flex-col justify-center items-center">
					{isParallaxEnabled ? (
						<motion.div
							style={{
								scale: productsSectionScale,
								opacity: productsSectionOpacity
							}}
							className="fixed h-screen w-screen xs:max-md:-top-[30px] top-[30px] flex flex-col items-center justify-center"
						>
							<p
								className="lg:text-5xl md:text-4xl sm:text-3xl xs:text-xl xs:w-2/3 font-mono text-gray-400 text-center p-5 w-1/2 xs:max-md:mb-[125px] mb-20"
								style={{ zIndex: 100 }}
							>
								Our Products
							</p>
							<div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
							<div className="flex">
								<CardContainer className="inter-var">
									<CardBody className="bg-gray-50  group/card relative dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-[300px] rounded-xl p-6 border">
										<CardItem
											translateZ="50"
											className="text-xl font-bold text-neutral-600 dark:text-white"
										>
											Sentient
										</CardItem>
										<CardItem
											as="p"
											translateZ="60"
											className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
										>
											A completely private, decentralized
											& interactive AI companion
										</CardItem>
										<CardItem
											translateZ="100"
											className="w-full h-full mt-2"
										>
											<Image
												src="/sentient.svg"
												height="1"
												width="1"
												className="h-3/4 w-3/4 object-cover rounded-xl group-hover/card:shadow-xl"
												alt="thumbnail"
											/>
										</CardItem>
										<div className="flex justify-between items-center mt-20">
											<CardItem
												translateZ={20}
												as={Link}
												href="https://existence.technology/sentient"
												target="__blank"
												className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
											>
												Learn More
											</CardItem>
										</div>
									</CardBody>
								</CardContainer>
							</div>
						</motion.div>
					) : (
						<div className="h-full w-screen bg-grid-white/[0.2] relative flex flex-col items-center justify-center xs:pb-20 md:pb-0">
							<p
								className="lg:text-5xl md:text-4xl sm:text-3xl xs:text-2xl xs:w-2/3 font-mono text-gray-200 text-center w-1/2 xs:mb-[150px] md:mb-[50px]"
								style={{ zIndex: 100 }}
							>
								Our Products
							</p>
							<div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
							<div className="flex">
								<CardContainer className="inter-var">
									<CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
										<CardItem
											translateZ="50"
											className="text-xl font-bold text-neutral-600 dark:text-white"
										>
											Sentient
										</CardItem>
										<CardItem
											as="p"
											translateZ="60"
											className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
										>
											A completely private, decentralized
											& interactive AI companion
										</CardItem>
										<CardItem
											translateZ="100"
											className="w-full mt-4 flex justify-center"
										>
											<motion.img
												src="/sentient.svg"
												alt="Logo"
												animate={{
													scale: [1, 1.5, 1],
													translateY: [0, 10, 0]
												}}
												transition={{
													duration: 3,
													repeat: Infinity
												}}
												className="h-40 mt-8 w-full object-cover rounded-xl group-hover/card:shadow-xl"
												style={{
													maxHeight: "50%",
													maxWidth: "50%"
												}}
											/>
										</CardItem>
										<div className="flex justify-between items-center mt-20">
											<CardItem
												translateZ={20}
												as={Link}
												href="https://existence.technology/sentient"
												target="__blank"
												className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
											>
												Learn More
											</CardItem>
										</div>
									</CardBody>
								</CardContainer>
							</div>
						</div>
					)}
				</section>

				<section
					className="h-full flex justify-center items-center"
					style={{ position: "relative", zIndex: 1 }}
				>
					{isParallaxEnabled ? (
						<motion.div
							style={{
								scale: communitySectionScale,
								opacity: communitySectionOpacity
							}}
							className="fixed h-screen w-screen top-0 flex items-center justify-center"
						>
							<div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
							<DotBackground />
							<div
								className="xs:max-md:h-3/4 h-2/3 md:w-1/2 xs:w-3/4 relative xs:ml-5 md:ml-5"
								style={{ position: "relative" }}
							>
								<div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
								<DotBackground />
								<div
									className="xs:max-md:h-3/4 h-2/3 md:w-1/2 xs:w-3/4 relative xs:ml-5 md:ml-5"
									style={{ position: "relative" }}
								>
									<div className="relative shadow-xl bg-black border border-gray-800 px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
										<div className="h-5 w-5 rounded-full border flex items-center justify-center mb-4 border-gray-500">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth="1.5"
												stroke="currentColor"
												className="h-2 w-2 text-gray-300 xs:max-md:hidden"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"
												/>
											</svg>
										</div>

										<h1 className="font-mono font-bold lg:text-2xl md:text-xl sm:text-xl xs:text-xl p-2 text-white mb-4 relative z-50">
											Our Community
										</h1>

										<p className="font-mono lg:text-xl md:text-xl sm:text-xl xs:text-sm text-white text-justify p-2 md:mb-8 xs:mb-4 relative z-50">
											At Existence, our community
											CodeStreak is where innovation and
											camaraderie thrive. We unite
											individuals passionate about
											technology to share ideas, explore
											new concepts, and engage in
											meaningful discussions. We
											participate in hackathons, foster
											continuous learning, and build
											lasting connections. Whether you're
											a tech enthusiast or a hacker,
											you'll find inspiration and
											collaboration here. Join us today to
											be part of our vibrant network.
										</p>

										<div className="flex space-x-4 mb-4">
											<Link href="https://chat.whatsapp.com/Kf5oylkq2TaClGNM74TZjt">
												<button className="flex items-center border px-4 py-1 rounded-lg border-gray-500 text-white font-mono space-x-2">
													<Image
														src="/whatsapp.svg"
														width={20}
														height={20}
														alt="Whatsapp"
													/>
													<span>WhatsApp</span>
												</button>
											</Link>
											<Link href="https://www.instagram.com/codestreak.dev/">
												<button className="flex items-center border px-4 py-1 rounded-lg border-gray-500 text-white font-mono space-x-2">
													<Image
														src="/instagram.svg"
														width={20}
														height={20}
														alt="Instagram"
													/>
													<span>Instagram</span>
												</button>
											</Link>
											<Link href="https://www.youtube.com/@codestreak">
												<button className="flex items-center border px-4 py-1 rounded-lg border-gray-500 text-white font-mono space-x-2">
													<Image
														src="/youtube.svg"
														width={20}
														height={20}
														alt="YouTube"
													/>
													<span>YouTube</span>
												</button>
											</Link>
										</div>

										<Meteors number={20} />
									</div>
								</div>
							</div>
						</motion.div>
					) : (
						<div className="h-screen w-screen flex items-center justify-center">
							<div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
							<DotBackground />
							<div
								className="xs:max-md:h-3/4 h-2/3 md:w-1/2 xs:w-3/4 relative xs:ml-5 md:ml-5"
								style={{ position: "relative" }}
							>
								<div className="relative shadow-xl bg-black border border-gray-800 px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
									<div className="h-5 w-5 rounded-full border flex items-center justify-center mb-4 border-gray-500">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth="1.5"
											stroke="currentColor"
											className="h-2 w-2 text-gray-300 xs:max-md:hidden"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"
											/>
										</svg>
									</div>

									<h1 className="font-mono font-bold lg:text-2xl md:text-xl sm:text-xl xs:text-xl p-2 text-white mb-4 relative z-50">
										Our Community
									</h1>

									<p className="font-mono lg:text-xl md:text-xl sm:text-xl xs:text-sm text-white text-justify p-2 md:mb-8 xs:mb-4 relative z-50">
										At Existence, our community CodeStreak
										is where innovation and camaraderie
										thrive. We unite individuals passionate
										about technology to share ideas, explore
										new concepts, and engage in meaningful
										discussions. We participate in
										hackathons, foster continuous learning,
										and build lasting connections. Whether
										you're a tech enthusiast or a hacker,
										you'll find inspiration and
										collaboration here. Join us today to be
										part of our vibrant network.
									</p>

									<div className="flex space-x-4 mb-4">
										<Link href="https://chat.whatsapp.com/Kf5oylkq2TaClGNM74TZjt">
											<button className="flex items-center border px-4 py-1 rounded-lg border-gray-500 text-white font-mono space-x-2">
												<Image
													src="/whatsapp.svg"
													width={20}
													height={20}
													alt="Whatsapp"
												/>
												<span>WhatsApp</span>
											</button>
										</Link>
										<Link href="https://www.instagram.com/codestreak.dev/">
											<button className="flex items-center border px-4 py-1 rounded-lg border-gray-500 text-white font-mono space-x-2">
												<Image
													src="/instagram.svg"
													width={20}
													height={20}
													alt="Instagram"
												/>
												<span>Instagram</span>
											</button>
										</Link>
										<Link href="https://www.youtube.com/@codestreak">
											<button className="flex items-center border px-4 py-1 rounded-lg border-gray-500 text-white font-mono space-x-2">
												<Image
													src="/youtube.svg"
													width={20}
													height={20}
													alt="YouTube"
												/>
												<span>YouTube</span>
											</button>
										</Link>
									</div>

									<Meteors number={20} />
								</div>
							</div>
						</div>
					)}
				</section>
				<section className="h-full flex flex-col justify-center items-center ">
					{isParallaxEnabled ? (
						<motion.div
							style={{
								scale: teamSectionScale,
								opacity: teamSectionOpacity
							}}
							className="fixed h-screen w-screen top-0 z-50 flex flex-col items-center justify-around"
						>
							<div className="h-full w-full bg-black bg-grid-white/[0.2] relative flex flex-col items-center justify-center">
								<div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
								<div className="flex flex-col justify-center w-full p-20 gap-10">
									<div className="flex justify-center">
										<p className="lg:text-6xl md:text-5xl sm:text-4xl xs:text-3xl xs:w-full font-mono text-gray-400 text-center p-5 w-1/2 xs:max-md:-mt-10 mb-10">
											Our Team
										</p>
									</div>
									<div className="flex md:flex-row xs:flex-col xs:gap-2 items-center justify-center mb-10 w-full md:gap-10">
										<AnimatedTooltip items={shuffledTeam} />
									</div>
								</div>
							</div>
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
						</motion.div>
					) : (
						<>
							<div className="h-full w-full bg-black bg-grid-white/[0.2] relative flex flex-col items-center justify-center">
								{/* Radial gradient for the container to give a faded look */}
								<div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
								<div className="flex flex-col justify-center w-full p-20 gap-10">
									<div className="flex justify-center">
										<p className="lg:text-6xl md:text-5xl sm:text-4xl xs:text-3xl xs:w-full font-mono text-gray-400 text-center p-5 w-1/2 xs:max-md:-mt-10 mb-10">
											Our Team
										</p>
									</div>
									<div className="flex md:flex-row xs:flex-col xs:gap-2 items-center justify-center mb-10 w-full md:gap-10">
										<AnimatedTooltip items={shuffledTeam} />
									</div>
								</div>
							</div>
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
						</>
					)}
				</section>
			</div>
		</>
	)
}

export default Home
