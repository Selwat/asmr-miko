"use client"
import { useEffect, useRef, useState } from "react"
import { FaBackward, FaForward, FaPlay, FaPause } from "react-icons/fa"

type Song = {
  name: string
  artist: string
  src: string
  cover: string
}

const songsList: Song[] = [
  {
    name: "Jazz In Paris",
    artist: "Media Right Productions",
    src: "/1.mp3",
    cover: "/1.jpg",
  },
  {
    name: "Blue Skies",
    artist: "Silent Partner",
    src: "/2.mp3",
    cover: "/2.jpg",
  },
  {
    name: "Crimson Fly",
    artist: "Huma-Huma",
    src: "/3.mp3",
    cover: "/3.jpg",
  },
]

export default function Page() {
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [time, setTime] = useState("0:00 - 0:00")

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const current = songsList[index]

  useEffect(() => {
    const song = audioRef.current
    if (!song) return

    const update = () => {
      if (!song.duration) return
      setProgress((song.currentTime / song.duration) * 100)

      const format = (s: number) =>
        `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`

      setTime(`${format(song.currentTime)} - ${format(song.duration)}`)
    }

    song.addEventListener("timeupdate", update)
    song.addEventListener("ended", next)

    return () => {
      song.removeEventListener("timeupdate", update)
      song.removeEventListener("ended", next)
    }
  }, [index])

  const playSong = () => {
    audioRef.current?.play()
    setPlaying(true)
  }

  const togglePlay = () => {
    if (!audioRef.current) return
    playing ? audioRef.current.pause() : audioRef.current.play()
    setPlaying(!playing)
  }

  const next = () => {
    setIndex((i) => (i + 1) % songsList.length)
    setTimeout(playSong, 50)
  }

  const prev = () => {
    setIndex((i) => (i - 1 + songsList.length) % songsList.length)
    setTimeout(playSong, 50)
  }

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return
    const rect = e.currentTarget.getBoundingClientRect()
    const pos =
      ((e.clientX - rect.left) / rect.width) * audioRef.current.duration
    audioRef.current.currentTime = pos
  }

  return (
    <div className="flex items-center justify-center 
    min-h-screen bg-gray-300">
      <div className="bg-neutral-900 text-white 
      rounded-2xl shadow-2xl p-6 w-[500px] flex 
      flex-col gap-6">
        {/* 🎶 Górny panel z coverem i info */}
        <div className="flex gap-4">
          {/* Cover */}
          <div
            className={`w-28 h-28 rounded-full border-4 
              border-white shadow-lg bg-cover bg-center 
              transition-all 
              ${playing ? "animate-spin-slow" : ""
            }`}
            style={{ backgroundImage: `url(${current.cover})` }}
          >
            <div className="w-6 h-6 bg-white rounded-full m-auto mt-[40%]" />
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center flex-1">
            <div className="font-bold text-lg">{current.artist}</div>
            <div className="text-gray-400 text-sm mb-3">{current.name}</div>

            <div
              className="w-full h-2 bg-gray-600 rounded-full cursor-pointer"
              onClick={seek}
            >
              <div
                className="h-2 bg-green-500 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="text-gray-400 text-sm mt-2">{time}</div>
          </div>
        </div>

        {/* 🎛️ Kontrolki */}
        <div className="flex items-center justify-center gap-6">
          <FaBackward
            onClick={prev}
            className="text-gray-400 hover:text-white text-3xl 
            cursor-pointer"
          />
          <div
            onClick={togglePlay}
            className="bg-green-600 hover:bg-green-700 rounded-full 
            p-3 cursor-pointer flex items-center justify-center"
          >
            {playing ? (
              <FaPause className="text-white text-xl" />
            ) : (
              <FaPlay className="text-white text-xl" />
            )}
          </div>

          <FaForward
            onClick={next}
            className="text-gray-400 hover:text-white text-3xl 
            cursor-pointer"
          />
        </div>

        {/* 🔊 Audio */}
        <audio ref={audioRef} src={current.src} />
      </div>
    </div>
  )
}
