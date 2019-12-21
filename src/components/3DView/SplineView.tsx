import React, { Component, useEffect, useRef } from 'react'
import * as THREE from 'three';
import { extend, useUpdate, useThree } from 'react-three-fiber';
import { LineShape } from '../../Models/Shapes/LineShape';
import { observer } from 'mobx-react';
import SphereView from './SphereView';
import { MoveStatus } from '../Tools/LineTool';
import Point3D from '../../Models/Point3D';
import { CANVAS_OFFSET } from '../../Models/const';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';

extend({ Line_: THREE.Line, TransformControls });




const TransformControl = ({ active }) => {
    console.log(active);
    const ref = useRef(null);
    const { camera, gl } = useThree();
    //@ts-ignore
    React.useEffect(() => {
        ref.current.attach = active;
    });
    //@ts-ignore
    return (<transformControls ref={ref} args={[camera, gl.domElement]} />)
}


const SplineView = observer(({ line }: { line: LineShape }) => {
    const [moveStatus, setMoveStatus] = React.useState(MoveStatus.ALL_MOVE);

    const pressMove = (e, status: MoveStatus) => {

        setMoveStatus(status);
        document.addEventListener('mousemove', move, false);
        document.addEventListener('mouseup', e => upMove(e, status), false);
    }

    const upMove = (e, status: MoveStatus) => {
        console.log('mouse up');

        setMoveStatus(status);
        document.removeEventListener('mousemove', move, false);
    }


    const move = (e) => {
        if (line.isFocused)
            switch (moveStatus) {
                case MoveStatus.ALL_MOVE:
                    const [start, end] = line.points;
                    const item = new Point3D((start.x + end.x) / 2, (start.y + end.y) / 2, 0);
                    const center = Point3D.subtraction(item, new Point3D(e.clientX, e.clientY, 0));

                    line.move(start.minus(center), end.minus(center));
                    return;
                case MoveStatus.START_MOVE:
                    console.log(e.clientX);
                    console.log(e.clientY);
                    line.move(new Point3D(e.clientX, e.clientY), line.points[1]);
                    return;
                case MoveStatus.END_MOVE:
                    line.move(line.points[0], new Point3D(e.clientX, e.clientY));
                    return;

            }
    }
    const ref = React.useRef(null);


    return (
        <>
            <TransformControl active={ref.current} />
            <line_
                castShadow={true}
                onClick={e => line.focus()}
                ref={ref}
                onPointerDown={e => pressMove(e, MoveStatus.ALL_MOVE)}
            >

                <geometry
                    attach="geometry"
                    vertices={line.points.map(v => new THREE.Vector3(v.getX, v.getY, v.getZ))}
                    onUpdate={self => (self.verticesNeedUpdate = true)}

                />
                <lineBasicMaterial attach="material" color={line.color.hex} />

            </line_>
            {line.isFocused && <>
                <SphereView point={line.points[0]} move={e => pressMove(e, MoveStatus.START_MOVE)} />
                <SphereView point={line.points[1]} move={e => pressMove(e, MoveStatus.END_MOVE)} />
            </>}

        </>
    )
}


);
export default SplineView;
