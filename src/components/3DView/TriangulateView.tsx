import React, { Component } from 'react'
import * as THREE from 'three';

export default class TriangulateView extends Component {
    render() {
        return (
            <mesh

            >
                <shapeGeometry
                    attach="geometry"

                    onUpdate={self => (self.verticesNeedUpdate = true)}

                />
                <meshBasicMaterial attach="material" color={0x00cc00} />
            </mesh>
        )
    }
}
