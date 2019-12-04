import React from 'react'
import circle from '../../../assets/img/circle.svg';
import { LineShape } from '../../../Models/Shapes/LineShape';
import PointListView from "./PointListView";
import uuidv4 from "../../../Models/uuid";
import { observer } from 'mobx-react';
interface ILineListViewProps {
    line: LineShape;
}
const LineListView = observer(({ line }: { line: LineShape }) =>
    <ul>
        <span className="group-header"
            style={{
                backgroundColor: line.isFocused ? 'rgb(106, 86, 119)' : '',

            }}
            onClick={e => line.focus()}
        >
            <div className="group-header-item">
                {line.formula}
            </div>
        </span>
        <ul>
            {line.points &&
                line.points.map(item =>
                    <PointListView
                        line={line}
                        key={uuidv4()}
                        point={item} />)}
        </ul>

    </ul>
)


export default LineListView
