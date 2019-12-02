import React, { Component } from 'react';
import Point2D from "../../Models/Point3D";
import Point3D from "../../Models/Point3D";
import { Camera3d } from '../../Models/Camera';
import { observer } from 'mobx-react';

enum MoveStatus {
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
                    const item = new Point2D((start.x + end.x) / 2, (start.y + end.y) / 2);
                    const center = Point2D.subtraction(item, new Point2D(e.pageX, e.pageY));
                    this.props.move(start.minus(center), end.minus(center));
                    return;
                case MoveStatus.START_MOVE:
                    this.props.move(new Point2D(e.clientX, e.clientY), this.props.points[1]);
                    return;
                case MoveStatus.END_MOVE:
                    this.props.move(this.props.points[0], new Point2D(e.clientX, e.clientY));
                    return;

            }
    }


    render() {
        const [p1, p2] = this.props.points;
        return (
            <>
                <line

                    x1={p1.x}
                    x2={p2.x}
                    y1={p1.y}
                    y2={p2.y}
                    stroke={'red'}
                    onDoubleClick={this.activate}
                    onMouseDown={e => this.pressMove(e, MoveStatus.ALL_MOVE)}
                    onMouseUp={e => this.upMove(e, MoveStatus.ALL_MOVE)}
                    strokeWidth={this.props.activation ? 5 : 1}
                />

                {this.props.activation && (<>
                    <circle

                        onMouseDown={e => this.pressMove(e, MoveStatus.START_MOVE)}
                        onMouseUp={e => this.upMove(e, MoveStatus.START_MOVE)}
                        cx={p1.x}
                        cy={p1.y}
                        stroke={'black'}
                        strokeWidth={1}
                        fill="white"
                        r={8}

                    />
                    <circle

                        onMouseDown={e => this.pressMove(e, MoveStatus.END_MOVE)}
                        onMouseUp={e => this.upMove(e, MoveStatus.END_MOVE)}
                        cx={p2.x}
                        cy={p2.y}
                        stroke={'black'}
                        strokeWidth={1}
                        fill="white"
                        r={8}
                    />
                </>)}

            </>
        )
            ;
    }
}

export default LineTool;
