import Image from 'next/image';

const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-6 py-12 bg-black overflow-hidden">
      <div className="md:w-1/2 text-center md:text-left">
        <h1 className="text-right text-6xl md:text-8xl font-bold text-white mb-4 leading-tight md:text-center">
          <span className="block">Transforming</span>
          <span className="block">Ideas to</span>
          <span className="block">Realities</span>
        </h1>
        <div className="w-2/3 flex justify-center md:justify-end">
          <button className="mt-6 px-12 py-6 bg-gray-200 text-black text-2xl font-semibold rounded-lg hover:bg-white transition-colors duration-300">
            Book a Call Now
          </button>
        </div>
      </div>
     <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
        <Image src="/hand-img.png" alt="Transforming Ideas" width={600} height={600} className="object-contain"/>
      </div>
    </div>
  );
};

export default Hero;
