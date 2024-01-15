/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
	nodes: {
		rubber_duck_toy: THREE.Mesh
	}
	materials: {
		rubber_duck_toy: THREE.MeshPhysicalMaterial
	}
}

export function RubberDuck() {
	const { nodes, materials } = useGLTF(
		'/models/rubber-duck/rubber_duck_toy_4k.glb',
	) as GLTFResult
	materials.rubber_duck_toy.metalness = 0.1
	materials.rubber_duck_toy.roughness = 0.7
	return (
		<mesh
			scale={10}
			receiveShadow
			geometry={nodes.rubber_duck_toy.geometry}
			material={materials.rubber_duck_toy}
		/>
	)
}

useGLTF.preload('/rubber_duck_toy_4k.glb')
