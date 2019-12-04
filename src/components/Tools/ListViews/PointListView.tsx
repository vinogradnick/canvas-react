
import React from 'react';
import circle from "../../../assets/img/circle.svg";
import Point3D from "../../../Models/Point3D";
import { LineShape } from '../../../Models/Shapes/LineShape';
import TextField from '@material-ui/core/TextField';
function PointListView({ point, line }: { point: Point3D, line: LineShape }) {
    const [active, setActive] = React.useState(false);
    return (
        <li className="group-item" >
            <img src={circle} width={16} height={16} alt="" />
            <span className="point-text" onClick={e => setActive(!active)}> P: ({point.getX};{point.getY};{point.getZ})</span>
            {active && (
                <>
                    <TextField
                        id="standard-number"
                        label="Number"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        id="standard-number"
                        label="Number"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        id="standard-number"
                        label="Number"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </>
            )}
        </li>
    )
}

export default PointListView
