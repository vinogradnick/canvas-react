import React, { Component } from 'react'
import Point3D from '../../Models/Point3D'
import { observer } from 'mobx-react';
import { ILineToolProps, MoveStatus } from './LineTool';
import { CANVAS_OFFSET } from '../../Models/const';

@observer
export default class CircleTool extends Component<ILineToolProps, { moveStatus: MoveStatus }> {
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
                    const p = new Point3D(e.clientX, e.clientY);
                    this.props.move(p);
                    return;

            }
    }
    public render() {
        const p = this.props.points[0];
        return <circle
            onMouseDown={e => this.pressMove(e, MoveStatus.ALL_MOVE)}
            onClick={this.activate}
            cx={p.x}
            cy={p.y}
            stroke={'black'}
            strokeWidth={1}
            fill="white"
            r={this.props.activation ? 10 : 5}
        />
    }
}
