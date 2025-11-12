import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/Logo2-BNG.png";

const text = "BNGIMMO".split("");

export default function Loader({ progress }) {
  return (
    <AnimatePresence>
      {progress < 100 && (
        <motion.div
          key="loader"
          className="fixed inset-0 flex flex-col items-center justify-center bg-black text-white z-50 overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1 } }}
        >
          {/* ✨ Floating Gold Background Animation ✨ */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(40)].map((_, i) => (
              <motion.span
                key={i}
                className="absolute w-[2px] h-[2px] bg-[#FFD700]/40 rounded-full"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -40, 0],
                  opacity: [0.2, 0.8, 0.2],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 6 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* 🔱 Logo (unchanged) */}
          <div className="relative mb-10 flex items-center justify-center">
            <img
              src={logo}
              alt="BNGIMMO Logo"
              className="w-44 md:w-56 select-none pointer-events-none"
            />
          </div>

          {/* 🔤 Brand Text (unchanged) */}
          <div className="flex space-x-1 text-5xl md:text-7xl font-extrabold tracking-widest mb-8">
            {text.map((letter, index) => (
              <motion.span
                key={index}
                className="inline-block bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #b38b00 0%, #FFD700 50%, #b38b00 100%)",
                  backgroundSize: "200% auto",
                }}
                initial={{ y: 60, opacity: 0 }}
                animate={{
                  y: 0,
                  opacity: 1,
                  backgroundPosition: ["200% center", "0% center"],
                }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.8,
                  ease: "easeOut",
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 2.2,
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* 🟡 Progress Bar (unchanged) */}
          <div className="relative w-80 h-3 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, #fff4cc 0%, #FFD700 50%, #fff4cc 100%)",
              }}
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeInOut", duration: 0.4 }}
            />
          </div>

          {/* 📊 Percentage */}
          <motion.p
            className="mt-5 text-base tracking-wider text-gray-300"
            key={progress}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <span className="text-[#FFD700] font-semibold">{progress}%</span> Loading
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
