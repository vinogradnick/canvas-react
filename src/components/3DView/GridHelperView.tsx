import React, { Component } from 'react'
import * as THREE from 'three';
import { LOCAL } from "../../Models/const";

export default class GridHelperView extends Component {
    render() {
        const material = new THREE.Material();
        material.transparent = true;
        material.opacity = 0.25;
        return (
            <gridHelper

                args={[2000, 2000, 2000]}
                position={[0, 0, 0]}>

            </gridHelper>
        )
    }
}
