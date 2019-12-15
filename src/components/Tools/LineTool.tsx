import React, { Component } from 'react';
import Point3D from "../../Models/Point3D";
import { observer } from 'mobx-react';
import { CANVAS_OFFSET } from '../../Models/const';
import { app } from '../../Models/Application';

export enum MoveStatus {
    START_MOVE,
    END_MOVE,
    ALL_MOVE
};

export interface ILineToolProps {
    activation: boolean;
    points: Point3D[];
    activate: () => void;
    move: (...points: Point3D[]) => void;
}
@observer
class LineTool extends Component<ILineToolProps, { moveStatus: MoveStatus }> {

    constructor(props: ILineToolProps) {
        super(props);
        this.state = {
            moveStatus: MoveStatus.ALL_MOVE,
        };
        this.pressMove = this.pressMove.bind(this);
        this.upMove = this.upMove.bind(this);
        this.move = this.move.bind(this);
        this.activate = this.activate.bind(this);

    }

    public activate(e) {
        e.preventDefault();
        this.props.activate();

    }


    public pressMove(e, status: MoveStatus) {
        console.log(this.state);
        this.setState({ moveStatus: status });
        document.addEventListener('mousemove', this.move, false);
        document.addEventListener('mouseup', e => this.upMove(e, status), false);
    }

    public upMove(e, status: MoveStatus) {
        console.log('mouse up');

        this.setState({ moveStatus: status });
        document.removeEventListener('mousemove', this.move, false);
    }


    public move(e) {
        if (this.props.activation)
            switch (this.state.moveStatus) {
                case MoveStatus.ALL_MOVE:
                    const [start, end] = this.props.points;
                    const item = new Point3D((start.x + end.x) / 2, (start.y + end.y) / 2);
                    const center = Point3D.subtraction(item, new Point3D(e.clientX - CANVAS_OFFSET.LEFT, e.clientY - CANVAS_OFFSET.TOP));
                    this.props.move(start.minus(center), end.minus(center));
                    return;
                case MoveStatus.START_MOVE:
                    this.props.move(new Point3D(e.clientX - CANVAS_OFFSET.LEFT, e.clientY - CANVAS_OFFSET.TOP), this.props.points[1]);
                    return;
                case MoveStatus.END_MOVE:
                    this.props.move(this.props.points[0], new Point3D(e.clientX - CANVAS_OFFSET.LEFT, e.clientY - CANVAS_OFFSET.TOP));
                    return;

            }
    }


    render() {
        const [p1, p2] = this.props.points;
        return (
            <g style={{ position: 'absolute', transform: app.cameraInstance.CameraGet }}>
                <line

                    x1={p1.x}
                    x2={p2.x}
                    y1={p1.y}
                    y2={p2.y}
                    stroke={'darkblue'}
                    onDoubleClick={this.activate}
                    onMouseDown={e => this.pressMove(e, MoveStatus.ALL_MOVE)}
                    strokeWidth={this.props.activation ? 3 : 1}
                />

                {this.props.activation && (<>
                    <circle

                        onMouseDown={e => this.pressMove(e, MoveStatus.START_MOVE)}
                        cx={p1.x}
                        cy={p1.y}
                        stroke={'black'}
                        strokeWidth={1}
                        fill="white"
                        r={5}

                    />
                    <circle

                        onMouseDown={e => this.pressMove(e, MoveStatus.END_MOVE)}
                        cx={p2.x}
                        cy={p2.y}
                        stroke={'black'}
                        strokeWidth={1}
                        fill="white"
                        r={5}
                    />
                </>)}

            </g>
        )
            ;
    }
}

export default LineTool;
