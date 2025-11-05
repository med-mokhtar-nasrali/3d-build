import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const text = "Eagle Vision Estate".split("");

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
          {/* Animated Brand Text */}
          <div className="flex space-x-1 text-4xl md:text-6xl font-extrabold tracking-wider mb-8">
            {text.map((letter, index) => (
              <motion.span
                key={index}
                initial={{ y: 50, opacity: 0 }}
                animate={{
                  y: 0,
                  opacity: 1,
                  color: "#22c55e", // Tailwind green-500
                }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.6,
                  ease: "easeOut",
                }}
                className="inline-block"
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-green-500"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeInOut", duration: 0.3 }}
            />
          </div>

          {/* Text Percentage */}
          <motion.p
            className="mt-4 text-sm text-gray-300 tracking-wider"
            key={progress}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {progress}% Loading
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
