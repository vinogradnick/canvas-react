import React, { Component } from 'react'
import CameraView from '../../CameraView/CameraView'
import RightBarGroup from './RightBarGroup/RightBarGroup'
import { observer } from 'mobx-react';
import { app } from '../../../Models/Application';
@observer
export default class RightBar extends Component {
    render() {
        return (
            <div className="right-bar">
                <RightBarGroup group={app.storeInstance.getActiveGroupShape} />
                <CameraView />
            </div>
        )
    }
}
