import React, { Component } from 'react'
import { LOCAL } from "../../Models/const";

export default class PlaneView extends Component {
    render() {
        return (
            <mesh
                receiveShadow={true}
                castShadow={false}
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, 0, 0]}
            >
                <planeBufferGeometry attach="geometry" args={[2000, 2000]} />
                <shadowMaterial attach="material" opacity={0.2} />

            </mesh>
        )
    }
}
