"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const buttons = [
  ["7", "8", "9", "/"],
  ["4", "5", "6", "*"],
  ["1", "2", "3", "-"],
  ["0", ".", "=", "+"],
  ["AC"]
];

export default function Calculator() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");

  const handleClick = (value: string) => {
    if (value === "AC") {
      setExpression("");
      setResult("");
    } else if (value === "=") {
      try {
        const evalResult = eval(expression);
        setResult(evalResult.toString());
      } catch {
        setResult("Error");
      }
    } else {
      setExpression((prev) => prev + value);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br 
    from-[#d2f8d2] to-[#b2fab4] flex items-center 
    justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white/60 
        backdrop-blur-lg rounded-[2.5rem] 
        shadow-[0_10px_40px_rgba(0,0,0,0.1)] p-8 
        border border-[#a8e6a1] relative overflow-hidden"
      >
        <div className="text-right text-5xl font-mono 
        text-[#1b5e20] min-h-[3.5rem] mb-3">
          {expression || "0"}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-right text-3xl font-bold 
          text-[#2e7d32] h-10 mb-6"
        >
          {result}
        </motion.div>

        <div className="grid grid-cols-4 gap-4">
          {buttons.flat().map((btn) => (
            <motion.button
              whileTap={{ scale: 0.92 }}
              key={btn}
              onClick={() => handleClick(btn)}
              className="bg-gradient-to-br from-[#e0f2f1] 
              to-[#c8e6c9] rounded-xl shadow-lg text-2xl 
              font-semibold text-[#1b5e20] py-5 
              hover:from-[#c8e6c9] hover:to-[#a5d6a7] 
              transition-all"
            >
              {btn}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </main>
  );
}