import React, {Component, useEffect} from 'react';
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {Canvas, useFrame, useThree} from 'react-three-fiber'


function Camera(props) {
    const ref = React.useRef(null);
    const {setDefaultCamera} = useThree();
    // Make the camera known to the system
    useEffect(() => void setDefaultCamera(ref.current), [])
    // Update it every frame
    useFrame(() => ref.current.updateMatrixWorld())
    return <perspectiveCamera ref={ref} {...props} />
}


function Thing() {


    return (

        <mesh
            visible
            userData={{test: 'hello'}}
            position={new THREE.Vector3(1, 2, 3)}

            material={new THREE.MeshBasicMaterial({color: new THREE.Color('hotpink'), transparent: true})}
        >
            <Controls/>
        </mesh>
    )
}

class WebGlContainer extends Component {
    private ref;


    private line;

    constructor(props) {

        super(props);

    }

    render() {

        return (

            <Canvas gl2={true} style={{height: '750px'}}>
                <Camera position={[0, 0, 10]}/>
                <Thing/>
            </Canvas>
        )

    }
}

export default WebGlContainer;
