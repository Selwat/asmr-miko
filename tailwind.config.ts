/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
     "./pages/**/*.{js,ts,jsx,tsx}",
     "./components/**/*.{js,ts,jsx,tsx}",
     "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
     extend: {
       animation: {
         gradient: "gradientMove 5s ease infinite",
       },
       keyframes: {
         gradientMove: {
           "0%, 100%": { backgroundPosition: "0% 50%" },
           "50%": { backgroundPosition: "100% 50%" },
         },
       },
     },
  },
  
  plugins: [],
  };