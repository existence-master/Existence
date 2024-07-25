"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const Bloomify = () => {
  const router = useRouter();

  useEffect(() => {
    // Show loading screen for a short duration before redirecting
    const timer = setTimeout(() => {
      window.location.replace("https://existence-bloomify.vercel.app");
    }, 3000); // 1 second delay for loading screen

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="h-screen w-screen bg-black flex items-center justify-center">
      <motion.img
        src="/existencering.png"
        className="w-[200px] h-[200px]"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 3 }}
      />
    </div>
  );
};

export default Bloomify;
