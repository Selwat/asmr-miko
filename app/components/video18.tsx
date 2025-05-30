"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, CloudRain, Moon, Flame } from "lucide-react";

const THEMES = [
  {
    name: "Rain",
    icon: <CloudRain />,
    video: "/rain.mp4",
    message: "Let it rain, let it wash away your stress."
  },
  {
    name: "Fireplace",
    icon: <Flame />,
    video: "/fireplace.mp4",
    message: "Feel the warmth of a gentle fire."
  },
  {
    name: "Night Sky",
    icon: <Moon />,
    video: "/nightsky.mp4",
    message: "Gaze into the endless night sky."
  },
  {
    name: "Magic",
    icon: <Sparkles />,
    video: "/magic.mp4",
    message: "Immerse yourself in tranquil wonder."
  }
];

export default function ZenRoom() {
  const [theme, setTheme] = useState(THEMES[0]);

  return (
    <main className="relative min-h-screen w-full 
    overflow-hidden text-white font-sans flex flex-col 
    items-center justify-center px-6 py-12">
      <video
        key={theme.name}
        src={theme.video}
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full 
        object-cover z-0"
      />
      <div className="absolute top-0 left-0 w-full h-full 
      bg-black/50 z-0" />

      <AnimatePresence mode="wait">
        <motion.div
          key={theme.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center"
        >
          <h1 className="text-4xl sm:text-6xl font-bold 
          mb-6">
            {theme.name} Mode
          </h1>
          <p className="text-xl sm:text-2xl max-w-xl mx-auto 
          text-neutral-200">
            {theme.message}
          </p>
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 mt-16 grid grid-cols-2 
      sm:grid-cols-4 gap-4">
        {THEMES.map((item) => (
          <button
            key={item.name}
            onClick={() => setTheme(item)}
            className={`flex flex-col items-center justify-center 
                px-4 py-6 rounded-xl border border-white/20 
                hover:bg-white/10 transition-all duration-300 ${
              theme.name === item.name ? "bg-white/10" : ""
            }`}
          >
            <div className="mb-2">{item.icon}</div>
            <span className="text-sm font-semibold">{item.name}</span>
          </button>
        ))}
      </div>
    </main>
  );
}