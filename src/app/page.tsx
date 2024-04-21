import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Sticky NavBar using Tailwind CSS</title>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.16/dist/tailwind.min.css" rel="stylesheet" />
      </Head>
      <body className="bg-black">
        <header className="bg-black fixed top-0 w-full shadow-md relative z-10">
          <nav className="container mx-auto px-6 py-3">
            <div className="flex justify-between items-center">
              <a href="#" className="text-2xl font-mono text-gray-400">existence</a>
              <div className="hidden md:flex items-center space-x-4">
                <a href="#" className="text-slate-100 hover:text-blue-600 font-mono">vision</a>
                <a href="#" className="text-slate-100 hover:text-blue-600 font-mono">projects</a>
                <a href="#" className="text-slate-100 hover:text-blue-600 font-mono">contact</a>
                <a href="https://www.github.com/existence-master" className="bg-blue-600 text-white px-4 py-2 rounded-md font-mono">GitHub</a>
              </div>
              <div className="md:hidden flex items-center">
                <button className="text-gray-800 focus:outline-none"> {/* Add a hamburger menu icon here */}
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                  </svg>
                </button>
              </div>
            </div>
          </nav>
        </header>
        <div className='relative z-0'>
          <script type="module" src="https://unpkg.com/@splinetool/viewer@1.1.1/build/spline-viewer.js"></script>
          <spline-viewer loading-anim-type="none" events-target="global" url="https://prod.spline.design/NYtNrIfHTWcEkeYX/scene.splinecode"></spline-viewer>
        </div>
        <div className="bg-black text-gray-600 py-8 px-4 text-center relative z-5">
          <p className="font-bold font-mono">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed malesuada velit eget purus vulputate mollis. Mauris ut pharetra ipsum. Donec ut ante eget lorem consectetur condimentum.
          </p>
        </div>
      </body>
    </>
  );
}
