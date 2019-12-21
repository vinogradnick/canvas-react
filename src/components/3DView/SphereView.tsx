import React, { useRef } from 'react';
import Point3D from '../../Models/Point3D';
import { observer } from 'mobx-react';
import { useThree, extend } from 'react-three-fiber';

const SphereView = observer(({ point, move }: { point: Point3D, move: any }) => {
    const ref = React.useRef(null);

    return (



        <mesh
            ref={ref}
            position={[point.getX, point.getY, point.getZ]}
            onPointerDown={e => move(e)}
        >
            <sphereBufferGeometry attach="geometry" args={[7.5, 16, 16]} />
            <meshBasicMaterial attach="material" />
        </mesh>

    )

});
export default SphereView;