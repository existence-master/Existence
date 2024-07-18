import Link from "next/link";
import Image from "next/image";

const Services = () => {
  return (
    <main>
      <section
        id="hero"
        className="bg-black w-screen h-screen relative flex flex-row"
      >
        <Link href="/">
          <div className="absolute top-3 right-3" style={{ zIndex: 10 }}>
            <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                Back to Home
              </span>
            </button>
          </div>
        </Link>
        <div
          id="hero-text"
          className="w-1/2 h-full flex flex-col items-end justify-center"
        >
          <p
            className="text-8xl text-right text-white font-mono"
            style={{ zIndex: 5 }}
          >
            Transforming ideas to reality
          </p>
          <button className="inline-flex mt-8 h-16 w-[300px] animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#FFFFFF,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            Book a Call
          </button>
        </div>
        <div
          id="hero-text"
          className="w-1/2 h-full flex flex-col items-center justify-center"
        >
          <Image
            src="/services-hero.png"
            height={800}
            width={800}
            alt="Services Hero Section"
            style={{ zIndex: 0 }}
          />
        </div>
      </section>
      <section
        id="services-tech"
        className="bg-black w-screen h-[400px] relative flex flex-row"
      >
        <div
          id="services-tech"
          className="w-full h-full flex flex-col items-center justify-center"
        >
          <Image
            src="/services-tech.svg"
            width={800}
            height={100}
            alt="Services Tech"
          />
        </div>
      </section>
    </main>
  );
};

export default Services;
