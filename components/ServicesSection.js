import React from 'react';

const ServicesSection = () => {
  const services = [
    {
      title: 'Web Development',
      icon: '/web-development.jpeg',
      description: 'Custom web solutions tailored to your business needs.',
    },
    {
      title: 'App Development',
      icon: '/app-development.jpeg',
      description: 'Build native or cross-platform apps for various devices.',
    },
    {
      title: 'AI Integration',
      icon: '/ai-integration.jpeg',
      description: 'Integrate AI technologies to automate processes and gain insights.',
    },
  ];

  return (
    <div className="py-16 bg-black">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-6xl font-bold text-center mb-8">Our Services</h2>
        <div className="flex flex-wrap justify-center gap-10 ">
          {services.map((service, index) => (
            <div key={index} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-6 flex items-center justify-center">
              <div className="bg-gray-800 p-8 rounded-xl w-full shadow-lg text-center">
                <img src={service.icon} alt={service.title} className="h-48  object-fill mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-2">{service.title}</h3>
                <p className="text-white">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesSection