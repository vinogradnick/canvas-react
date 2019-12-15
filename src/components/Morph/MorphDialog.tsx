import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { observer, inject } from 'mobx-react';
import { ShapeStore } from '../../Store/ShapeStore';


@observer
@inject('shapeStore')
export default class MorphDialog extends Component<{ shapeStore?: ShapeStore }> {
    constructor(props) {
        super(props);

    }
    componentDidMount() {
        console.log('mount');
    }
    render() {
        const handleClose = () => {
            this.props.shapeStore.morphDialog.set(false);
        };
        return (
            <div>

                <Dialog
                    open={this.props.shapeStore.morphDialog.get()}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Let Google help apps determine location. This means sending anonymous location data to
                            Google, even when no apps are running.
          </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Disagree
          </Button>
                        <Button onClick={handleClose} color="primary" autoFocus>
                            Agree
          </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}
