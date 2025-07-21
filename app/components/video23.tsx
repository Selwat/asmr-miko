/* @layer utilities {
  .animate-fade-in {
    animation: fadeIn 0.4s ease-out both;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.98);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
} */

"use client"

import { useState } from "react"
import { FaGoogle, FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa"
import { motion } from "framer-motion"

function Icon({ icon }: { icon: React.ReactNode }) {
  return (
    <button className="border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-100 text-teal-700 transition">
      {icon}
    </button>
  )
}

function Form({ type }: { type: "signin" | "signup" }) {
  return (
    <form className="flex flex-col gap-4 w-full max-w-sm mx-auto text-gray-700 animate-fade-in">
      <h1 className="text-2xl font-semibold text-center mb-2">
        {type === "signin" ? "Sign In" : "Create Account"}
      </h1>
      <div className="flex gap-3 justify-center">
        <Icon icon={<FaGoogle />} />
        <Icon icon={<FaFacebookF />} />
        <Icon icon={<FaGithub />} />
        <Icon icon={<FaLinkedinIn />} />
      </div>
      <span className="text-xs text-center text-gray-500">
        or use your email and password
      </span>

      {type === "signup" && (
        <input type="text" placeholder="Name" className="input-field" />
      )}
      <input type="email" placeholder="Email" className="input-field" />
      <input type="password" placeholder="Password" className="input-field" />
      {type === "signin" && (
        <a
          href="#"
          className="text-xs text-right text-teal-600 hover:underline"
        >
          Forgot your password?
        </a>
      )}
      <button className="mt-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium py-2 rounded-full uppercase transition">
        {type === "signin" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  )
}

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-200 to-emerald-300 flex items-center justify-center">
      <div className="relative w-[760px] h-[480px] bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Sliding Panel */}
        <motion.div
          className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-tr from-emerald-500 to-teal-600 text-white p-10 flex flex-col justify-center items-center z-10 rounded-3xl transition-all"
          animate={{ x: isSignUp ? "0%" : "100%" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <h2 className="text-3xl font-bold mb-2">
            {isSignUp ? "Welcome Back!" : "Hello, Friend!"}
          </h2>
          <p className="text-sm text-center max-w-xs mb-4">
            {isSignUp
              ? "To keep connected, log in with your info"
              : "Register with your personal details to use all site features"}
          </p>
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="border border-white px-6 py-2 rounded-full uppercase text-xs hover:bg-white hover:text-teal-700 transition"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </motion.div>

        {/* Forms Container */}
        <div className="absolute inset-0 grid grid-cols-2 z-0">
          <div
            className={`p-8 flex items-center justify-center transition-opacity duration-500 ${
              isSignUp ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            <Form type="signin" />
          </div>
          <div
            className={`p-8 flex items-center justify-center transition-opacity duration-500 ${
              isSignUp ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <Form type="signup" />
          </div>
        </div>
      </div>
    </div>
  )
}


