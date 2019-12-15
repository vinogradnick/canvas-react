import React, { Component } from 'react';
import Point3D from "../../Models/Point3D";
import { GroupShape } from "../../Models/Shapes/GroupShape";
import uuidv4 from "../../Models/uuid";
import { observer } from 'mobx-react';
import { CANVAS_OFFSET } from '../../Models/const';
import { app } from '../../Models/Application';



@observer
class GroupFigure extends Component<{ group: GroupShape, children: any }, { isMoving: boolean }> {
    constructor(props) {
        super(props);
        this.state = { isMoving: false };
        this.startMove = this.startMove.bind(this);
        this.endMove = this.endMove.bind(this);
        this.move = this.move.bind(this);
    }

    public startMove(e) {
        this.setState({ isMoving: true });
        document.addEventListener('mousemove', this.move, false);
        document.addEventListener('mouseup', this.endMove, false);
    }

    public endMove(e) {
        this.setState({ isMoving: false });
        document.removeEventListener('mouseup', this.endMove, false);
        document.removeEventListener('mousemove', this.move, false);

    }
    public move(e) {
        if (this.state.isMoving) {
            const center = new Point3D(e.clientX - CANVAS_OFFSET.LEFT, e.clientY - CANVAS_OFFSET.TOP);
            this.props.group.movePoint(center);
            this.props.group.move(center);
        }
    }
    public render() {
        const { minX, minY, maxX, maxY } = this.props.group.groupCoord;




        const { children, group } = this.props;
        return (
            <>
                {!group.isFocused ? children : (<>
                    <g key={uuidv4()} style={{ pointerEvents: group.isFocused ? 'none' : 'all', }}>
                        {children}
                    </g>
                    {group.isFocused === true &&
                        [
                            <rect
                                style={{ transform: app.cameraInstance.CameraGet }}

                                key={uuidv4()}
                                x={minX}
                                y={minY}
                                stroke={group.isFocused ? 'red' : ''}
                                strokeWidth={1}
                                height={maxY + 10 - minY}
                                width={maxX + 10 - minX}
                                onMouseDown={this.startMove}
                                fillOpacity={0}>
                            </rect>,
                            <circle
                                style={{ transform: app.cameraInstance.CameraGet }}
                                key={uuidv4()}
                                cx={group.centerFigure.x}
                                cy={group.centerFigure.y}
                                r={10}
                                stroke={'red'}
                                onMouseDown={this.startMove}

                            />]
                    }
                </>

                )}


            </>

        )
    }
}

export default GroupFigure;
