"use client"

import { useEffect, useRef } from "react"
import ApexCharts from "apexcharts"
import Head from "next/head"
import { motion } from "framer-motion"

export default function Page() {
const chartRef = useRef<HTMLDivElement>(null)

useEffect(() => {
   const chartOptions = {
     chart: {
       type: "area",
       height: 300,
       toolbar: { show: false },
       zoom: { enabled: false },
       background: "transparent",
     },
     colors: ["#28b85dff"],
     series: [{ name: "Views", data: [18, 50, 42, 94, 41, 65] }],
     dataLabels: { enabled: false },
     stroke: { width: 3, curve: "smooth" },
     fill: {
       type: "gradient",
       gradient: {
         shadeIntensity: 1,
         opacityFrom: 0.4,
         opacityTo: 0,
         stops: [0, 90, 100],
       },
     },
     xaxis: {
       categories: ["Feb", "Apr", "Jun", "Aug", "Oct", "Dec"],
       axisBorder: { show: false },
       labels: { style: { colors: "#28b85dff", 
        fontFamily: "Poppins" } },
     },
     yaxis: { show: false },
     grid: {
       borderColor: "transparent",
       padding: { top: -30, bottom: 0, left: 12, right: 12 },
     },
     legend: {
       labels: { fontFamily: "Poppins" },
     },

     tooltip: {
       enabled: true,
       theme: "light",
       style: {
         fontFamily: "Poppins",
         color: "#28b85dff",
         background: "#d1fae5",
       },
       onDatasetHover: {
         highlightDataSeries: true,
       },
       y: {
         formatter: (val: any) => `${val}K`,
       },
     },

     markers: {
       size: 5,
       colors: ["#28b85dff"],
       strokeColors: "#fff",
       strokeWidth: 2,
     },
   }

   if (chartRef.current) {
     const chart = new ApexCharts(chartRef.current, chartOptions)
     chart.render()
     return () => chart.destroy()
   }
}, [])

return (
   <>
     <Head>
       <link
         href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
         rel="stylesheet"
       />
     </Head>
     <main
       className="min-h-screen flex items-center justify-center 
       bg-green-400 p-4"
       style={{ fontFamily: "'Poppins', sans-serif" }}
     >
       <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md 
       w-full relative">
         <div className="flex justify-between items-center mb-4">
           <div>
             <h2 className="text-2xl font-semibold text-green-900">
               Channel Views
             </h2>
             <p className="text-sm text-green-600">By Month</p>
           </div>
           <div className="relative">
             <div className="bg-green-600 w-5 h-5 rounded-full 
             relative z-10" />
             <motion.div
               className="absolute top-0 left-0 w-5 h-5 rounded-full 
               border border-green-600 opacity-80"
               style={{ originX: 0.5, originY: 0.5 }}
               animate={{
                 scale: [0, 3],
                 opacity: [0.8, 0],
               }}
               transition={{
                 duration: 3,
                 repeat: Infinity,
                 ease: "linear",
               }}
             />
           </div>
         </div>

         <div ref={chartRef} />
       </div>
     </main>
   </>
)
}
