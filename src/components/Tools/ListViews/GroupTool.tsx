import React, { Component } from 'react'
import { GroupShape } from '../../../Models/Shapes/GroupShape';
import folder from '../../../assets/img/folder.svg';
import uuidv4 from "../../../Models/uuid";
import { observer } from 'mobx-react';
import arrow from '../../../assets/img/drop-down-arrow.svg'
@observer
export default class GroupTool extends Component<{ group: GroupShape, focus: () => void }, { isShow: boolean }> {
    constructor(props) {
        super(props);
        this.state = { isShow: true };
    }

    render() {
        const { key, children, level } = this.props.group;
        const modify = () => {
            this.setState({ isShow: !this.state.isShow })
        }
        return (
            <ul className="left-bar-list">
                <li>
                    <img src={arrow} width="16" onClick={modify} alt="" style={{ transform: this.state.isShow ? 'rotateZ(180deg)' : '' }} />
                    <span className="left-bar-name-group" onClick={e => this.props.focus()} style={
                        {
                            fontWeight: this.props.group.isFocused ? 'bold' : 'normal',
                        }
                    }>
                        <img src={folder} width="16" alt="" />   {key.slice(0, 7) + ' - ' + level}
                    </span>

                    <ul>
                        {this.state.isShow && children && children.collection.map(({ ListViewComponent }) =>
                            (<li key={uuidv4()}>
                                {ListViewComponent}
                            </li>))}

                    </ul>
                </li>

            </ul>

        )
    }
}
