/* @tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 0, 0, 0;
  --background-start-rgb: 214, 219, 220;
  --background-end-rgb: 255, 255, 255;
}

@media (prefers-color-scheme: dark) {
  :root {
    --foreground-rgb: 255, 255, 255;
    --background-start-rgb: 0, 0, 0;
    --background-end-rgb: 0, 0, 0;
  }
}

html,
body {
  overflow-x: hidden;
}

.star {
  position: absolute;
  width: 4px;
  height: 4px;
  background: white;
  border-radius: 9999px;
  opacity: 0.7;
  animation: drift 1s infinite ease-in-out;
}

@keyframes drift {
  0% {
    transform: translateY(0px) scale(1);
    opacity: 0.6;
  }
  50% {
    transform: translateY(-20px) scale(2);
    opacity: 1.4;
  }
  100% {
    transform: translateY(0px) scale(1);
    opacity: 0.6;
  }
}
 */

"use client"

import Image from "next/image"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaBars,
  FaTimes,
} from "react-icons/fa"

function CustomButton({
  children,
  onClick,
}: {
  children: React.ReactNode
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="mt-6 bg-orange-500 hover:bg-orange-600 
      text-white px-6 py-2 rounded-full shadow-lg transition 
      duration-300 select-none"
    >
      {children}
    </button>
  )
}

export default function NotFoundPage() {
  const [menuOpen, setMenuOpen] = useState(false)

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.4 } },
  }

  return (
    <div className="min-h-screen flex md:flex-row flex-col 
    items-center justify-center bg-[#1e0066] text-white px-6 
    md:px-20 relative overflow-hidden select-none space-y-8 
    lg:space-y-0 lg:space-x-12">
      {/* Left content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="z-10 text-left max-w-md mt-24 md:mt-0 md:mr-12"
      >
        <h1 className="text-6xl md:text-7xl font-bold 
        text-orange-400">404</h1>
        <h2 className="text-3xl md:text-4xl font-bold mt-4">
          Dead End!
        </h2>
        <p className="text-md md:text-lg mt-2 text-gray-300">
          The page you are looking for can’t be found
        </p>
        <CustomButton>BACK</CustomButton>
      </motion.div>

      {/* Foreground image with glow */}
      <div className="w-full max-w-[600px] md:max-w-[500px] 
      md:max-w-[800px] z-10 pointer-events-none">
        <Image
          src="/404.png"
          alt="404 Illustration"
          width={1200}
          height={800}
          className="w-full h-auto object-contain 
          drop-shadow-[0_0_80px_rgba(255,255,255,0.4)]"
          priority
        />
      </div>

      <div className="absolute inset-0 pointer-events-none 
      z-0 overflow-hidden">
        {Array.from({ length: 25 }).map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Social icons */}
      <div className="absolute bottom-8 left-6 md:left-20 
      flex gap-6 text-white z-10">
        <a href="#" aria-label="Instagram">
          <FaInstagram size={24} />
        </a>
        <a href="#" aria-label="Facebook">
          <FaFacebook size={24} />
        </a>
        <a href="#" aria-label="Twitter">
          <FaTwitter size={24} />
        </a>
      </div>

      {/* Logo */}
      <div className="absolute top-8 max-md:top-0 left-6 
      md:left-20 text-white font-semibold tracking-wide z-10 
      pointer-events-none">
        ASMR Miko
      </div>

      {/* Navigation */}
      <div className="absolute top-8 max-md:top-0 right-6 
      md:right-20 z-10">
        <div className="hidden md:flex gap-6 text-white 
        font-medium">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Blog</a>
          <a href="#">Contact</a>
        </div>

        {/* Mobile Nav Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={navVariants}
            className="absolute top-20 right-6 bg-[#2a007a] 
            rounded-md shadow-lg p-4 flex flex-col gap-4 
            md:hidden z-20"
          >
            <a href="#">Home</a>
            <a href="#">About</a>
            <a href="#">Blog</a>
            <a href="#">Contact</a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
