import React, { Component } from 'react';
import Point3D from "../../Models/Point3D";
import { GroupShape } from "../../Models/Shapes/GroupShape";
import uuidv4 from "../../Models/uuid";
import { observer } from 'mobx-react';
import { Camera, camera } from '../../Store/Camera';



@observer
class GroupFigure extends Component<{ group: GroupShape, children: any }, { isMoving: boolean }> {
    constructor(props) {
        super(props);
        this.state = { isMoving: false };
        this.startMove = this.startMove.bind(this);
        this.endMove = this.endMove.bind(this);
    }

    public startMove(e) {
        this.setState({ isMoving: true });

    }

    public endMove(e) {
        this.setState({ isMoving: false });

    }

    public render() {
        const { minX, minY, maxX, maxY } = this.props.group.groupCoord;


        const move = (e) => {
            if (this.state.isMoving) {
                const center = new Point3D(e.clientX, e.clientY);
                this.props.group.movePoint(center);
                this.props.group.move(center);
            }
        }

        const { children, group } = this.props;
        return (
            <>
                {!group.isFocused ? children : (<>
                    <g key={uuidv4()} style={{ pointerEvents: group.isFocused ? 'none' : 'all' }}>
                        {children}
                    </g>
                    {group.isFocused === true &&
                        [
                            <rect

                                key={uuidv4()}
                                x={minX}
                                y={minY}
                                stroke={group.isFocused ? 'red' : ''}
                                strokeWidth={1}
                                height={maxY + 10 - minY}
                                width={maxX + 10 - minX}
                                onMouseMove={move}
                                fillOpacity={0}>
                            </rect>,
                            <circle
                                key={uuidv4()}
                                cx={group.centerFigure.x}
                                cy={group.centerFigure.y}
                                r={10}
                                stroke={'red'}
                                onMouseDown={this.startMove}
                                onMouseUp={this.endMove}
                                onMouseMove={move} />]
                    }
                </>

                )}


            </>

        )
    }
}

export default GroupFigure;
