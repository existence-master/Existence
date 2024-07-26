"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const MindSync = () => {
  const router = useRouter();

  useEffect(() => {
    // Show loading screen for a short duration before redirecting
    const timer = setTimeout(() => {
      router.push("https://existence-mindsync.vercel.app");
    }, 3000); // 1 second delay for loading screen

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="h-screen w-screen bg-black flex flex-col items-center justify-center">
      <motion.img
        src="/existencering.png"
        className="w-[200px] h-[200px]"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 3 }}
      />
      <p className="text-white font-mono text-3xl mt-8">Loading MindSync...</p>
    </div>
  );
};

export default MindSync;
