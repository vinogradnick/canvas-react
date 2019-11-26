import React, {Component} from 'react';
import folder from '../../assets/img/folder.svg';
import circle from '../../assets/img/circle.svg';
import {inject, observer} from 'mobx-react';
import {ShapeStore} from "../../Store/ShapeStore";

@inject('shapeStore')
@observer
class Sidebar extends Component<{ shapeStore?: ShapeStore }> {
    render() {
        return (
            <div className="sidebar">
                <div className="mouse-point">
                    {this.props.shapeStore.mousePoint.toString}
                </div>
                <div className="sidebar-container">
                    {this.props.shapeStore.group.ListViewComponent}
                </div>
            </div>
        );
    }
}

export default Sidebar;
