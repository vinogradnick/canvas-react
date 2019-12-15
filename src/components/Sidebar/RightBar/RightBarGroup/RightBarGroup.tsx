import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { GroupShape } from '../../../../Models/Shapes/GroupShape';
export default class RightBarGroup extends Component<{ group?: GroupShape }> {
    constructor(props) {
        super(props);

    }

    public render() {
        const rotate = (e) => this.props.group.rotateAngle = Number(e.target.value)
        const scale = (e) => this.props.group.scaleFactor = Number(e.targer.value)
        const writeMtx = (e, row, col) => this.props.group.matrix4d[row][col] = Number(e.target.value)
        if (this.props.group !== undefined) {
            return (

                <div className="right-bar-group">
                    <TextField
                        id="outlined-number"
                        label="Угол поворота"
                        type="number"
                        margin="dense"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        onInput={rotate}
                    />
                    <TextField
                        id="outlined-number"
                        label="Перемещение по Z"
                        type="number"
                        margin="dense"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        onInput={rotate}
                    />
                    <TextField
                        id="outlined-number"
                        label="Масштабирование"
                        type="number"
                        margin="dense"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"

                    />
                    <ButtonGroup size="small" color="primary" aria-label="outlined primary button group">
                        <Button>По горизонтали</Button>
                        <Button>По вертикали</Button>
                    </ButtonGroup>
                    <div className="matrix">
                        <p>Матрица 3D</p>
                        <div className="mtx-line">

                            <input type="number" onInput={e => writeMtx(e, 0, 0)} />
                            <input type="number" onInput={e => writeMtx(e, 0, 1)} />
                            <input type="number" onInput={e => writeMtx(e, 0, 2)} />
                            <input type="number" onInput={e => writeMtx(e, 0, 3)} />

                        </div>
                        <div className="mtx-line">
                            <input type="number" onInput={e => writeMtx(e, 1, 0)} />
                            <input type="number" onInput={e => writeMtx(e, 1, 1)} />
                            <input type="number" onInput={e => writeMtx(e, 1, 2)} />
                            <input type="number" onInput={e => writeMtx(e, 1, 3)} />

                        </div>
                        <div className="mtx-line">
                            <input type="number" onInput={e => writeMtx(e, 2, 0)} />
                            <input type="number" onInput={e => writeMtx(e, 2, 1)} />
                            <input type="number" onInput={e => writeMtx(e, 2, 2)} />
                            <input type="number" onInput={e => writeMtx(e, 2, 3)} />

                        </div>
                        <div className="mtx-line">
                            <input type="number" onInput={e => writeMtx(e, 3, 0)} />
                            <input type="number" onInput={e => writeMtx(e, 3, 1)} />
                            <input type="number" onInput={e => writeMtx(e, 3, 2)} />
                            <input type="number" onInput={e => writeMtx(e, 3, 3)} />

                        </div>
                    </div>
                    <br />
                    <Button onClick={e => this.props.group.applyMatrix()} size="small" variant="outlined">Применить</Button>
                </div>
            )
        }
        else {
            return (
                <div></div>
            )
        }

    }
}
