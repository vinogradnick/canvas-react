import React from 'react';
import * as THREE from 'three';
import { useThree, useFrame } from 'react-three-fiber';
const PespectiveCamera = (props) => {
    const ref = React.useRef(null);
    const { setDefaultCamera } = useThree()
    // Make the camera known to the system
    React.useEffect(() => void setDefaultCamera(ref.current), [])
    // Update it every frame
    useFrame(() => ref.current.updateMatrixWorld())
    return <perspectiveCamera ref={ref} {...props} />
}