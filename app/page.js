import { BackgroundBeams } from "@components/background-beams";
import { EvervaultCard } from "@components/hover-card";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="w-full h-screen bg-black">
        <section className="h-screen flex justify-center items-center overflow-hidden">
          <Image src="/logobanner.png" width={1050} height={300} alt="Existence Banner"/>
          <BackgroundBeams />
        </section>
        <section className="h-screen flex justify-center items-center bg-black overflow-hidden">
          <div className="h-full w-full bg-black bg-dot-white/[0.4] relative flex items-center justify-center">
            {/* Radial gradient for the container to give a faded look */}
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
              <p className="text-4xl font-Roboto text-gray-400 text-center p-5 w-1/2 font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
                Our philosophy represents a departure from conventional human-centric approaches, aiming for a holistic upliftment of all forms of existence. We emphasize interconnectedness, advocating for the well-being of not just humanity but also the environment and non-living entities. Sustainability and regeneration are central, promoting practices that nurture ecosystems and communities. Diversity is celebrated, fostering inclusivity and empowerment for all entities. We prioritize technological innovation aligned with nature and commit to ethical practices safeguarding the rights of all forms of existence. By redefining compassion and progress to encompass the interconnected nature of existence, we aim to contribute to a future where upliftment extends to every facet of reality.
              </p>
          </div>
        </section>
        <section className="h-screen flex flex-col justify-center items-center bg-black overflow-hidden">
          <p className="text-4xl font-Roboto text-gray-400 text-center p-5 w-1/2 mb-10">At Existence, our mission is twofold: to craft groundbreaking products that redefine industries and to provide unparalleled services that empower our clients to thrive in a dynamic marketplace.</p>
          <div className="flex justify-center w-full h-1/2 p-20 gap-10">
            <EvervaultCard text="Product Innovation" className="w-[400px] h-[400px] text-center" />
            <EvervaultCard text="Service Excellence" className="w-[400px] h-[400px] text-center" />
          </div>
        </section>
      </div>
    </>
  );
}
