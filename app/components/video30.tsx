"use client"

import React, { useState } from "react"
import { User, Lock } from "lucide-react"

export default function LoginPage() {
  const [user, setUser] = useState("")
  const [pass, setPass] = useState("")

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => 
  {
    event.preventDefault()
  }

  return (
    <main
      className="flex items-center justify-center min-h-screen 
      bg-center bg-no-repeat bg-cover p-4"
      style={{ backgroundImage: "url('/background3.jpg')" }}
    >
      <section className="w-full max-w-md rounded-2xl shadow-2xl 
      overflow-hidden bg-gray-900/85 backdrop-blur-sm border 
      border-gray-700">
        <div className="relative">
          <img
            src="/background9.jpg"
            alt="Header banner"
            className="w-full h-40 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t 
          from-gray-900/70 to-transparent" />
          <h2 className="absolute bottom-3 left-1/2 
          -translate-x-1/2 text-white text-2xl font-bold 
          tracking-widest drop-shadow-lg">
            User Login
          </h2>
        </div>

        <form onSubmit={onFormSubmit} className="px-6 py-8 
        space-y-6">
          <div>
            <label htmlFor="user" className="block mb-1 text-sm 
            text-gray-300">
              Username
            </label>
            <div className="flex items-center bg-gray-800/70 
            rounded-lg border border-gray-700 
            focus-within:border-green-400 transition">
              <span className="pl-3 text-gray-400">
                <User className="w-5 h-5" />
              </span>
              <input
                id="user"
                type="text"
                placeholder="USERNAME"
                className="w-full px-3 py-2 text-gray-200 
                bg-transparent outline-none"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="pass" className="block mb-1 text-sm 
            text-gray-300">
              Password
            </label>
            <div className="flex items-center bg-gray-800/70 
            rounded-lg border border-gray-700 
            focus-within:border-green-400 transition">
              <span className="pl-3 text-gray-400">
                <Lock className="w-5 h-5" />
              </span>
              <input
                id="pass"
                type="password"
                placeholder="PASSWORD"
                className="w-full px-3 py-2 text-gray-200 
                bg-transparent outline-none"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex justify-between text-sm 
          text-gray-400">
            <label className="flex items-center gap-1">
            <input type="checkbox" className="accent-green-500" />
              Keep me logged in
            </label>
            <a href="#" className="hover:text-green-400 transition">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 font-semibold text-white 
            rounded-lg bg-gradient-to-r from-green-500 to-lime-500 
            hover:opacity-90 transition"
          >
            Login
          </button>
        </form>
      </section>
    </main>
  )
}
