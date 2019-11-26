import React, {Component} from 'react';
import * as THREE from 'three/src/Three'

import {Canvas, useFrame} from 'react-three-fiber'

class WebGlContainer extends Component {
    private ref;


    private line;

    constructor(props) {

        super(props);
        this.ref = React.createRef();
        const geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3(-10, 0, 0));
        geometry.vertices.push(new THREE.Vector3(0, 10, 0));
        geometry.vertices.push(new THREE.Vector3(10, 0, 0));
        var material = new THREE.LineBasicMaterial({color: new THREE.Color('skyblue'), linewidth: 10});
        this.line = new THREE.Line(geometry, material);
    }

    render() {
        const camera = new THREE.PerspectiveCamera(33, window.innerWidth / window.innerHeight, 0.1, 100);

        return (

            <Canvas camera={{fov: 70,  near: 0.1, far: 100}}>
                <mesh
                    geometry={this.line}
                    onClick={e => this.ref.current.rotation.y += 1}
                    ref={this.ref}
                >


                </mesh>
            </Canvas>
        )

    }
}

export default WebGlContainer;
