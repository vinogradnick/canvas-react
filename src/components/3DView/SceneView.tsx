import React, { Component, useRef, Suspense } from 'react'
import { Canvas, extend, useThree, useRender, useFrame } from 'react-three-fiber';
import { LOCAL } from '../../Models/const';
import PlaneView from './PlaneView';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import TriangulateView from './TriangulateView';
import GridHelperView from './GridHelperView';

import { observer, inject } from 'mobx-react';
import { ShapeStore } from '../../Store/ShapeStore';
import * as THREE from 'three';
import House3d from './House3d';

extend({ OrbitControls });


const Controls = () => {
    const ref = useRef(null);
    const { camera, gl } = useThree();
    //@ts-ignore
    useRender(() => {
        ref.current.update();

    })
    //@ts-ignore
    return (<orbitControls ref={ref} args={[camera, gl.domElement]} />)
};



@inject('shapeStore')
@observer
export default class SceneView extends Component<{ shapeStore?: ShapeStore }> {
    render() {

        return (
            <Canvas
                style={{
                    backgroundColor: 'lightgray',
                    width: LOCAL.getWidth,
                    height: LOCAL.getHEIGHT,
                    position: 'absolute',
                    top: '30px',
                    left: '213px'
                }}
                camera={{ fov: 70, aspect: LOCAL.getWidth / LOCAL.getHEIGHT, far: 1000, near: 1, position: new THREE.Vector3(0, 0, 250) }}
                raycaster={{ linePrecision: 5 }}
                shadowMap={{ enabled: true, type: THREE.PCFSoftShadowMap }}

            >
                <Controls />
                <GridHelperView />
                <axesHelper position={[LOCAL.CENTER_WIDTH - 500, -LOCAL.CENTER_HEIGHT + 375, 0]} args={[1000]} />
                <axesHelper position={[LOCAL.CENTER_WIDTH - 500, -LOCAL.CENTER_HEIGHT + 375, 0]} rotation={[Math.PI / 2, 0, 0]} args={[1000]} />

                {this.props.shapeStore.group.ReactiveComponent}

            </Canvas >
        )
    }
}
