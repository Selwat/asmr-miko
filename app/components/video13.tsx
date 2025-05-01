'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Page() {
  const [darkMode, setDarkMode] = useState(false)

  const handleToggle = () => setDarkMode(prev => !prev)

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-colors duration-500 ${
        darkMode ? 'bg-gray-900' : 'bg-gray-100'
      }`}
    >
      <div
        onClick={handleToggle}
        className="relative w-60 h-28 rounded-full cursor-pointer shadow-lg overflow-hidden"
      >
        <AnimatePresence>
          <motion.div
            key={darkMode ? 'night' : 'day'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 bg-center bg-cover"
            style={{
              backgroundImage: `url(${darkMode ? '/image2.png' : '/image3.jpg'})`,
            }}
          />
        </AnimatePresence>

        <motion.div
          className="absolute top-2 left-1 w-24 h-24 bg-white rounded-full shadow-md"
          animate={{ x: darkMode ? 136 : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </div>
    </div>
  )
}