import React, { Component } from 'react';
import LineTool from "../Tools/LineTool";
import { IShape } from "../../Models/IShape";
import { observer, inject } from "mobx-react";
import { ShapeStore } from '../../Store/ShapeStore';
import Point3D from "../../Models/Point3D";
import WorkspaceGrid from "../grid/WorkspaceGrid";
import { PAGE_SIZE } from "../../Models/const";

interface ISvgContainerProps {
    shapeStore?: ShapeStore;
}

@inject('shapeStore')
@observer
class SvgContainer extends Component<ISvgContainerProps> {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1152 750" onMouseMove={e => this.props.shapeStore.moveMouse(new Point3D(e.clientX, e.clientY))}>
                <g >
                    {this.props.shapeStore.isShow.get() && <WorkspaceGrid
                        width={PAGE_SIZE.WIDTH}
                        height={PAGE_SIZE.HEIGHT}
                        size={16}
                        gridPattern={true}
                    />}

                    {this.props.shapeStore.group &&
                        this.props.shapeStore.group.Component}
                </g>
            </svg >
        );
    }
}

export default SvgContainer;
