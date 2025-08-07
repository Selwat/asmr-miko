"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export default function Home() {
  const [tasks, setTasks] = useState<
    { id: number; text: string; done: boolean }[]
  >([])
  const [input, setInput] = useState("")

  const addTask = () => {
    if (input.trim() === "") return
    setTasks([...tasks, { id: Date.now(), text: input.trim(), 
      done: false }])
    setInput("")
  }

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    )
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }
//Clean the kitchen
//Reply to emails
//Go for a walk
//Call Mom
  return (
    <main className="min-h-screen flex items-center justify-center 
    bg-green-50 text-slate-800">
      <motion.div
        className="w-full max-w-xl bg-white shadow-xl rounded-2xl 
        p-6 mx-4"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h1 className="text-3xl font-bold mb-6 text-center 
        tracking-tight text-green-800">
          To-Do List ✅
        </h1>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
            placeholder="Add a new task..."
            className="flex-1 p-3 rounded-lg border 
            border-green-200 bg-green-100 focus:outline-none 
            focus:ring-2 focus:ring-green-300 
            placeholder:text-green-800 text-slate-800 
            transition-all duration-300"
          />
          <button
            onClick={addTask}
            className="bg-green-300 hover:bg-green-400 text-white 
            font-semibold px-4 rounded-lg transition"
          >
            Add
          </button>
        </div>

        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between 
              bg-green-50 p-3 rounded-lg border border-green-200"
            >
              <div
                onClick={() => toggleTask(task.id)}
                className={`flex-1 cursor-pointer ${
                  task.done ? "line-through text-gray-400" : 
                  "text-slate-800"
                }`}
              >
                {task.text}
              </div>
              <button
                onClick={() => deleteTask(task.id)}
                className="ml-4 text-red-500 hover:text-red-600 
                font-bold text-sm"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </motion.div>
    </main>
  )
}
