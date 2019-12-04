import React, { Component } from 'react'
import { observer } from 'mobx-react';
import Point3D from '../../../Models/Point3D';
import Switch from '@material-ui/core/Switch';
import { ShapeStore } from '../../../Store/ShapeStore';
import { shapeStore } from '../../../Store/ShapeStore';

const store = shapeStore;
@observer
export default class MousePoint extends Component<{ mousePoint: Point3D, gridShow: boolean }> {
    constructor(props) {
        super(props);
        this.state = { active: false };
    }

    render() {
        return (
            <div className="mouse-point">
                {this.props.mousePoint.toString}
                <br />
                Сетка координат
                <Switch
                    checked={this.props.gridShow}
                    onChange={e => store.isShow.set(!store.isShow.get())}
                    value="1"

                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
            </div>
        )
    }
}
