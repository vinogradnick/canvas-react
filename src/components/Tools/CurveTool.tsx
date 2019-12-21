import React, { Component } from 'react'
import { CurveShape } from '../../Models/Shapes/CurveShape'
import { observer } from 'mobx-react';
import { CANVAS_OFFSET } from '../../Models/const';
import Point3D from '../../Models/Point3D';
@observer
export default class CurveTool extends Component<{ curve: CurveShape }, { active: number }> {
    constructor(props) {
        super(props);
    }
    render() {
        const [p1, p2] = this.props.curve.points;
        const [c1, c2] = [this.props.curve.points[2], this.props.curve.points[3]];
        const mouseUp = (eF) => {
            document.removeEventListener('mousemove', move, false);

        }
        const move = (e) => {
            if (this.state.active != 5) {
                this.props.curve.points[this.state.active]._x.set(e.clientX - CANVAS_OFFSET.LEFT);
                this.props.curve.points[this.state.active]._y.set(e.clientY - CANVAS_OFFSET.TOP - 5);
            }


        }
        const startMove = (eF, id) => {
            this.setState({ active: id })
            document.addEventListener('mousemove', move, false);
            document.addEventListener('mouseup', mouseUp, false);
        }
        const srt = `M ${p1.x} ${p1.y} C ${c1.x} ${c1.y} ${c2.x} ${c2.y}, ${p2.x} ${p2.y}`;

        return (

            <g>
                <path onMouseDown={e => startMove(e, 5)} d={srt} stroke="black" strokeWidth={this.props.curve.isFocused ? 5 : 3} fill="transparent" />
                <circle cx={p1.x} cy={p1.y} r="5" onMouseDown={e => startMove(e, 0)} />
                <circle cx={c1.x} cy={c1.y} r="5" onMouseDown={e => startMove(e, 2)} />
                <circle cx={c2.x} cy={c2.y} r="5" onMouseDown={e => startMove(e, 3)} />
                <circle cx={p2.x} cy={p2.y} r="5" onMouseDown={e => startMove(e, 1)} />
                <line x1={p1.x} y1={p1.y} y2={c1.y} x2={c1.x} strokeWidth={this.props.curve.isFocused ? 5 : 1} stroke="black" stroke-dasharray="1" />
                <line x1={p2.x} y1={p2.y} y2={c2.y} x2={c2.x} strokeWidth={this.props.curve.isFocused ? 5 : 1} stroke="black" stroke-dasharray="1" />

            </g>
        )
    }
}
