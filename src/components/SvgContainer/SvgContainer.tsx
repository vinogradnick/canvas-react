import React, { Component } from 'react';
import LineTool from "../Tools/LineTool";
import { IShape } from "../../Models/IShape";
import { observer, inject } from "mobx-react";
import { ShapeStore } from '../../Store/ShapeStore';
import Point3D from "../../Models/Point3D";
import WorkspaceGrid from "../grid/WorkspaceGrid";
import { app } from '../../Models/Application';
import Canvg from 'canvg';
interface ISvgContainerProps {
    shapeStore?: ShapeStore;
}

@inject('shapeStore')
@observer
class SvgContainer extends Component<ISvgContainerProps, { z: boolean }> {

    constructor(props) {
        super(props);
        this.state = { z: true };


    }
    render() {


        return (
            <>

                <svg

                    xmlns="http://www.w3.org/2000/svg"
                    viewBox={`0 0 1000 700`}
                    style={{ perspective: `${app.cameraInstance.cameraPosition.get().distance}px`, display: this.state.z ? 'block' : 'none' }}
                    onMouseMove={e => {
                        this.props.shapeStore.moveMouse(new Point3D(e.clientX, e.clientY));

                    }}
                >

                    <g style={{ transformStyle: 'preserve-3d' }}>
                        {this.props.shapeStore.isShow.get() && <WorkspaceGrid
                            width={1000}
                            height={700}
                            size={16}
                            gridPattern={false}
                        />}

                        {this.props.shapeStore.group &&
                            this.props.shapeStore.group.Component}
                    </g>
                </svg>
                }

            </>
        );
    }
}

export default SvgContainer;
