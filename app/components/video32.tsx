/* import CarScene from "./CarScene"

export default function Home() {
  return (
    <div className="h-screen w-screen bg-gradient-to-tr from-red-700 via-red-500 to-orange-400">
      <CarScene />
    </div>
  )
}
 */
;

"use client"

import React, { Suspense, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import {
  OrbitControls,
  useGLTF,
  useAnimations,
  ContactShadows,
} from "@react-three/drei"

function CarModel() {
  const { scene, animations } = useGLTF("/the-red-car.glb")
  const { actions } = useAnimations(animations, scene)

  useEffect(() => {
    if (actions?.idle) {
      actions.idle.reset().fadeIn(0.5).play()
    }
    return () => actions?.idle?.fadeOut(0.5)
  }, [actions])

  scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true
      child.receiveShadow = true
    }
  })

  return <primitive object={scene} scale={5} />
}

export default function CarScene() {
  return (
    <div style={{ height: "100vh" }}>
      <Canvas shadows camera={{ position: [-15, 7, -15], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        {/* ContactShadow - miękki cień bezpośrednio pod autem */}
        <ContactShadows
          position={[0, 0, 0]}
          rotation-x={Math.PI / 2}
          opacity={0.8} // mocniejszy cień
          width={10}
          height={10}
          blur={1} // mniej rozmyty
          far={10}
        />

        <Suspense fallback={null}>
          <CarModel />
        </Suspense>

        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      </Canvas>
    </div>
  )
}
