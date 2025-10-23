/* "use client"
import { motion } from "framer-motion"
import { ShoppingBag } from "lucide-react"

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 w-full bg-white/70 backdrop-blur-md 
      shadow-sm z-50"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 
      py-4 text-gray-800">
        <h1 className="text-xl font-bold text-pink-500">ShopMiko</h1>

        <div className="hidden sm:flex gap-8 text-sm font-medium">
          <a href="#" className="hover:text-pink-500 transition">
            New
          </a>
          <a href="#" className="hover:text-pink-500 transition">
            Women
          </a>
          <a href="#" className="hover:text-pink-500 transition">
            Men
          </a>
          <a href="#" className="hover:text-pink-500 transition">
            Accessories
          </a>
        </div>

        <button className="relative">
          <ShoppingBag className="w-6 h-6 text-gray-700 hover:text-pink-500 
          transition" />
          <span className="absolute -top-1 -right-1 bg-pink-500 text-white 
          text-xs rounded-full px-1">
            2
          </span>
        </button>
      </div>
    </motion.nav>
  )
}
 */

/* import type { Metadata } from "next"
import "./globals.css"
import Navbar from "./Navbar"

export const metadata: Metadata = {
  title: "Shopping App",
  description: "Shopping app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-pink-50 text-gray-800">
        <Navbar />
        <main className="pt-20">{children}</main>
      </body>
    </html>
  )
} */


"use client"
import { motion } from "framer-motion"
import Image from "next/image"

export default function Home() {
  const products = [
    { name: "Pastel Tote Bag", price: "$39", img: "/bag.jpg" },
    { name: "Soft Cotton Hoodie", price: "$59", img: "/hoodie.jpg" },
    { name: "Minimal Watch", price: "$129", img: "/watch.jpg" },
    { name: "Canvas Sneakers", price: "$79", img: "/sneakers.jpg" },
    { name: "Elegant Sunglasses", price: "$49", img: "/glasses.jpg" },
    { name: "Beige Beanie", price: "$25", img: "/beanie.jpg" },
  ]

  return (
    <div className="flex flex-col items-center px-6 min-h-screen">
      {/* HERO */}
      <section className="w-full max-w-7xl text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-pink-100 to-blue-100 rounded-3xl 
          shadow-md p-10 sm:p-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
            New Season, New Style 🌸
          </h1>
          <p className="mt-4 text-gray-600 text-lg">
            Discover our latest pastel collection and embrace minimal fashion.
          </p>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="mt-8 px-8 py-3 bg-pink-400 text-white font-semibold 
            rounded-full shadow-md hover:shadow-lg hover:scale-105 transition"
          >
            Shop Now
          </motion.button>
        </motion.div>
      </section>

      {/* PRODUCTS GRID */}
      <section className="max-w-7xl w-full mb-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Our Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl 
              transition cursor-pointer overflow-hidden"
              whileHover={{ scale: 1.03 }}
            >
              <Image
                src={product.img}
                alt={product.name}
                width={500}
                height={400}
                className="h-64 w-full object-cover"
              />
              <div className="p-4 flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {product.name}
                  </h3>
                  <p className="text-pink-500 font-medium">{product.price}</p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="px-3 py-2 bg-pink-400 text-white rounded-full 
                  text-sm font-semibold hover:bg-pink-500 transition"
                >
                  Add to Cart
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="w-full max-w-4xl mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-md p-10"
        >
          <h3 className="text-2xl font-bold mb-3 text-gray-900">
            Join Our Newsletter 💌
          </h3>
          <p className="text-gray-600 mb-6">
            Stay updated with new arrivals and special offers.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 justify-center">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-2 rounded-full border border-gray-200 
              focus:outline-none focus:border-pink-400 w-full sm:w-72"
            />
            <button className="px-6 py-2 bg-pink-400 text-white font-semibold 
            rounded-full hover:bg-pink-500 transition">
              Subscribe
            </button>
          </form>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="text-gray-500 text-sm text-center mb-6">
        © 2025 ASMR Miko · Crafted with 💖 using Next.js & TailwindCSS
      </footer>
    </div>
  )
}

