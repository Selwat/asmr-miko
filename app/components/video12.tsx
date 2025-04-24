/* import type { Metadata } from "next"
import "./globals.css"
import React from "react"

export const metadata: Metadata = {
  title: "Weather Widget",
  description: "App",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`bg-blue-900`}>{children}</body>
    </html>
  )
}
 */

"use client"

import React from "react"
import { motion } from "framer-motion"
import { CloudLightning, Droplet, Wind, MapPin, Search } from "lucide-react"

type Weather = {
  location: string
  temperature: number
  condition: string
  humidity: number
  windSpeed: number
}

const data: Weather = {
  location: "Poland",
  temperature: 4,
  condition: "Rain",
  humidity: 99,
  windSpeed: 4,
}

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm"
      >
        <div className="flex items-center justify-between mb-4">
          <span className="flex items-center text-lg font-medium text-gray-700">
            <MapPin size={20} className="mr-2 text-gray-600" />
            {data.location}
          </span>
          <button
            aria-label="Search"
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <Search size={20} className="text-gray-600" />
          </button>
        </div>

        <div className="flex flex-col items-center">
          <CloudLightning size={80} className="text-blue-400 mb-2" />
          <span className="text-6xl font-bold text-gray-800">
            {data.temperature}°C
          </span>
          <span className="text-xl text-gray-600">{data.condition}</span>
        </div>

        <div className="flex justify-between mt-6 text-gray-700">
          <span className="flex items-center">
            <Droplet className="mr-1" size={18} /> {data.humidity}%
          </span>
          <span className="flex items-center">
            <Wind className="mr-1" size={18} /> {data.windSpeed} Km/h
          </span>
        </div>
      </motion.div>
    </div>
  )
}