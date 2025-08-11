"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

type CoinInfo = {
  usd: number
  usd_24h_change: number
}

type Coins = {
  [key: string]: CoinInfo
}

const COINS = [
  "bitcoin",
  "tether",
  "ethereum",
  "litecoin",
  "cardano",
  "dogecoin",
]

export default function Page() {
  const [data, setData] = useState<Coins>({})

  useEffect(() => {
    fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${COINS.join(
        "%2C"
      )}&vs_currencies=usd&include_24hr_change=true`
    )
      .then((res) => res.json())
      .then((json) => setData(json))
  }, [])

  return (
    <main className="min-h-screen bg-[#0e0e0e] text-white px-4 
    py-10">
      <h1 className="text-3xl font-bold text-center mb-12">
        CryptoWhispers by Miko
      </h1>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
      gap-8 max-w-6xl mx-auto"
      >
        {Object.entries(data).map(([coin, info], index) => {
          const rising = info.usd_24h_change >= 0
          const change = info.usd_24h_change.toFixed(2)

          return (
            <motion.div
              key={coin}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.1,
                type: "spring",
                stiffness: 300,
              }}
              className={`rounded-xl p-5 shadow-lg bg-[#1a1a1a] 
                border-l-4 cursor-pointer transform 
                transition-transform ${rising ? "border-green-500" 
                : "border-red-500"}`}
            >
              <div className="flex items-center gap-4">
                <Image
                  src={`/${coin}.png`}
                  alt={`${coin} logo`}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <h2 className="text-xl font-semibold capitalize">
                    {coin}
                  </h2>
                  <p className="text-sm text-gray-400">USD</p>
                </div>
              </div>

              <div className="mt-4 flex items-center 
              justify-between">
                <p className="text-2xl font-bold">
                  ${info.usd.toLocaleString()}
                </p>
                <span
                  className={`px-3 py-1 text-sm rounded-full 
                    font-medium ${
                      rising
                        ? "bg-green-600/20 text-green-400"
                        : "bg-red-600/20 text-red-400"
                    }`}
                >
                  {rising ? "+" : ""}
                  {change}%
                </span>
              </div>
            </motion.div>
          )
        })}
      </div>
    </main>
  )
}
