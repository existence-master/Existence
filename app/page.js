"use client";

import { BackgroundBeams } from "@components/BackgroundBeams";
import { EvervaultCard } from "@components/HoverCard";
import { PinContainer } from "@components/Animated3DPin";
import { AnimatedTooltip } from "@components/AnimatedTip";
import { Meteors } from "@components/AnimatedMeteors";
import { shuffleArray } from "@utils/helpers";
import Image from "next/image";
import Link from "next/link";
import DotBackground from "@components/DotBackground";
import ThreeDModel from "@components/3DModel";
import { useScroll, motion, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
	TextRevealCard,
	TextRevealCardDescription,
	TextRevealCardTitle,
} from "@components/TextRevealCard";
import ScrollIndicator from "@components/ScrollIndicator";

const Home = () => {
	const pageRef = useRef();
	const pageScrollProgress = useScroll(pageRef);

	const heroSectionOpacity = useTransform(
		pageScrollProgress.scrollYProgress,
		[0.0, 0.0714, 0.1429],
		[1, 0.5, 0]
	);

	const heroSectionScale = useTransform(
		pageScrollProgress.scrollYProgress,
		[0.0, 0.0714, 0.1429],
		[1, 2.5, 2.5]
	);

	const philosophySectionOpacity = useTransform(
		pageScrollProgress.scrollYProgress,
		[0.1029, 0.2143, 0.2857],
		[0, 1, 0]
	);

	const philosophySectionScale = useTransform(
		pageScrollProgress.scrollYProgress,
		[0.1029, 0.2143, 0.2857],
		[0, 1, 2.5]
	);

	const missionSectionOpacity = useTransform(
		pageScrollProgress.scrollYProgress,
		[0.2457, 0.3571, 0.4286],
		[0, 1, 0]
	);

	const missionSectionScale = useTransform(
		pageScrollProgress.scrollYProgress,
		[0.2457, 0.3571, 0.4286],
		[0, 1, 2.5]
	);

	const productsSectionOpacity = useTransform(
		pageScrollProgress.scrollYProgress,
		[0.3886, 0.5, 0.5714],
		[0, 1, 0]
	);

	const productsSectionScale = useTransform(
		pageScrollProgress.scrollYProgress,
		[0.3886, 0.5, 0.5714],
		[0, 1, 2.5]
	);

	const servicesSectionOpacity = useTransform(
		pageScrollProgress.scrollYProgress,
		[0.5314, 0.6429, 0.7143],
		[0, 1, 0]
	);

	const servicesSectionScale = useTransform(
		pageScrollProgress.scrollYProgress,
		[0.5314, 0.6429, 0.7143],
		[0, 1, 2.5]
	);

	const communitySectionOpacity = useTransform(
		pageScrollProgress.scrollYProgress,
		[0.6743, 0.7857, 0.8571],
		[0, 1, 0]
	);

	const communitySectionScale = useTransform(
		pageScrollProgress.scrollYProgress,
		[0.6743, 0.7857, 0.8571],
		[0, 1, 2.5]
	);

	const teamSectionOpacity = useTransform(
		pageScrollProgress.scrollYProgress,
		[0.8171, 0.9286, 1.0],
		[0, 1, 1]
	);

	const teamSectionScale = useTransform(
		pageScrollProgress.scrollYProgress,
		[0.8171, 0.9286, 1.0],
		[0, 1, 1]
	);

	const team = [
		{
			id: 1,
			name: "Sarthak Karandikar",
			designation: "Co-Founder",
			image: "https://media.licdn.com/dms/image/D4D03AQHRJYw1qo6xJQ/profile-displayphoto-shrink_800_800/0/1680586521971?e=1722470400&v=beta&t=NxgH4gMnSyWStc8OiZFNqJ-Mr__u0hIWbwxMeBtxczM",
			link: "https://www.linkedin.com/in/sarthak-karandikar-0223b7228/",
		},
		{
			id: 2,
			name: "Kabeer Ahmed Merchant",
			designation: "Co-Founder",
			image: "https://media.licdn.com/dms/image/D4D03AQEMuNC-u2rRMg/profile-displayphoto-shrink_400_400/0/1713373786015?e=1722470400&v=beta&t=zsqlhEdspr1xekmWePSUmde9SL5hXp9GWmFM2AHVXtU",
			link: "https://www.linkedin.com/in/kabeer-ahmed-merchant/",
		},
		{
			id: 3,
			name: "Abhijeet Suryawanshi",
			designation: "Data Scientist",
			image: "https://media.licdn.com/dms/image/C4D03AQGQwbIUH8_J4Q/profile-displayphoto-shrink_400_400/0/1655274054114?e=1722470400&v=beta&t=_TgDdVyB191SY97_rqBm6mrvMMJfFvSPBK_2bEaVz0E",
			link: "https://www.linkedin.com/in/abhijeet-suryawanshi-597a50240/",
		},
		{
			id: 4,
			name: "Ojaswini Prabhune",
			designation: "UI/UX Designer",
			image: "https://media.licdn.com/dms/image/D4D03AQHbGVe-IpHK4g/profile-displayphoto-shrink_400_400/0/1684558328615?e=1722470400&v=beta&t=yeViHdvM2h3f5DTazWdHzXJ59hPFK2rhx1ELzM4RLaM",
			link: "https://www.linkedin.com/in/ojaswini-prabhune-9ba11422b/",
		},
		{
			id: 5,
			name: "Varad Deshpande",
			designation: "Full Stack Developer",
			image: "https://media.licdn.com/dms/image/D4D03AQEDX-GUuDARoA/profile-displayphoto-shrink_400_400/0/1699323392187?e=1722470400&v=beta&t=426quJeaKKk-ufE_o4nVdTybvBhRKLnBp2XiqwoFYzI",
			link: "https://www.linkedin.com/in/varaddeshpande15/",
		},
		{
			id: 6,
			name: "Heramb Patil",
			designation: "Generative AI Engineer",
			image: "https://media.licdn.com/dms/image/D4D03AQEdHWjySzETsw/profile-displayphoto-shrink_800_800/0/1691663883682?e=1722470400&v=beta&t=kcGtLDl3FXaCYGj9rcFHP-3GySNNwoEEKByIsNH91Uk",
			link: "https://www.linkedin.com/in/herambvpatil/",
		},
		{
			id: 7,
			name: "Abhishek Kange",
			designation: "Full Stack App Developer",
			image: "https://media.licdn.com/dms/image/D4D03AQGew4PsN4Py6g/profile-displayphoto-shrink_800_800/0/1705497532440?e=1722470400&v=beta&t=NpRk0CdmIVTuDvdXSG7aHZ2JkX1ONZ_lXeXlz8LPPOc",
			link: "https://www.linkedin.com/in/abhishekkange/",
		},
	];

	const [shuffledTeam, setShuffledTeam] = useState([]);
	const [scrollIndicator, setScrollIndicator] = useState(true);

	 useEffect(() => {
			setShuffledTeam(shuffleArray([...team]));
	 }, []);
	
	useEffect(() => {
		return pageScrollProgress.scrollYProgress.on("change", (value) => {
			if (value > 0.8171) {
				setScrollIndicator(false)
			}

			else {
				setScrollIndicator(true)
			}
		});
	}, [pageScrollProgress.scrollYProgress]);

	return (
		<>
			<div className="h-[950vh] overflow-hidden bg-black" ref={pageRef}>
				<section className="h-full flex justify-center items-center">
					<motion.div
						style={{
							scale: heroSectionScale,
							opacity: heroSectionOpacity,
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
					</motion.div>
					{scrollIndicator && <ScrollIndicator />}
				</section>
				<section className="h-full flex justify-center items-center">
					<motion.div
						style={{
							scale: philosophySectionScale,
							opacity: philosophySectionOpacity,
						}}
						className="fixed h-screen w-screen top-0 flex items-center justify-center"
					>
						<div
							className="h-full w-full relative flex flex-col items-center justify-center"
							style={{ position: "relative", zIndex: 1 }}
						>
							<DotBackground />
							{/* Radial gradient for the container to give a faded look */}
							<div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
							<p className="lg:text-4xl md:text-3xl sm:text-2xl xs:text-xl xs:p-0 xs:w-[90%] font-mono text-gray-400 text-justify p-2 md:w-2/3 font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
								Our philosophy promotes a holistic upliftment of
								all forms of existence, emphasizing
								interconnectedness, sustainability, and
								inclusivity. We seek to transcend human-centric
								perspectives by valuing every entity, fostering
								innovation that harmonizes with nature, and
								committing to ethical responsibility. Our vision
								is to create a future where all aspects of
								reality are uplifted and interconnected.
							</p>
						</div>
					</motion.div>
				</section>
				<section className="h-full flex flex-col justify-center items-center">
					<motion.div
						style={{
							scale: missionSectionScale,
							opacity: missionSectionOpacity,
						}}
						className="fixed h-screen w-screen top-0 flex flex-col items-center justify-center"
					>
						<p className="lg:text-4xl md:text-3xl sm:text-2xl xs:text-xl xs:w-[90%] xs:p-0 font-mono text-gray-400 xs:max-md:text-justify text-center p-3 w-1/2 mb-10">
							At Existence, our mission is twofold: to craft
							groundbreaking products that redefine industries and
							to provide unparalleled services that empower our
							clients to thrive in a dynamic marketplace.
						</p>
						<div className="flex xs:max-md:flex-col items-center justify-center w-full h-1/2 p-20 md:gap-20 xs:gap-5">
							<EvervaultCard
								text="Product Innovation"
								className="xs:max-md:w-[350px] w-[400px] h-[400px] text-center border border-gray-500 rounded-3xl"
							/>
							<EvervaultCard
								text="Service Excellence"
								className="xs:max-md:w-[350px] w-[400px] h-[400px] text-center border border-gray-500 rounded-3xl"
							/>
						</div>
					</motion.div>
				</section>
				<section className="gradient-bg h-full flex flex-col justify-center items-center">
					<motion.div
						style={{
							scale: productsSectionScale,
							opacity: productsSectionOpacity,
						}}
						className="fixed h-screen w-screen xs:max-md:-top-[30px] top-[30px] flex flex-col items-center justify-center"
					>
						<p className="lg:text-5xl md:text-4xl sm:text-3xl xs:text-xl xs:w-2/3 font-mono text-gray-400 text-center p-5 w-1/2 xs:max-md:mb-[125px] mb-20">
							Our Products
						</p>
						<div className="flex justify-center w-full h-1/2 p-20">
							<div className="w-full flex md:flex-row items-center justify-center gap-20 xs:gap-10 xs:flex-col">
								<Link href="https://existence-bloomify.vercel.app/">
									<PinContainer
										title="🌎 bloomify.app (alpha)"
										href="https://existence-bloomify.vercel.app/"
										className=""
									>
										<div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] ">
											<h3 className="max-w-xs !pb-2 !m-0 font-bold font-mono text-base text-slate-100">
												Bloomify
											</h3>
											<div className="text-base !m-0 !p-0 font-normal">
												<span className="text-slate-500 font-mono">
													Elevating assessment to an
													art form with AI-driven
													precision, fostering
													academic excellence.
												</span>
											</div>
											<div className="flex flex-1 w-full rounded-lg mt-4 justify-center items-center bg-gradient-to-br from-gray-800 via-gray-600 to-gray-400">
												<Image
													src="/bloomify.svg"
													width={125}
													height={125}
													className="glow-effect-image"
												/>
											</div>
										</div>
									</PinContainer>
								</Link>
								<PinContainer
									title="🌎 mindsync.app (mvp)"
									href="https://existence-mindsync.vercel.app"
									className=""
								>
									<div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] ">
										<h3 className="max-w-xs !pb-2 !m-0 font-bold font-mono text-base text-slate-100">
											MindSync
										</h3>
										<div className="text-base !m-0 !p-0 font-normal">
											<span className="text-slate-500 font-mono">
												Transforming ideas into
												beautiful mind maps instantly
												with the power of AI.
											</span>
										</div>
										<div className="flex flex-1 w-full rounded-lg mt-4 justify-center items-center bg-gradient-to-br from-gray-800 via-gray-600 to-gray-400">
											<Image
												src="/mindsync.svg"
												width={125}
												height={125}
												className="glow-effect-image"
											/>
										</div>
									</div>
								</PinContainer>
							</div>
						</div>
					</motion.div>
				</section>
				<section className="gradient-bg h-full flex justify-center items-center">
					<motion.div
						style={{
							scale: servicesSectionScale,
							opacity: servicesSectionOpacity,
						}}
						className="fixed h-screen w-screen xs:max-md:top-0 top-[30px] flex flex-col items-center justify-center"
					>
						<p className="lg:text-5xl md:text-4xl sm:text-3xl xs:text-xl xs:w-2/3 font-mono text-gray-400 text-center p-5 w-1/2 xs:max-md:mb-10 mb-20">
							Our Services
						</p>
						<div className="flex xs:max-md:flex-col justify-center items-center w-full xs:max-md:gap-[20px] gap-[30px]">
							<div className="flex items-center justify-center bg-[#0E0E10] xs:max-md:h-[15rem] h-[30rem] rounded-2xl w-1/3 xs:max-md:w-[90%]">
								<TextRevealCard
									text="How can we help?"
									revealText="Web Development"
								>
									<TextRevealCardTitle>
										We are consistent
									</TextRevealCardTitle>
									<TextRevealCardDescription>
										We provide tailored web development
										solutions to suit your business needs.
										From e-commerce platforms to custom web
										applications, we've got you covered.
									</TextRevealCardDescription>
								</TextRevealCard>
							</div>
							<div className="flex items-center justify-center bg-[#0E0E10] xs:max-md:h-[15rem] h-[30rem] rounded-2xl w-1/3 xs:max-md:w-[90%]">
								<TextRevealCard
									text="How can we help?"
									revealText="App Development"
								>
									<TextRevealCardTitle>
										We are agile
									</TextRevealCardTitle>
									<TextRevealCardDescription>
										Elevate your business with our mobile
										app development services. We specialize
										in creating intuitive, minimalistic and
										feature-rich mobile applications for
										Android platform.
									</TextRevealCardDescription>
								</TextRevealCard>
							</div>
							<div className="flex items-center justify-center bg-[#0E0E10] xs:max-md:h-[15rem] h-[30rem] rounded-2xl w-1/3 xs:max-md:w-[90%]">
								<TextRevealCard
									text="How can we help?"
									revealText="AI Integration"
								>
									<TextRevealCardTitle>
										We are trendy
									</TextRevealCardTitle>
									<TextRevealCardDescription>
										Harness the power of artificial
										intelligence with our cutting-edge
										solutions. From machine learning
										algorithms to natural language
										processing, we deliver innovative AI
										solutions tailored to your business
										objectives.
									</TextRevealCardDescription>
								</TextRevealCard>
							</div>
						</div>
					</motion.div>
				</section>
				<section
					className="h-full flex justify-center items-center"
					style={{ position: "relative", zIndex: 1 }}
				>
					<motion.div
						style={{
							scale: communitySectionScale,
							opacity: communitySectionOpacity,
						}}
						className="fixed h-screen w-screen top-0 flex items-center justify-center"
					>
						{/* Radial gradient for the container to give a faded look */}
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
									Join the Existence Community!
								</h1>

								<p className="font-mono lg:text-xl md:text-xl sm:text-xl xs:text-sm text-white text-justify p-2 md:mb-8 xs:mb-4 relative z-50">
									At Existence, our community is where
									innovation and camaraderie thrive. We unite
									individuals passionate about science,
									technology, and philosophy to share ideas,
									explore new concepts, and engage in
									meaningful discussions. We participate in
									hackathons, foster continuous learning, and
									build lasting connections. Whether you're a
									tech enthusiast or a philosophy buff, you'll
									find inspiration and collaboration here.
									Join us today to be part of our vibrant
									network.
								</p>
								<Link href="https://chat.whatsapp.com/Kf5oylkq2TaClGNM74TZjt">
									<button className="border px-4 py-1 rounded-lg border-gray-500 text-white font-mono">
										Join Now!
									</button>
								</Link>
								<Meteors number={20} />
							</div>
						</div>
					</motion.div>
				</section>
				<section className="h-full flex flex-col justify-center items-center ">
					<motion.div
						style={{
							scale: teamSectionScale,
							opacity: teamSectionOpacity,
						}}
						className="fixed h-screen w-screen top-0 z-50 flex flex-col items-center justify-around"
					>
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
					</motion.div>
				</section>
			</div>
		</>
	);
};

export default Home;