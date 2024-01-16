'use client'

import React, { useState } from 'react'
import { Canvas as ThreeCanvas } from '@react-three/fiber'
import * as THREE from 'three'
import { WireframeBall } from '../3DModels'
import './Canvas.scss'

export default function Canvas() {
	const [cameraPosition, setCameraPosition] = useState<THREE.Vector3>(
		new THREE.Vector3(-3, 0, 30),
	)

	function moveCamera(event: React.WheelEvent<HTMLDivElement>) {
		event.preventDefault()
		const t = document.body.getBoundingClientRect().top
		const x = t * -0.0002
		const y = x
		const z = t * -0.1
		setCameraPosition(new THREE.Vector3(x, y, z))
	}

	const stars = (
		<group>
			{Array(56)
				.fill('')
				.map((_, id) => {
					const [x, y, z] = Array(3)
						.fill('')
						.map(() => THREE.MathUtils.randFloatSpread(40))
					return (
						<group key={`${x}-${y}-${z}`} position={[x, y, z]} dispose={null}>
							<WireframeBall />
						</group>
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
				<fog attach="fog" args={['rgba(0, 0, 0, 0.1)', 20, 70]} />
				<directionalLight color="yellow" intensity={1} position={[50, -2, 0]} />
				<directionalLight
					color="rgb(16, 192, 223)"
					intensity={1.2}
					position={[-3, 0, 5]}
				/>
				<directionalLight
					color="purple"
					intensity={1}
					position={[-10, -10, 0]}
				/>
				<ambientLight color="rgb(16, 192, 223)" intensity={0.5} />
				{stars}
			</ThreeCanvas>
		</div>
	)
}
