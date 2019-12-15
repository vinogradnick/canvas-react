import React, { Component } from 'react'
import { observer, inject } from 'mobx-react';
import folder from '../../../assets/img/folder.svg'
import line from '../../../assets/img/icon.svg'
import { ShapeStore } from '../../../Store/ShapeStore';

@inject('shapeStore')
@observer
export default class LeftBar extends Component<{ shapeStore?: ShapeStore }>{
    render() {
        const { group } = this.props.shapeStore;
        return (
            <div className="left-bar">
                {group.ListViewComponent}
            </div>
        )
    }
}
