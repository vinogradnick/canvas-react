import React, { Component } from 'react'
import { PolygonShape } from '../../Models/Shapes/PolygonShape'
import { observer } from 'mobx-react';
import { TriangulateAlgo } from '../../Models/Shapes/ TriangulateAlg';
import uuidv4 from '../../Models/uuid';
import { ColorR, rndColor } from '../../Models/Bis';
import { CANVAS_OFFSET } from '../../Models/const';
@observer
export default class PolygonTool extends Component<{ polygone: PolygonShape }, { active: number }>{
    constructor(props) {
        super(props);
        this.state = { active: 0 }
    }
    render() {

        const mouseUp = (eF) => {
            document.removeEventListener('mousemove', move, false);

        }
        const move = (e) => {

            this.props.polygone.points[this.state.active]._x.set(e.clientX - CANVAS_OFFSET.LEFT);
            this.props.polygone.points[this.state.active]._y.set(e.clientY - CANVAS_OFFSET.TOP - 5);

        }
        const startMove = (eF, id) => {
            this.setState({ active: id })
            document.addEventListener('mousemove', move, false);
            document.addEventListener('mouseup', mouseUp, false);
        }


        return (

            <g>
                <polygon fill="tr" fill-opacity="0" stroke="purple" points={this.props.polygone.pointsList}>

                </polygon>
                {this.props.polygone.pointArr.map(item => {
                    const [p1, p2, p3] = item;
                    return <polygon key={uuidv4()} stroke="red" fill={'snow'} strokeWidth="1" points={`${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}`} />
                }

                )}
                {
                    this.props.polygone.points.map((item, idx, arr) =>
                        <circle
                            key={uuidv4()}
                            onMouseDown={e => startMove(e, idx)}
                            cx={item.x}
                            cy={item.y}
                            stroke={'black'}
                            strokeWidth={1}
                            fill="white"
                            r={5}
                        />)
                }
            </g >
        )
    }
}
