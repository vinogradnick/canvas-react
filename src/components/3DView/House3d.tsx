import React, { Suspense } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { extend, useLoader } from 'react-three-fiber';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

import path from 'path';
extend({ GLTFLoader })
const House3d = () => {

    const gltf = useLoader(GLTFLoader, '/Users/vinograd/projects/canvas-react/src/components/3DView/home/scene.gltf')
    return <primitive object={gltf.scene} />

}

export default House3d;