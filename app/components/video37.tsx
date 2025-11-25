/* "use client"
import { motion } from "framer-motion"
import Link from "next/link"

export default function Navbar() {
return (
   <motion.nav
     initial={{ y: -20, opacity: 0 }}
     animate={{ y: 0, opacity: 1 }}
     transition={{ duration: 0.45 }}
     className="fixed w-full top-0 left-0 z-50 bg-white/60 backdrop-blur-md 
     shadow-sm"
   >
     <div className="max-w-7xl mx-auto flex items-center justify-between px-6 
     py-3">
       <Link href="/" className="flex items-center gap-3">
         <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-200 
         to-blue-300 flex items-center justify-center text-white font-bold">
           TE
         </div>
         <span className="font-semibold text-gray-800">TravelExplorer</span>
       </Link>

       <div className="hidden md:flex items-center gap-6 text-gray-700">
         <Link href="#explore" className="hover:text-gray-900 transition">
           Explore
         </Link>
         <Link href="#inspiration" className="hover:text-gray-900 transition">
           Inspiration
         </Link>
         <Link href="#newsletter" className="hover:text-gray-900 transition">
           Subscribe
         </Link>
         <button className="ml-2 px-4 py-2 rounded-full bg-gradient-to-r 
         from-emerald-200 to-blue-300 text-white text-sm shadow-sm 
         hover:scale-105 
         transition">
           Sign in
         </button>
       </div>

       <div className="md:hidden">
         <button className="px-3 py-2 rounded-md border border-gray-200">
           Menu
         </button>
       </div>
     </div>
   </motion.nav>
)
} */

/* import type { Metadata } from "next"
import "./globals.css"
import Navbar from "./Navbar"

export const metadata: Metadata = {
  title: "Travel Explorer",
  description:
    "Pastel travel UI built with Next.js, TailwindCSS & Framer Motion",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-800 antialiased">
        <Navbar />
        <main className="pt-20">{children}</main>
      </body>
    </html>
  )
}
 */


/* "use client"
import { motion } from "framer-motion"
import Image from "next/image"

type Props = {
title: string
location: string
img: string
short: string
}

export default function DestinationCard({
title,
location,
img,
short,
}: Props) {
return (
   <motion.article
     whileHover={{ scale: 1.03 }}
     initial={{ opacity: 0, y: 18 }}
     whileInView={{ opacity: 1, y: 0 }}
     transition={{ duration: 0.45 }}
     className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg 
     cursor-pointer"
   >
     <div className="relative h-56 w-full">
       <Image
         src={img}
         alt={title}
         fill
         className="object-cover"
         unoptimized
       />

       <div className="absolute inset-0 bg-gradient-to-t from-black/35 
       to-transparent" />
       <div className="absolute left-4 bottom-4">
         <h3 className="text-white font-semibold text-lg">{title}</h3>
         <p className="text-white text-sm opacity-90">{location}</p>
       </div>
     </div>

     <div className="p-4">
       <p className="text-sm text-gray-600">{short}</p>
       <div className="mt-4 flex items-center justify-between">
         <div className="text-xs text-gray-500">
           Starts from <span className="font-semibold text-gray-800">$99</span>
         </div>
         <button className="px-3 py-1 bg-gradient-to-r from-emerald-200 
         to-blue-300 text-white rounded-full text-sm">
           View
         </button>
       </div>
     </div>
   </motion.article>
)
} */


"use client"
import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import DestinationCard from "./DestinationCard"

const DATA = [
{
   title: "Bali Beach",
   location: "Indonesia",
   img: "/bali.png",
   short: "White sand, pastel sunsets and relaxed island vibes.",
},
{
   title: "Swiss Alps",
   location: "Switzerland",
   img: "/swiss-alps.png",
   short: "Majestic peaks, alpine trails and breathtaking panoramas.",
},
{
   title: "Kyoto Gardens",
   location: "Japan",
   img: "/kyoto.png",
   short: "Serene temples, cherry blossoms and traditional streets.",
},
{
   title: "Santorini",
   location: "Greece",
   img: "/santorini.png",
   short: "Iconic white architecture, blue domes and cliffside views.",
},
{
   title: "Marrakesh",
   location: "Morocco",
   img: "/marrakesh.png",
   short: "Colorful souks, spicy aromas and desert excursions.",
},
{
   title: "Grand Canyon",
   location: "USA",
   img: "/canyon.png",
   short: "Epic canyons, scenic overlooks and adventurous hikes.",
},
]

export default function Home() {
const [query, setQuery] = useState("")
const results = useMemo(() => {
   const q = query.trim().toLowerCase()
   if (!q) return DATA
   return DATA.filter(
     (d) =>
       d.title.toLowerCase().includes(q) ||
       d.location.toLowerCase().includes(q)
   )
}, [query])

return (
   <div className="max-w-7xl mx-auto px-6">
     {/* HERO */}
     <section className="mt-8 mb-12">
       <motion.div
         initial={{ opacity: 0, y: -12 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.5 }}
         className="rounded-3xl bg-gradient-to-r from-cyan-100 to-purple-100 
         p-10 shadow-md"
       >
         <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900">
           Explore the world in pastel tones 🌤️
         </h1>
         <p className="mt-3 text-lg text-slate-600 max-w-2xl">
           Browse curated destinations with calm UI and smooth animations. Use
           the search to quickly find a place.
         </p>

         <div className="mt-6 flex items-center gap-4 max-w-md">
           <input
             value={query}
             onChange={(e) => setQuery(e.target.value)}
             placeholder="Search destinations or country (e.g. Bali, Japan)"
             className="w-full px-4 py-3 rounded-xl border border-gray-200 
             focus:outline-none focus:ring-2 focus:ring-emerald-200 bg-white"
           />
           <motion.button
             whileTap={{ scale: 0.95 }}
             className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-200 
             to-blue-300 text-white font-semibold"
           >
             Search
           </motion.button>
         </div>
       </motion.div>
     </section>

     {/* DESTINATIONS GRID */}
     <section id="explore" className="mb-14">
       <h2 className="text-2xl font-semibold mb-6">Popular Destinations</h2>
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
         {results.map((d) => (
           <DestinationCard
             key={d.title}
             title={d.title}
             location={d.location}
             img={d.img}
             short={d.short}
           />
         ))}
       </div>

       {results.length === 0 && (
         <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           className="mt-8 text-center text-gray-500"
         >
           No destinations found.
         </motion.div>
       )}
     </section>

     {/* INSPIRATION */}
     <section id="inspiration" className="mb-14">
       <h2 className="text-2xl font-semibold mb-6">Inspiration</h2>
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <motion.div
           whileHover={{ scale: 1.02 }}
           className="rounded-2xl overflow-hidden shadow-sm bg-white"
         >
           <div className="relative h-48">
             <img
               src="/inspo1.png"
               alt="inspo"
               className="w-full h-full object-cover"
             />
           </div>
           <div className="p-4">
             <h3 className="font-semibold">Morning Rituals</h3>
             <p className="text-sm text-gray-600 mt-1">
               Best sunrise spots to start your day right.
             </p>
           </div>
         </motion.div>

         <motion.div
           whileHover={{ scale: 1.02 }}
           className="rounded-2xl overflow-hidden shadow-sm bg-white"
         >
           <div className="relative h-48">
             <img
               src="/inspo2.png"
               alt="inspo"
               className="w-full h-full object-cover"
             />
           </div>
           <div className="p-4">
             <h3 className="font-semibold">Hidden Cafés</h3>
             <p className="text-sm text-gray-600 mt-1">
               Cozy cafes with the most charming vibes.
             </p>
           </div>
         </motion.div>

         <motion.div
           whileHover={{ scale: 1.02 }}
           className="rounded-2xl overflow-hidden shadow-sm bg-white"
         >
           <div className="relative h-48">
             <img
               src="/inspo3.png"
               alt="inspo"
               className="w-full h-full object-cover"
             />
           </div>
           <div className="p-4">
             <h3 className="font-semibold">Local Markets</h3>
             <p className="text-sm text-gray-600 mt-1">
               Colorful markets full of life and flavors.
             </p>
           </div>
         </motion.div>
       </div>
     </section>

     {/* NEWSLETTER */}
     <section id="newsletter" className="mb-16">
       <motion.div
         initial={{ opacity: 0, y: 8 }}
         whileInView={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.5 }}
         className="rounded-2xl bg-white p-8 shadow-md"
       >
         <div className="flex flex-col sm:flex-row items-center justify-between 
         gap-4">
           <div>
             <h3 className="text-xl font-semibold">
               Get travel tips & inspiration
             </h3>
             <p className="text-sm text-gray-600">
               Subscribe to our newsletter for curated destinations.
             </p>
           </div>

           <form className="flex gap-3">
             <input
               type="email"
               placeholder="Your email"
               className="px-4 py-2 rounded-full border border-gray-200 
               focus:outline-none"
             />
             <button className="px-4 py-2 rounded-full bg-gradient-to-r 
             from-emerald-200 to-blue-300 text-white">
               Subscribe
             </button>
           </form>
         </div>
       </motion.div>
     </section>

     <footer className="text-center text-sm text-gray-500 mb-12">
       © 2025
     </footer>
   </div>
)
}