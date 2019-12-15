import React, { Component } from 'react'
import * as THREE from 'three';
import { Canvas, useFrame } from 'react-three-fiber'
import { LineShape } from '../../Models/Shapes/LineShape';


/* 
var curve = new THREE.CatmullRomCurve3(this.points.map(item => new THREE.Vector3(item.getX, item.getY, item.z)));
        var points = curve.getPoints(50);
        var geometry = new THREE.BufferGeometry().setFromPoints(points);
        var material = new THREE.LineBasicMaterial({ color: 0xff0000 });

        var curveObject = new THREE.Line(geometry, material);
        curveObject.castShadow = true;
        curveObject.receiveShadow = true;
*/
function Thing({ line }: { line: LineShape }) {

    return (
        <mesh
            visible
            attach="cur"

        >

            {/* <bufferGeometry attach="geometry" setFromPoints={(p) => line.points.map(item => new THREE.Vector3(item.getX, item.getY, item.getZ))} /> */}
            <lineBasicMaterial attach="material" />
        </mesh>
    )
}

export default class ReactorContainer extends Component {
    render() {
        return (
            <Canvas>
                {/* <Thing /> */}
            </Canvas>
        )
    }
}
