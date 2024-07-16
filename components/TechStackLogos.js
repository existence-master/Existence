import React from 'react';

const TechStackLogos = () => {
  const logos = [
    { src: '/nextjs-logo.png', alt: 'Next.js' },
    { src: '/reactjs-logo.png', alt: 'React.js' },
    { src: '/tailwindcss-logo.jpeg', alt: 'Tailwind CSS' },
    { src: '/mongodb-logo.png', alt: 'MongoDB' },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 md:justify-between md:gap-4 items-center py-8 bg-black">
      {logos.map((logo, index) => (
        <div key={index} className={`w-full md:w-auto ${index === 0 ? 'ml-4 md:ml-20' : ''} ${index === logos.length - 1 ? 'mr-4' : ''}`}>
          <img src={logo.src} alt={logo.alt} className="w-full h-52  object-cover  rounded-xl " />
        </div>
      ))}
    </div>
  );
};

export default TechStackLogos;
