import React, { Component } from 'react'
import { observer } from 'mobx-react';
import Slider from '@material-ui/core/Slider';
import { LOCAL } from '../../Models/const';
import { app } from '../../Models/Application';
import TextField from '@material-ui/core/TextField';

@observer
export default class CameraView extends Component<{ children?: React.ReactChild }> {
    render() {
        return (
            <div className="camera-view">
                <TextField
                    id="outlined-number"
                    label="X"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={LOCAL.getX}
                    onChange={e => LOCAL.setX(Number(e.target.value))}
                    variant="outlined"
                />
                <br />
                <TextField
                    id="outlined-number"
                    label="Y"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={LOCAL.getY}
                    onChange={e => LOCAL.setY(Number(e.target.value))}
                    variant="outlined"
                />
            </div>
        )
    }
}
