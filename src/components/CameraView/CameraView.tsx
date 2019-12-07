import React, { Component } from 'react'
import { observer } from 'mobx-react';
import { camera } from '../../Store/Camera';

@observer
export default class CameraView extends Component<{ children: React.ReactChild }> {
    render() {
        return (
            <div style={{
                perspective: `${camera.zDistance}px`,
                transformStyle: 'preserve-3d'
            }} >
                {this.props.children}
            </div>
        )
    }
}
