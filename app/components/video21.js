'use client'
import { useEffect, useRef, useState } from 'react';

const COLS = 10;
const ROWS = 20;

const TETROMINOES = {
I: [[1, 1, 1, 1]],
O: [[1, 1], [1, 1]],
T: [[0, 1, 0], [1, 1, 1]],
S: [[0, 1, 1], [1, 1, 0]],
Z: [[1, 1, 0], [0, 1, 1]],
J: [[1, 0, 0], [1, 1, 1]],
L: [[0, 0, 1], [1, 1, 1]],
};

const COLORS = {
I: 'bg-cyan-400',
O: 'bg-yellow-300',
T: 'bg-purple-500',
S: 'bg-green-400',
Z: 'bg-red-500',
J: 'bg-blue-500',
L: 'bg-orange-400',
};

const createGrid = () =>
Array.from({ length: ROWS }, () =>
   Array.from({ length: COLS }, () => ({ filled: false, type: null }))
);

const getRandomPiece = () => {
const keys = Object.keys(TETROMINOES);
const type = keys[Math.floor(Math.random() * keys.length)];
return { shape: TETROMINOES[type], type };
};

const Tetris = () => {
const [grid, setGrid] = useState(createGrid());
const [current, setCurrent] = useState(null);
const [intervalMs, setIntervalMs] = useState(500);
const gameInterval = useRef(null);

const mergePiece = (grid, shape, pos, type) => {
   const newGrid = grid.map(row => row.map(cell => ({ ...cell })));
   shape.forEach((row, y) => {
     row.forEach((val, x) => {
       if (val && pos[1] + y >= 0) {
         newGrid[pos[1] + y][pos[0] + x] = { filled: true, type };
       }
     });
   });
   return newGrid;
};

const canMove = (shape, pos) => {
   return shape.every((row, y) =>
     row.every((val, x) => {
       if (!val) return true;
       const newY = pos[1] + y;
       const newX = pos[0] + x;
       return (
         newX >= 0 &&
         newX < COLS &&
         newY < ROWS &&
         (newY < 0 || !grid[newY][newX].filled)
       );
     })
   );
};

const rotate = (shape) => shape[0].map((_, i) => shape.map(row => row[i]).reverse());

const drop = () => {
   if (!current) return;
   const [x, y] = current.pos;
   const newY = y + 1;
   if (canMove(current.shape, [x, newY])) {
     setCurrent({ ...current, pos: [x, newY] });
   } else {
     const merged = mergePiece(grid, current.shape, current.pos, current.type);
     clearLines(merged);
     spawnNew();
   }
};

const clearLines = (g) => {
   const newGrid = g.filter(row => row.some(cell => !cell.filled));
   const clearedLines = ROWS - newGrid.length;
   const emptyRows = Array.from({ length: clearedLines }, () =>
     Array.from({ length: COLS }, () => ({ filled: false, type: null }))
   );
   setGrid([...emptyRows, ...newGrid]);
};

const spawnNew = () => {
   const piece = getRandomPiece();
   const pos = [Math.floor(COLS / 2 - piece.shape[0].length / 2), -1];
   if (!canMove(piece.shape, pos)) {
     setGrid(createGrid());
     setCurrent(null);
     return;
   }
   setCurrent({ shape: piece.shape, pos, type: piece.type });
};

const move = (dx) => {
   if (!current) return;
   const [x, y] = current.pos;
   const newX = x + dx;
   if (canMove(current.shape, [newX, y])) {
     setCurrent({ ...current, pos: [newX, y] });
   }
};

const rotatePiece = () => {
   if (!current) return;
   const newShape = rotate(current.shape);
   if (canMove(newShape, current.pos)) {
     setCurrent({ ...current, shape: newShape });
   }
};

useEffect(() => {
   const keyHandler = (e) => {
     if (!current) return;
     if (e.key === 'ArrowLeft') move(-1);
     if (e.key === 'ArrowRight') move(1);
     if (e.key === 'ArrowDown') drop();
     if (e.key === 'ArrowUp') rotatePiece();
   };
   window.addEventListener('keydown', keyHandler);
   return () => window.removeEventListener('keydown', keyHandler);
}, [current]);

useEffect(() => {
   if (!current) spawnNew();
}, [current]);

useEffect(() => {
   gameInterval.current = setInterval(() => drop(), intervalMs);
   return () => gameInterval.current && clearInterval(gameInterval.current);
}, [current]);

return (
   <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
     <h1 className="text-3xl font-bold mb-6 text-blue-400">Tetris Game</h1>
     <div className="grid bg-gray-900 border-4 border-gray-700" style={{ gridTemplateColumns: `repeat(${COLS}, 32px)` }}>
       {grid.map((row, y) =>
         row.map((cell, x) => {
           let className = 'w-8 h-8 border border-gray-800 ';
           if (cell.filled && cell.type) className += `${COLORS[cell.type]}`;
           if (
             current?.shape.some((r, dy) =>
               r.some((val, dx) =>
                 val && current.pos[0] + dx === x && current.pos[1] + dy === y
               )
             )
           ) {
             className +=  `${COLORS[current.type]}`;
           }
           return <div key={`${x}-${y}`} className={className}></div>;
         })
       )}
     </div>
   </div>
);
};

export default Tetris;