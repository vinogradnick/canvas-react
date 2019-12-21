import React from 'react'
import { observer } from 'mobx-react';
import './WorkspaceGrid.css';
import { LOCAL } from '../../Models/const';
import Point3D from '../../Models/Point3D';
import { LineShape } from '../../Models/Shapes/LineShape';
import { app } from '../../Models/Application';

interface WorkspaceGridProps {
    width: number,
    height: number,
    size: number,
    gridPattern: boolean
};
const Flexobas = () => {
    return (<g style={{ userSelect: 'none' }}>

        <svg
            width={LOCAL.getWidth}
            height={LOCAL.getHEIGHT}
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <pattern id="smallGrid" width="48" height="25" patternUnits="userSpaceOnUse"
                    patternTransform="rotate(0)">
                    <path d="M 0 12.5 L 24 0 48 12.5 24 25 0 12.5" fill="none" stroke="black" stroke-width="1" />
                </pattern>
            </defs>

            <rect width="100%" height="100%" fill="url(#smallGrid)" />
        </svg>

    </g>)
}

const WorkspaceGrid = observer(({ width, height, size, gridPattern }: WorkspaceGridProps) => {
    const [p1, p2, p3] = [
        new LineShape([new Point3D(0, LOCAL.CENTER_HEIGHT, 0), new Point3D(LOCAL.getWidth, LOCAL.CENTER_HEIGHT, 0)]),
        new LineShape([new Point3D(LOCAL.CENTER_WIDTH, 0, 0), new Point3D(LOCAL.CENTER_WIDTH, LOCAL.getHEIGHT, 0)]),
        new LineShape([new Point3D(0, LOCAL.getHEIGHT, 0), new Point3D(LOCAL.getWidth, 0, 0)]),
    ].map(item => item.points);
    console.log(p1);
    return (
        <g>
            {gridPattern && (<>
                <defs>
                    <pattern id="smallGrid" width={size} height={size} patternUnits="userSpaceOnUse">
                        <path d={`M ${size} 0 L 0 0 0 ${size}`} fill="none" stroke="gray" strokeWidth="1" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#smallGrid)" />
            </>)}

            <g>
                <line x1={p1[0].x} y1={p1[0].y} x2={p1[1].x} y2={p1[1].y} stroke="black" strokeWidth="1" />
                <line x1={p2[0].x} y1={p2[0].y} x2={p2[1].x} y2={p2[1].y} stroke="black" strokeWidth="1" />

                {/* <line x1={width / 2} y1={height / 2} x2={width / 2} y2={30} stroke="black" strokeWidth="1"
                    color="red"></line>

                <line x1={width / 2} y1={height / 2} x2={20} y2={height / 2} stroke="black" strokeWidth="1"
                    color="red"></line>
                <line x1={width / 2} y1={height / 2} x2={width - 20} y2={height / 2} stroke="black"
                    strokeWidth="1"
                    color="red"></line>
                <line x1={width / 2} y1={height / 2} x2={width / 2} y2={height - 30} stroke="black"
                    strokeWidth="1"
                    color="red"></line>
                <line x1={30} y1={height - 30} x2={width - 30} y2={30} stroke="black" strokeWidth="1"
                    color="red" ></line> */}

                <text id="Y" fontFamily="Helvetica" fontSize="18" fontWeight="normal" fill="#000000"
                    className="non-select">
                    <tspan x={p1[0].x} y={p1[0].y}>X</tspan>
                </text>

                <text id="X" fontFamily="Helvetica" fontSize="18" fontWeight="normal" fill="#000000"
                    className="non-select">
                    <tspan x={p1[1].x - 20} y={p1[1].y}>X</tspan>
                </text>


                <text id="Y" fontFamily="Helvetica" fontSize="18" fontWeight="normal" fill="#000000"
                    className="non-select">
                    <tspan x={p2[0].x - 10} y={p2[0].y} className="non-select">Y</tspan>
                </text>
                <text id="X" fontFamily="Helvetica" fontSize="18" fontWeight="normal" fill="#000000"
                    className="non-select">
                    <tspan x={p2[1].x - 10} y={p2[1].y}>Y</tspan>
                </text>


                <text id="Z" fontFamily="Helvetica" fontSize="18" fontWeight="normal" fill="#000000"
                    className="non-select">
                    <tspan x={p3[0].x} y={p3[0].y}>Z</tspan>
                </text>
                <text id="Z" fontFamily="Helvetica" fontSize="18" fontWeight="normal" fill="#000000"
                    className="non-select">
                    <tspan x={p3[1].x - 15} y={p3[1].y}>Z</tspan>
                </text>
            </g>
        </g>
    )
});

export default WorkspaceGrid
