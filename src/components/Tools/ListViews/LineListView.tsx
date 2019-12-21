import React from 'react'
import circle from '../../../assets/img/circle.svg';
import { LineShape } from '../../../Models/Shapes/LineShape';
import PointListView from "./PointListView";
import uuidv4 from "../../../Models/uuid";
import { observer } from 'mobx-react';
import flex from "../../../assets/img/icon.svg";
import arrow from '../../../assets/img/drop-down-arrow.svg'
import TextField from '@material-ui/core/TextField';
import Point3D from '../../../Models/Point3D';
import {
    fade,
    ThemeProvider,
    withStyles,
    makeStyles,
    createMuiTheme,
} from '@material-ui/core/styles';
const usestl = makeStyles({
    flex: {


    },
});

interface ILineListViewProps {
    line: LineShape;
}
const LineListView = observer(({ line }: { line: LineShape }) => {
    //@ts-ignore
    const stl = usestl();
    const [active, setActive] = React.useState(false);

    return (
        <li>
            <img src={arrow} width="16" onClick={e => setActive(!active)} alt="" style={{ transform: active ? 'rotateZ(180deg)' : '' }} />

            <span className="left-bar-name-group" onClick={e => line.focus()}
                style={{ fontWeight: line.isFocused ? "bold" : "normal" }}>
                <img src={flex} width="16" alt="" />  f: {line.formula}
            </span>
            {active && (
                <ul className="left-bar-list">

                    <li className="left-bar-name-group">
                        Начало
                    <TextField
                            className={stl.flex}
                            key={uuidv4()}
                            id="outlined-number"
                            label="X"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}

                            value={line.points[0].x}
                            onChange={(e) => line.move(new Point3D(Number(e.target.value), line.points[0].y, line.points[0].getZ), line.points[1])}
                        />
                        <TextField
                            className={stl.flex}
                            key={uuidv4()}
                            id="outlined-number"
                            label="Y"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}

                            value={line.points[0].y}
                            onChange={(e) => line.move(new Point3D(line.points[0].x, Number(e.target.value), line.points[0].getZ), line.points[1])}
                        />
                        <TextField
                            className={stl.flex}
                            key={uuidv4()}
                            label="Z"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}


                            value={line.points[0].getZ}
                            onChange={(e) => line.move(new Point3D(line.points[0].x, line.points[0].y, Number(e.target.value)), line.points[1])}
                        />

                    </li>
                    <li className="left-bar-name-group">
                        Конец
                    <TextField
                            className={stl.flex}
                            key={uuidv4()}
                            id="outlined-number"
                            label="X"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}

                            value={line.points[1].x}
                            onChange={(e) => line.move(line.points[0], new Point3D(Number(e.target.value), line.points[1].y, line.points[1].getZ))}
                        />
                        <TextField
                            className={stl.flex}
                            key={uuidv4()}
                            id="outlined-number"
                            label="Y"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}

                            value={line.points[1].y}
                            onChange={(e) => line.move(line.points[0], new Point3D(line.points[1].x, Number(e.target.value), line.points[1].getZ))}
                        />
                        <TextField
                            className={stl.flex}
                            key={uuidv4()}
                            label="Z"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}


                            value={line.points[1].getZ}
                            onChange={(e) => line.move(line.points[0], new Point3D(line.points[1].x, line.points[1].y, Number(e.target.value)))}
                        />

                    </li>

                </ul>
            )}
        </li>


    )
}


)


export default LineListView
