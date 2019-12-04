import React, { Component } from 'react';
import folder from '../../assets/img/folder.svg';
import circle from '../../assets/img/circle.svg';
import { inject, observer } from 'mobx-react';
import { ShapeStore } from "../../Store/ShapeStore";
import MousePoint from './MousePoint/MousePoint';
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
            </div>
        );
    }
}

export default Sidebar;
