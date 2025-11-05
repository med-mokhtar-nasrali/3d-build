import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/Logo2-BNG.png"; // ← adjust path to your actual logo


const text = "BNGIMMO".split("");

export default function Loader({ progress }) {
  return (
    <AnimatePresence>
      {progress < 100 && (
        <motion.div
          key="loader"
          className="fixed inset-0 flex flex-col items-center justify-center bg-black text-white z-50"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1.2 } }}
        >
          {/* Logo (larger, no glow) */}
          <motion.img
            src={logo}
            alt="BNGIMMO Logo"
            className="w-44 md:w-56 mb-8" // increased size, removed glow
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />

          {/* Animated Brand Text */}
          <div className="flex space-x-1 text-5xl md:text-7xl font-extrabold tracking-widest mb-8">
            {text.map((letter, index) => (
              <motion.span
                key={index}
                initial={{ y: 50, opacity: 0 }}
                animate={{
                  y: 0,
                  opacity: 1,
                  color: "#FFD700", // Gold color
                }}
                transition={{
                  delay: index * 0.15,
                  duration: 0.7,
                  ease: "easeOut",
                }}
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* Gold Gradient Progress Bar */}
          <div className="w-72 h-2 bg-white/20 rounded-full overflow-hidden shadow-inner">
            <motion.div
              className="h-full"
              style={{
                background:
                  "linear-gradient(90deg, #fff4cc 0%, #FFD700 50%, #fff4cc 100%)",
              }}
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeInOut", duration: 0.3 }}
            />
          </div>

          {/* Loading Percentage */}
          <motion.p
            className="mt-5 text-base tracking-wider text-gray-300"
            key={progress}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <span className="text-[#FFD700] font-semibold">{progress}%</span> Loading
          </motion.p>

          {/* Subtle Glow Animation */}
          <motion.div
            className="absolute inset-0 bg-gradient-radial from-[#FFD700]/10 via-transparent to-transparent pointer-events-none"
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
