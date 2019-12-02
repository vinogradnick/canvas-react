import React, { Component } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'
import * as THREE from 'three';
function Thing() {
    const ref = React.useRef(null);

    useFrame(() => (ref.current.rotation.x = ref.current.rotation.y += 0.01))

    return (
        <mesh
            visible
            ref={ref}



        >
            <meshBasicMaterial attach="material" color={'0x0000ff'} />
            <boxGeometry attach="geometry" args={[1, 1, 1]} />
        </mesh >

    )
}

export default class WebGlContainer extends Component {

    render() {
        const camera = (x: number, y: number, z: number) => new THREE.Vector3(0, 0, 0);
        return (
            <Canvas>
                <Thing />
            </Canvas>
        )
    }
}
