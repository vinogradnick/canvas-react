import React, { Component } from 'react'
import { observer } from 'mobx-react';
import Slider from '@material-ui/core/Slider';
import { PAGE_SIZE } from '../../Models/const';
import { app } from '../../Models/Application';

@observer
export default class CameraView extends Component<{ children?: React.ReactChild }> {
    render() {
        return (
            <div className="camera-view" >
                <p>X</p>
                <Slider
                    defaultValue={app.cameraInstance.cameraPosition.get().xAngle}

                    onChange={(e, v: number) => { app.cameraInstance.setX(v); }}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={0}
                    max={180}
                />
                <p>Y</p>
                <Slider
                    defaultValue={app.cameraInstance.cameraPosition.get().yAngle}
                    onChange={(e, v: number) => { app.cameraInstance.setY(v) }}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={0}
                    max={180}
                />
                <p>Z distance</p>
                <Slider
                    defaultValue={app.cameraInstance.cameraPosition.get().distance}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    onChange={(e, v: number) => { app.cameraInstance.setZ(v) }}
                    step={1}
                    marks
                    min={1}
                    max={PAGE_SIZE.WIDTH}
                />
            </div>
        )
    }
}
