import React from 'react'
import { observer } from 'mobx-react';
import './WorkspaceGrid.css';
interface WorkspaceGridProps { width: number, height: number, size: number, gridPattern: boolean };

const WorkspaceGrid = observer(({ width, height, size, gridPattern }: WorkspaceGridProps) => {

    return (
        <g>
            {gridPattern && (<><defs>
                <pattern id="smallGrid" width={size} height={size} patternUnits="userSpaceOnUse">
                    <path d={`M ${size} 0 L 0 0 0 ${size}`} fill="none" stroke="gray" strokeWidth="1" />
                </pattern>
            </defs>
                <rect width="100%" height="100%" fill="url(#smallGrid)" /></>)}

            <g >
                <line x1={width / 2} y1={height / 2} x2={width / 2} y2={30} stroke="red" strokeWidth="1"
                    color="red"></line>

                <line x1={width / 2} y1={height / 2} x2={20} y2={height / 2} stroke="red" strokeWidth="1"
                    color="red"></line>
                <line x1={width / 2} y1={height / 2} x2={width - 20} y2={height / 2} stroke="red"
                    strokeWidth="1"
                    color="red"></line>
                <line x1={width / 2} y1={height / 2} x2={width / 2} y2={height - 30} stroke="red"
                    strokeWidth="1"
                    color="red"></line>
                <line x1={30} y1={height - 30} x2={width - 30} y2={30} stroke="red" strokeWidth="1"
                    color="red" ></line>

                <text id="Y" fontFamily="Helvetica" fontSize="18" fontWeight="normal" fill="#000000" className="non-select">
                    <tspan x={width / 2 - 5} y={20}>Y</tspan>
                </text>

                <text id="X" fontFamily="Helvetica" fontSize="18" fontWeight="normal" fill="#000000" className="non-select">
                    <tspan x="0" y={height / 2 + 5}>X</tspan>
                </text>
                <text id="Y" fontFamily="Helvetica" fontSize="18" fontWeight="normal" fill="#000000" className="non-select">
                    <tspan x={width / 2 - 5} y={height} className="non-select">Y</tspan>
                </text>
                <text id="Y" fontFamily="Helvetica" fontSize="18" fontWeight="normal" fill="#000000" className="non-select">
                    <tspan x={width - 20} y={height / 2 + 5} >X</tspan>
                </text>
                <text id="Z" fontFamily="Helvetica" fontSize="18" fontWeight="normal" fill="#000000" className="non-select">
                    <tspan x={10} y={height - 15}>Z</tspan>
                </text>
                <text id="Z" fontFamily="Helvetica" fontSize="18" fontWeight="normal" fill="#000000" className="non-select">
                    <tspan x={width - 20} y={25}>Z</tspan>
                </text>
            </g>
        </g>
    )
});

export default WorkspaceGrid
