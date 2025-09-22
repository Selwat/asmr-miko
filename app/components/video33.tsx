"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
const [history, setHistory] = useState([Array(9).fill(null)]);
const [stepNumber, setStepNumber] = useState(0);
const [xIsNext, setXIsNext] = useState(true);

const currentSquares = history[stepNumber];

function handleClick(i: number) {
   const historyCopy = history.slice(0, stepNumber + 1);
   const current = historyCopy[historyCopy.length - 1];
   const squares = current.slice();
   if (calculateWinner(squares) || squares[i]) return;

   squares[i] = xIsNext ? "X" : "O";
   setHistory(historyCopy.concat([squares]));
   setStepNumber(historyCopy.length);
   setXIsNext(!xIsNext);
}

function jumpTo(step: number) {
   setStepNumber(step);
   setXIsNext(step % 2 === 0);
}

function resetGame() {
   setHistory([Array(9).fill(null)]);
   setStepNumber(0);
   setXIsNext(true);
}

const winner = calculateWinner(currentSquares);
let status;
if (winner) {
   status = "Winner: " + winner;
} else if (!currentSquares.includes(null)) {
   status = "It's a draw!";
} else {
   status = "Next player: " + (xIsNext ? "X" : "O");
}

return (
   <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-lime-500 via-green-400 to-green-500 p-6">
     <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-6xl">
       {/* Board */}
       <motion.div
         initial={{ opacity: 0, y: 30 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.5 }}
         className="flex flex-col items-center justify-between backdrop-blur-lg bg-white/20 p-8 rounded-3xl shadow-2xl border border-white/30 h-[630px]"
       >
         <div className="flex flex-col items-center">
           <h1 className="text-4xl font-extrabold mb-6 text-white drop-shadow-lg tracking-wide">
             Tic-Tac-Toe
           </h1>
           <div className="grid grid-cols-3 gap-4">
             {currentSquares.map((square, i) => (
               <motion.button
                 key={i}
                 onClick={() => handleClick(i)}
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 className="w-24 h-24 text-3xl font-bold flex items-center justify-center rounded-2xl shadow-lg bg-white/30 border border-white/40 backdrop-blur-sm text-gray-800 hover:bg-white/40 transition"
               >
                 <AnimatePresence>
                   {square && (
                     <motion.span
                       key={square + i}
                       initial={{ scale: 0, opacity: 0 }}
                       animate={{ scale: 1, opacity: 1 }}
                       exit={{ scale: 0, opacity: 0 }}
                       transition={{ duration: 0.3 }}
                       className="drop-shadow-md"
                     >
                       {square}
                     </motion.span>
                   )}
                 </AnimatePresence>
               </motion.button>
             ))}
           </div>
         </div>

         <div className="flex flex-col items-center">
           <motion.p
             className="mt-6 text-2xl font-semibold text-white drop-shadow-lg"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             key={status}
           >
             {status}
           </motion.p>

           {(winner || !currentSquares.includes(null)) && (
             <motion.button
               onClick={resetGame}
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               className="mt-6 px-8 py-3 rounded-full bg-gradient-to-r from-emerald-400 to-green-600 text-white font-bold shadow-lg hover:shadow-xl transition"
             >
               Play Again
             </motion.button>
           )}

           <motion.button
             onClick={resetGame}
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             className="mt-3 px-8 py-3 rounded-full bg-gradient-to-r from-red-400 to-pink-500 text-white font-bold shadow-lg hover:shadow-xl transition"
           >
             Reset Game
           </motion.button>
         </div>
       </motion.div>

       {/* Move History */}
       <motion.div
         initial={{ opacity: 0, y: 30 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.5, delay: 0.2 }}
         className="backdrop-blur-lg bg-white/20 p-6 rounded-3xl shadow-2xl border border-white/30 w-full h-[630px] flex flex-col"
       >
         <h2 className="text-2xl font-bold mb-4 text-white drop-shadow-lg">
           Move History
         </h2>
         <ul className="space-y-3 flex-1 overflow-y-auto pr-1">
           <AnimatePresence>
             {history.map((_, move) => {
               const desc = move ? `Go to move #${move}` : "Go to game start";
               return (
                 <motion.li
                   key={move}
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -10 }}
                   transition={{ duration: 0.3 }}
                 >
                   <button
                     onClick={() => jumpTo(move)}
                     className={`w-full text-left px-4 py-2 rounded-xl border transition font-medium backdrop-blur-sm ${
                       move === stepNumber
                         ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-emerald-700 shadow-lg"
                         : "bg-white/30 hover:bg-white/40 border-white/40 text-gray-800"
                     }`}
                   >
                     {desc}
                   </button>
                 </motion.li>
               );
             })}
           </AnimatePresence>
         </ul>
       </motion.div>
     </div>
   </main>
);
}

function calculateWinner(squares: string[]) {
const lines = [
   [0, 1, 2],
   [3, 4, 5],
   [6, 7, 8],
   [0, 3, 6],
   [1, 4, 7],
   [2, 5, 8],
   [0, 4, 8],
   [2, 4, 6],
];
for (let i = 0; i < lines.length; i++) {
   const [a, b, c] = lines[i];
   if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
     return squares[a];
   }
}
return null;
}