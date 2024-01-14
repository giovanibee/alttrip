'use client'

import React, { useState } from 'react'
import { Canvas as ThreeCanvas } from '@react-three/fiber'
import './Canvas.scss'
import * as THREE from 'three'

// function Box(props: any) {
//   // This reference will give us direct access to the mesh
//   const meshRef = useRef()
//   // Set up state for the hovered and active state
//   const [hovered, setHover] = useState(false)
//   const [active, setActive] = useState(false)
//   // Subscribe this component to the render-loop, rotate the mesh every frame
//   useFrame((state, delta) => (meshRef?.current?.rotation?.x += delta))
//   // Return view, these are regular three.js elements expressed in JSX
//   return (
//     <mesh
//       {...props}
//       ref={meshRef}
//       scale={active ? 1.5 : 1}
//       onClick={(event) => setActive(!active)}
//       onPointerOver={(event) => setHover(true)}
//       onPointerOut={(event) => setHover(false)}>
//       <boxGeometry args={[1, 1, 1]} />
//       <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
//     </mesh>
//   )
// }

export default function Canvas() {
	const [cameraPosition, setCameraPosition] = useState<THREE.Vector3>(
		new THREE.Vector3(-3, 0, 30),
	)

	function moveCamera() {
		const t = document.body.getBoundingClientRect().top
		const x = t * -0.0002
		const y = x
		const z = t * -0.1
		setCameraPosition(new THREE.Vector3(x, y, z))
	}

	const stars = (
		<group>
			{Array(200)
				.fill('')
				.map(() => {
					const [x, y, z] = Array(3)
						.fill('')
						.map(() => THREE.MathUtils.randFloatSpread(100))
					return (
						<mesh position={[x, y, z]}>
							<sphereGeometry />
							<meshNormalMaterial />
						</mesh>
					)
				})}
		</group>
	)

	return (
		<div id="homepage-canvas">
			<ThreeCanvas
				camera={{ position: cameraPosition, fov: 28 }}
				onWheel={moveCamera}
			>
				{stars}
				<ambientLight intensity={0.6} />
				{/* <mesh position={[0, 0, 0]}>
          <sphereGeometry />
          <meshNormalMaterial />
        </mesh> */}
			</ThreeCanvas>
		</div>
	)
}
