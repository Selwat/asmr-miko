"use client"
import React from "react"
import { motion } from "framer-motion"

const TrendingCard: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <motion.div className="relative" initial="initial" whileHover="hover">
        <motion.div
          variants={{
            initial: { rotate: 0 },
            hover: {
              rotate: [0, -45, 315],
              transition: { duration: 2, times: [0, 0.3, 1] },
            },
          }}
          className="absolute -inset-2 rounded-xl bg-gradient-to-r from-blue-500 to-green-500"
          style={{
            boxShadow:
              "0px 0px 20px 5px rgba(59,130,246,0.8), 0px 0px 20px 5px rgba(16,185,129,0.8)",
          }}
        />
        <div className="relative z-10 p-6 w-64 h-64 flex flex-col items-center justify-center text-center rounded-xl bg-black">
          <h1 className="text-white text-2xl font-bold"> Talk is cheap. Show me the code.</h1>
          <p className="text-orange-500 font-bold mt-10">ASMR Miko</p>
        </div>
      </motion.div>
    </div>
  )
}

export default TrendingCard
