import { observable, action, computed, IObservableValue } from 'mobx';
import Point3D from './Point3D';
import { Matrix } from './Matrix';
import { shapeStore } from '../Store/ShapeStore';

export interface ICameraPos {
    xAngle: number;
    yAngle: number;
    distance: number;
}

export class Camera {
    @observable cameraPosition: IObservableValue<ICameraPos>;

    constructor() {
        const pos: ICameraPos = { xAngle: 0, yAngle: 0, distance: 1 };
        this.cameraPosition = observable.box(pos);

    }
    @computed get CameraGet() {
        return `${this.cameraPosition.get().xAngle == 0 ? '' : `rotateX(${this.cameraPosition.get().xAngle}deg)`} 
        ${this.cameraPosition.get().yAngle == 0 ? '' : `rotateY(${this.cameraPosition.get().yAngle}deg)`}
        `
    }

    @computed get rotationMatrix() {
        return Matrix.RotateMatrix(
            this.cameraPosition.get().xAngle,
            this.cameraPosition.get().yAngle,
            this.cameraPosition.get().distance
        )
    }
    @action public rotateAsix(rotate: string) {
        console.log(rotate);
        switch (rotate) {
            case 'w':

                this.cameraPosition.set({
                    xAngle: this.cameraPosition.get().xAngle,
                    yAngle: this.cameraPosition.get().yAngle + 0.05,
                    distance: this.cameraPosition.get().distance
                })
                shapeStore.moveProjection();

                return;
            case 's':
                this.cameraPosition.set({
                    xAngle: this.cameraPosition.get().xAngle,
                    yAngle: this.cameraPosition.get().yAngle - 0.05,
                    distance: this.cameraPosition.get().distance
                })
                shapeStore.moveProjection();

                return;
            case "a":
                this.cameraPosition.set({
                    xAngle: this.cameraPosition.get().xAngle - 0.05,
                    yAngle: this.cameraPosition.get().yAngle,
                    distance: this.cameraPosition.get().distance
                })
                shapeStore.moveProjection();

                return;
            case 'd':
                this.cameraPosition.set({
                    xAngle: this.cameraPosition.get().xAngle + 0.05,
                    yAngle: this.cameraPosition.get().yAngle,
                    distance: this.cameraPosition.get().distance
                })
                shapeStore.moveProjection();

                return;

        }
    }
}
export const Camera3d = new Camera();