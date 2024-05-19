"use client";

import { BackgroundBeams } from "@components/background-beams";
import { EvervaultCard } from "@components/hover-card";
import { PinContainer } from "@components/3dpin";
import { AnimatedTooltip } from "@components/animatedtooltip";
import { Meteors } from "@components/meteors";
import Image from "next/image";
import Link from "next/link";
import { Parallax } from "react-scroll-parallax";

export default function Home() {
  const team = [
    {
      id: 1,
      name: "Sarthak Karandikar",
      designation: "Co-Founder",
      image: "/sarthak.jpeg",
    },
    {
      id: 2,
      name: "Kabeer Ahmed Merchant",
      designation: "Co-Founder",
      image: "/kabeer.jpeg",
    },
    {
      id: 3,
      name: "Abhijeet Suryawanshi",
      designation: "Data Scientist",
      image: "/temp.png",
    },
    {
      id: 4,
      name: "Varad Deshpande",
      designation: "Full Stack Developer",
      image: "/varad.jpeg",
    },
    {
      id: 5,
      name: "Ojaswini Prabhune",
      designation: "UI/UX Designer",
      image: "/temp.png",
    },
    {
      id: 6,
      name: "Heramb Patil",
      designation: "Generative AI Engineer",
      image: "/heramb.jpeg",
    },
    {
      id: 7,
      name: "Abhishek Kange",
      designation: "Head of Services",
      image: "/abhishek.jpeg",
    },
  ];
  return (
    <>
      <div className="w-full h-screen bg-black">
        <section className="h-screen flex justify-center items-center overflow-hidden">
          <Image
            src="/logobanner.png"
            width={1050}
            height={300}
            alt="Existence Banner"
          />
          <BackgroundBeams />
        </section>
        <section className="h-screen flex justify-center items-center bg-black overflow-hidden">
          <div className="h-full w-full bg-black bg-dot-white/[0.4] relative flex flex-col items-center justify-center">
            {/* Radial gradient for the container to give a faded look */}
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            <p className="lg:text-4xl md:text-3xl sm:text-2xl xs:text-xl xs:p-0 xs:w-2/3 font-mono text-gray-400 text-center p-2 md:w-1/2 font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
              Our philosophy promotes a holistic upliftment of all forms of
              existence, emphasizing interconnectedness, sustainability, and
              inclusivity. We seek to transcend human-centric perspectives by
              valuing every entity, fostering innovation that harmonizes with
              nature, and committing to ethical responsibility. Our vision is to
              create a future where all aspects of reality are uplifted and
              interconnected.
            </p>
          </div>
        </section>
        <section className="h-screen flex flex-col justify-center items-center bg-black overflow-hidden">
          <p className="lg:text-4xl md:text-3xl sm:text-2xl xs:text-xl xs:w-2/3 xs:p-0 font-mono text-gray-400 text-center p-3 w-1/2 mb-10">
            At Existence, our mission is twofold: to craft groundbreaking
            products that redefine industries and to provide unparalleled
            services that empower our clients to thrive in a dynamic
            marketplace.
          </p>
          <div className="flex justify-center w-full h-1/2 p-20 md:gap-20 xs:gap-5">
            <EvervaultCard
              text="Product Innovation"
              className="w-[400px] h-[400px] text-center border border-gray-500 rounded-3xl"
            />
            <EvervaultCard
              text="Service Excellence"
              className="w-[400px] h-[400px] text-center border border-gray-500 rounded-3xl"
            />
          </div>
        </section>
        <section className="gradient-bg h-screen flex flex-col justify-center items-center overflow-hidden">
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
          <p className="lg:text-5xl md:text-4xl sm:text-3xl xs:text-xl xs:w-2/3 font-mono text-gray-400 text-center p-5 w-1/2 mb-10 xs:mb-32 md:mb-20">
            Our Products
          </p>
          <div className="flex justify-center w-full h-1/2 p-20 xs:mb-20">
            <div className="w-full flex md:flex-row items-center justify-center gap-20 xs:gap-10 xs:flex-col">
              <Link href="https://existence-bloomify.vercel.app/">
                <PinContainer
                  title="🌎 bloomify.app"
                  href="https://existence-bloomify.vercel.app/"
                  className=""
                >
                  <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] ">
                    <h3 className="max-w-xs !pb-2 !m-0 font-bold font-mono text-base text-slate-100">
                      Bloomify
                    </h3>
                    <div className="text-base !m-0 !p-0 font-normal">
                      <span className="text-slate-500 font-mono">
                        Elevating assessment to an art form with AI-driven
                        precision, fostering academic excellence one question at
                        a time.
                      </span>
                    </div>
                    <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500" />
                  </div>
                </PinContainer>
              </Link>
              <PinContainer title="🌎 mindsync.app" href="" className="">
                <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] ">
                  <h3 className="max-w-xs !pb-2 !m-0 font-bold font-mono text-base text-slate-100">
                    MindSync
                  </h3>
                  <div className="text-base !m-0 !p-0 font-normal">
                    <span className="text-slate-500 font-mono">
                      Transforming ideas into beautiful mind maps instantly with
                      the power of AI.
                    </span>
                  </div>
                  <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500" />
                </div>
              </PinContainer>
            </div>
          </div>
        </section>
        <section className="h-screen flex justify-center items-center bg-black overflow-hidden">
          <div className="h-2/3 md:w-1/2 xs:w-2/3 relative xs:ml-5 md:ml-5">
            <div className="relative shadow-xl bg-black border border-gray-800  px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
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
                At Existence, our community is where innovation and camaraderie
                thrive. We unite individuals passionate about science,
                technology, and philosophy to share ideas, explore new concepts,
                and engage in meaningful discussions. We participate in
                hackathons, foster continuous learning, and build lasting
                connections. Whether you're a tech enthusiast or a philosophy
                buff, you'll find inspiration and collaboration here. Join us
                today to be part of our vibrant network.
              </p>
              <Link href="https://chat.whatsapp.com/L7AV0xSGxH292WbXBHErbB">
                <button className="border px-4 py-1 rounded-lg border-gray-500 text-white font-mono">
                  Join Now!
                </button>
              </Link>
              <Meteors number={20} />
            </div>
          </div>
          {/*
            <div className="h-2/3 w-1/2 p-5 flex justify-center items-center xs:max-md:hidden">
              <a
                href="https://chat.whatsapp.com/L7AV0xSGxH292WbXBHErbB"
                className="hover:underline me-4 md:me-6"
              >
                <p className="text-white text-xl">Image here</p>
              </a>
            </div>
          */}
        </section>
        <section className="h-screen flex flex-col justify-center items-center bg-black overflow-hidden">
          <div className="h-full w-full bg-black bg-grid-white/[0.2] relative flex items-center justify-center">
            {/* Radial gradient for the container to give a faded look */}
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            <div className="flex flex-col justify-center w-full p-20 gap-10">
              <div className="flex justify-center">
                <p className="lg:text-6xl md:text-5xl sm:text-4xl xs:text-3xl xs:w-full font-mono text-gray-400 text-center p-5 w-1/2 mb-10">
                  Our Team
                </p>
              </div>
              <div className="flex md:flex-row xs:flex-col xs:gap-2 items-center justify-center mb-10 w-full md:gap-10">
                <AnimatedTooltip items={team} />
              </div>
            </div>
          </div>
        </section>
        <footer className="bg-black">
          <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400 font-mono">
              2024{" "}
              <a href="#" className="hover:underline">
                Existence
              </a>
              . All Rights Reserved.
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
                  alt="Whatsapp Community"
                />
                existence.master@gmail.com
              </a>
            </span>
            <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0 gap-5">
              <li>
                <a
                  href="https://chat.whatsapp.com/L7AV0xSGxH292WbXBHErbB"
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
        </footer>
      </div>
    </>
  );
}
