"use client";

import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import Link from "next/link";

export default function HomeClient({ initialGlobalCount }: { initialGlobalCount: number }) {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ opacity: [0.5, 1, 0.5], scale: [0.95, 1.05, 0.95], transition: { duration: 4, repeat: Infinity, ease: "easeInOut" } });
  }, [controls]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      
      {/* Background Animated Auroras */}
      <motion.div animate={controls} className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[30rem] h-[30rem] bg-saffron-500/20 blur-[120px] rounded-full pointer-events-none -z-10" />
      <motion.div animate={{ opacity: [0.3, 0.7, 0.3], scale: [1.1, 0.9, 1.1] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-[20%] right-[10%] w-[20rem] h-[20rem] bg-purple-600/20 blur-[100px] rounded-full pointer-events-none -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-md w-full z-10 flex flex-col items-center"
      >
        {/* Divine Spiritual Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative w-48 h-48 md:w-56 md:h-56 mb-8 rounded-full p-1 bg-gradient-to-br from-gold-400 to-saffron-600 shadow-[0_0_40px_rgba(255,215,0,0.6)] flex items-center justify-center overflow-hidden"
        >
          <img 
            src="/maharaj.jpg" 
            alt="Maharaj" 
            className="w-full h-full object-cover rounded-full" 
          />
          {/* Subtle breathing glow overlay */}
          <motion.div 
             animate={{ opacity: [0, 0.3, 0] }} 
             transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
             className="absolute inset-0 bg-yellow-400/20 rounded-full pointer-events-none"
          />
        </motion.div>

        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-white/70 tracking-tight mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
          || श्री राम नाम ||
        </h1>
        <p className="text-xl text-white/50 mb-10 italic font-medium">
          || श्री राम जय राम जय जय राम ||
        </p>

        <div className="glass-card p-10 mb-12 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          
          <h2 className="text-white/80 font-bold mb-2 text-base tracking-widest uppercase">आजपर्यंत झालेला जप</h2>
          <div className="flex items-baseline justify-center gap-3">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2, type: "spring" }}
              className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-saffron-300 via-gold-400 to-saffron-600 py-2 drop-shadow-[0_0_20px_rgba(255,153,51,0.4)]"
            >
              {initialGlobalCount.toLocaleString("en-IN")}
            </motion.div>
            <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
               className="text-4xl md:text-5xl font-bold text-white/40 tracking-wide"
            >
              / 13,00,000 <span className="text-2xl md:text-3xl font-medium ml-1">जपमाळ</span>
            </motion.div>
          </div>
          <div className="text-saffron-400/80 text-sm font-semibold tracking-widest uppercase mt-1">
            Total Target
          </div>
        </div>

        <Link href="/add" className="block w-full">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full glow-button p-4 flex items-center justify-center gap-2 group"
          >
            <span className="text-xl tracking-wide">जप नोंदणी करा</span>
            <span className="text-2xl group-hover:translate-x-1 transition-transform">✨</span>
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}
