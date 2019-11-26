import React, {Component} from 'react'
import {GroupShape} from '../../../Models/Shapes/GroupShape';
import folder from '../../../assets/img/folder.svg';
import uuidv4 from "../../../Models/uuid";
import {observer} from 'mobx-react';

@observer
export default class GroupTool extends Component<{ group: GroupShape, focus: () => void }, { isShow: boolean }> {
    constructor(props) {
        super(props);
        this.state = {isShow: true};
    }

    render() {
        const {key, children} = this.props.group;
        return (
            <ul>
                <span className="group-header" onClick={e => this.props.focus()}>
                    <div className="group-header-item">
                        <img src={folder} width={16} height={16} alt=""/>

                    </div>

                    <div className="group-header-item">
                        {key}
                    </div>
                </span>
                {children && children.collection.map(({ListViewComponent}) =>
                    (<li className="group-item" key={uuidv4()}>
                        {ListViewComponent}
                    </li>))}
            </ul>
        )
    }
}
