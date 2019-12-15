import React, { Component } from 'react'
import { observer, inject, Provider } from 'mobx-react';
import { app } from '../../Models/Application';
import { ShapeStore } from '../../Store/ShapeStore';
import SvgContainer from '../SvgContainer/SvgContainer';
import UltraWebGLContainer from './UltraWebGLContainer';

@observer
@inject('shapeStore')
export default class ContainerOfContainer extends Component<{ shapeStore?: ShapeStore }, { active: boolean }> {
    constructor(props) {
        super(props);
        this.state = { active: false };
    }
    render() {
        app.cameraInstance.isActive.observe((value) => this.setState({ active: value.newValue }));
        if (this.state.active) {
            return (
                <Provider shapeStore={this.props.shapeStore}>
                    <UltraWebGLContainer />
                </Provider>
            )
        }
        else {
            return (
                <Provider shapeStore={this.props.shapeStore}>
                    <SvgContainer />
                </Provider>);
        }
    }
}
