
import React from 'react';
import circle from "../../../assets/img/circle.svg";
import Point3D from "../../../Models/Point3D";
import { LineShape } from '../../../Models/Shapes/LineShape';
import TextField from '@material-ui/core/TextField';
import { observer } from 'mobx-react';

const PointListView = observer(({ point, line }: { point: Point3D, line: LineShape }) => {
    const [active, setActive] = React.useState(false);
    const [pointView, setPoint] = React.useState(point);
    return (
        <li className="group-item" >
            <img src={circle} width={16} height={16} alt="" />
            <span className="point-text" onClick={e => setActive(!active)}> P: ({point.getX.toFixed(2)};{point.getY.toFixed(2)};{point.getZ.toFixed(2)})</span>

            <div>
                <p className="point-text">X</p>
                <input value={point._z} />

                <p className="point-text">
                    Y
                    </p>
                <input value={point.getX} />
                <p className="point-text">
                    Z
                    </p>
                <input value={point._z} />

            </div>


        </li >
    )
});

export default PointListView
