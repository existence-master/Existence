"use client";

import { BackgroundBeams } from "@components/background-beams";
import { EvervaultCard } from "@components/hover-card";
import { PinContainer } from "@components/3dpin";
import { AnimatedTooltip } from "@components/animatedtooltip";
import Image from "next/image";

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
      designation: "Machine Learning Engineer",
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
            <p className="text-4xl font-mono text-gray-400 text-center p-5 w-1/2 font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
              We envision a paradigm shift from human-centric approaches to
              holistic upliftment of all forms of existence. Our philosophy
              emphasizes interconnectedness, sustainability, and inclusivity,
              aiming to break free from siloed perspectives hindering true
              progress. We celebrate diversity, advocate for ethical
              responsibility, and prioritize technological innovation aligned
              with the natural world. Ushering in a new era, we redefine
              compassion, responsibility, and progress, aspiring to contribute
              to a future where every facet of our shared reality experiences
              benevolent upliftment.
            </p>
          </div>
        </section>
        <section className="h-screen flex flex-col justify-center items-center bg-black overflow-hidden">
          <p className="text-4xl font-mono text-gray-400 text-center p-5 w-1/2 mb-10">
            At Existence, our mission is twofold: to craft groundbreaking
            products that redefine industries and to provide unparalleled
            services that empower our clients to thrive in a dynamic
            marketplace.
          </p>
          <div className="flex justify-center w-full h-1/2 p-20 gap-20">
            <EvervaultCard
              text="Product Innovation"
              className="w-[400px] h-[400px] text-center border-2 border-gray-400 rounded-3xl"
            />
            <EvervaultCard
              text="Service Excellence"
              className="w-[400px] h-[400px] text-center border-2 border-gray-400 rounded-3xl"
            />
          </div>
        </section>
        <section className="gradient-bg h-screen flex flex-col justify-center items-center bg-black overflow-hidden">
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
          <p className="text-4xl font-mono text-gray-400 text-center p-5 w-1/2 mb-10">
            Our Products
          </p>
          <div className="flex justify-center w-full h-1/2 p-20">
            <div className="w-full flex items-center justify-center gap-20">
              <a href="https://existence-bloomify.vercel.app/">
                <PinContainer
                  title="🌎 bloomify.app"
                  href="https://existence-bloomify.vercel.app/"
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
              </a>
              <PinContainer title="🌎 mindsync.app" href="">
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
        <section className="h-screen flex flex-col justify-center items-center bg-black overflow-hidden">
          <div className="h-full w-full bg-black bg-grid-white/[0.2] relative flex items-center justify-center">
            {/* Radial gradient for the container to give a faded look */}
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            <div className="flex flex-col justify-center w-full p-20 gap-10">
              <div className="flex justify-center">
                <p className="text-6xl font-mono text-gray-400 text-center p-5 w-1/2 mb-10">
                  Our Team
                </p>
              </div>
              <div className="flex flex-row items-center justify-center mb-10 w-full gap-10">
                <AnimatedTooltip items={team} />
              </div>
            </div>
          </div>
        </section>
        <footer class="bg-black">
          <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400 font-mono">
              2024{" "}
              <a href="#" class="hover:underline">
                Existence
              </a>
              . All Rights Reserved.
            </span>
            <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0 gap-5">
              <li>
                <a
                  href="https://chat.whatsapp.com/L7AV0xSGxH292WbXBHErbB"
                  class="hover:underline me-4 md:me-6"
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
                  class="hover:underline me-4 md:me-6"
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
                  class="hover:underline me-4 md:me-6"
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
