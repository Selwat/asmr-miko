"use client"

import React, { useState } from "react"

export default function LoginPage() {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Username:", username, "Password:", password)
  }

  return (
    <div
      className="
      relative 
      min-h-screen 
      w-full 
      bg-no-repeat 
      bg-cover 
      bg-center 
      flex 
      items-center 
      justify-center
    "
      style={{ backgroundImage: "url('/image1.png')" }}
    >
      <div className="max-w-md w-full bg-gray-900/90 rounded-lg shadow-2xl">
        {/* Obrazek nad panelem logowania */}
        <img
          src="/image2.png"
          alt="Banner"
          className="w-full h-auto mb-6 rounded-t-lg"
        />

        {/* Nagłówek z ikoną */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-white rounded-full flex items-center 
          justify-center mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          <h1 className="text-white text-xl font-bold uppercase tracking-wide">
            User Login
          </h1>
        </div>

        {/* Formularz logowania */}
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block text-gray-300 text-sm mb-1"
            >
              Username
            </label>
            <div className="flex items-center bg-gray-800 rounded-md">
              <span className="pl-3 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.121 17.804A8 8 0 1118.88 17.804M12 14v.01"
                  />
                </svg>
              </span>
              <input
                id="username"
                type="text"
                className="w-full bg-transparent outline-none px-3 py-2 text-gray-200"
                placeholder="USERNAME"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-gray-300 text-sm mb-1"
            >
              Password
            </label>
            <div className="flex items-center bg-gray-800 rounded-md">
              <span className="pl-3 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 11c.63 0 1.184.192 1.651.518A2.995 2.995 0 0118 9v2a2 2 0 012
                     2v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5a2 2 0 012-2V9a3 3 0 116 0v2z"
                  />
                </svg>
              </span>
              <input
                id="password"
                type="password"
                className="w-full bg-transparent outline-none px-3 py-2 text-gray-200"
                placeholder="PASSWORD"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Opcje dodatkowe */}
          <div className="flex items-center justify-between text-sm text-gray-400">
            <div>
              <input
                type="checkbox"
                id="keepLoggedIn"
                className="mr-1 accent-purple-500"
              />
              <label htmlFor="keepLoggedIn" className="cursor-pointer">
                Keep me logged in
              </label>
            </div>
            <a href="#" className="hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Przycisk logowania */}
          <button
            type="submit"
            className="w-full py-2 rounded-md bg-gradient-to-r from-purple-500 
            to-pink-500 text-white font-semibold hover:opacity-90 transition-opacity"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
