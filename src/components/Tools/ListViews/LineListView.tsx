import React from 'react'
import circle from '../../../assets/img/circle.svg';
import {LineShape} from '../../../Models/Shapes/LineShape';
import PointListView from "./PointListView";
import uuidv4 from "../../../Models/uuid";

function LineListView({line}: { line: LineShape }) {
    return (
        <ul>
            <span className="group-header">
                <div className="group-header-item">
                    {line.formula}
                </div>
            </span>
            <ul>
                {line.points &&
                line.points.map(item => <PointListView key={uuidv4()} point={item}/>)}
            </ul>

        </ul>
    )
}

export default LineListView
