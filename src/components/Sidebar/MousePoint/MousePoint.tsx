import React, { Component } from 'react'
import { observer, inject } from 'mobx-react';
import Point3D from '../../../Models/Point3D';
import Switch from '@material-ui/core/Switch';
import { ShapeStore } from '../../../Store/ShapeStore';
import { app } from '../../../Models/Application';


@inject('shapeStore')
@observer
export default class MousePoint extends Component<{ shapeStore?: ShapeStore }> {
    constructor(props) {
        super(props);

    }

    render() {
        const { mousePoint, isShow } = this.props.shapeStore;
        return (
            <div className="mouse-point">
                {mousePoint.toString}
                &nbsp;
                                Сетка координат
                <Switch
                    checked={isShow.get()}
                    onChange={e => isShow.set(!isShow.get())}
                    value="1"
                    color="primary"

                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
                2.5D отображение
                <Switch
                    checked={app.cameraInstance.active}
                    onChange={e => app.cameraInstance.isActive.set(!app.cameraInstance.isActive.get())}
                    value="1"
                    color="primary"

                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
            </div>
        )
    }
}
/*


import React, { Component } from 'react';
import folder from '../../assets/img/folder.svg';
import circle from '../../assets/img/circle.svg';
import Slider from '@material-ui/core/Slider';

import { inject, observer } from 'mobx-react';
import { ShapeStore } from "../../Store/ShapeStore";
import MousePoint from './MousePoint/MousePoint';
import { camera } from '../../Store/Camera';
import { PAGE_SIZE } from '../../Models/const';
@inject('shapeStore')
@observer
class Sidebar extends Component<{ shapeStore?: ShapeStore }> {
    render() {
        return (
            <div className="sidebar">
                <MousePoint mousePoint={this.props.shapeStore.mousePoint} gridShow={this.props.shapeStore.isShow.get()} />
                <div className="sidebar-container">
                    {this.props.shapeStore.group && this.props.shapeStore.group.ListViewComponent}
                </div>
                <div className="slider-bar">
                    <p>X</p>
                    <Slider
                        defaultValue={camera.cameraPosition.get().xAngle}

                        onChange={(e, v: number) => { camera.setX(v); }}
                        aria-labelledby="discrete-slider"
                        valueLabelDisplay="auto"
                        step={10}
                        marks
                        min={10}
                        max={360}
                    />
                    <p>Y</p>
                    <Slider
                        defaultValue={camera.cameraPosition.get().yAngle}
                        onChange={(e, v: number) => { camera.setY(v) }}
                        aria-labelledby="discrete-slider"
                        valueLabelDisplay="auto"
                        step={10}
                        marks
                        min={10}
                        max={360}
                    />
                    <p>Z distance</p>
                    <Slider
                        defaultValue={camera.cameraPosition.get().distance}
                        aria-labelledby="discrete-slider"
                        valueLabelDisplay="auto"
                        onChange={(e, v: number) => { camera.setZ(v) }}
                        step={100}
                        marks
                        min={1000}
                        max={PAGE_SIZE.WIDTH * 3}
                    />
                </div>
            </div>
        );
    }
}

export default Sidebar;

*/