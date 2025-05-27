import React from "react"
import { GithubIcon, LinkedinIcon, FacebookIcon } from "lucide-react"

export default function Home() {
  return (
    <main
      className="min-h-screen w-full bg-neutral-950 text-white font-body 
      bg-cover max-sm:bg-center xl:bg-contain xl:bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/hero.png')" }}
    >
      <div className="bg-black/50 min-h-screen w-full">
        <header className="w-full bg-black/70 px-6 py-4 flex justify-between 
        fixed items-center border-b border-neutral-800">
          <h1 className="text-2xl font-heading cursor-pointer tracking-widest 
          text-amber-400 drop-shadow-md transition-transform hover:scale-105 
          duration-300">
            PORTFOLIO
          </h1>
          <nav className="hidden md:flex space-x-6 text-sm uppercase">
            <a href="#about" className="hover:text-amber-400 transition-colors">
              About
            </a>
            <a
              href="#projects"
              className="hover:text-amber-400 transition-colors"
            >
              Projects
            </a>
            <a
              href="#contact"
              className="hover:text-amber-400 transition-colors"
            >
              Contact
            </a>
          </nav>
          <div className="md:hidden">
            <button className="text-white">☰</button>
          </div>
        </header>

        <section className="h-[60vh] w-full flex items-center justify-center">
          <div className="text-center p-4">
            <h2 className="text-4xl sm:text-6xl font-bold leading-tight">
              Hi, I'm <span className="text-amber-400">ASMR Miko</span>
            </h2>
            <p className="text-lg sm:text-2xl mt-4 text-neutral-300">
              I'm a Frontend Developer
            </p>
            <a
              href="#projects"
              className="inline-block mt-6 px-6 py-3 border border-white 
              rounded-full hover:bg-white hover:text-black transition-all"
            >
              View My Work
            </a>
          </div>
        </section>

        <section
          id="about"
          className="max-w-3xl mx-auto py-20 px-6 text-center"
        >
          <h3 className="text-3xl font-semibold mb-4">About</h3>
          <p className="text-neutral-400 text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="flex justify-center space-x-6 mt-6">
            <a href="#">
              <GithubIcon />
            </a>
            <a href="#">
              <LinkedinIcon />
            </a>
            <a href="#">
              <FacebookIcon />
            </a>
          </div>
        </section>

        <footer className="text-center py-2 text-neutral-500 text-sm">
          © 2025 ASMR Miko. All rights reserved.
        </footer>
      </div>
    </main>
  )
}
