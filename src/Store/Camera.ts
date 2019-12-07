import { observable, action, computed, IObservableValue } from 'mobx';
import Point3D from '../Models/Point3D';
import { Matrix } from '../Models/Matrix';
import { ShapeStore, shapeStore } from './ShapeStore';

export interface ICameraPos {
    xAngle: number;
    yAngle: number;
    distance: number;
}

export class Camera {
    @observable cameraPosition: IObservableValue<ICameraPos>;
    @observable isActive: IObservableValue<boolean>;

    constructor() {
        const pos: ICameraPos = { xAngle: 0, yAngle: 0, distance: 2000 };
        this.cameraPosition = observable.box(pos);
        this.isActive = observable.box(false);

    }
    @computed get active() {
        return this.active.get();
    }
    @computed get CameraGet() {
        return `${this.cameraPosition.get().xAngle == 0 ? '' : `rotateX(${this.cameraPosition.get().xAngle}deg)`} 
        ${this.cameraPosition.get().yAngle == 0 ? '' : `rotateZ(${this.cameraPosition.get().yAngle}deg)`}
        `
    }
    @computed get xAngle() {
        return Matrix.rad(this.cameraPosition.get().xAngle);
    }
    @computed get yAngle() {
        return Matrix.rad(this.cameraPosition.get().yAngle);
    }
    @computed get zDistance() {
        return Matrix.rad(this.cameraPosition.get().distance);
    }
    @action setX(value: number) {
        this.isActive.set(true);
        this.cameraPosition.set({
            xAngle: value,
            yAngle: this.cameraPosition.get().yAngle,
            distance: this.cameraPosition.get().distance
        })
    }
    @action setY(value: number) {
        this.isActive.set(true);
        this.cameraPosition.set({
            xAngle: this.cameraPosition.get().xAngle,
            yAngle: value,
            distance: this.cameraPosition.get().distance
        })
    }
    @action setZ(value: number) {
        this.isActive.set(true);
        this.cameraPosition.set({
            xAngle: this.cameraPosition.get().xAngle,
            yAngle: this.cameraPosition.get().yAngle,
            distance: value
        })
    }

    public static CreateCamera(cameraJSON: any) {
        const camera = new Camera();
        camera.cameraPosition = observable.box(cameraJSON.cameraPosition);
        return camera;
    }
    @action public Update(camera: Camera) {

        this.cameraPosition = camera.cameraPosition;
    }
    @computed get rotationMatrix() {
        return Matrix.RotateMatrix(
            this.xAngle,
            this.yAngle,
            this.zDistance
        )
    }
    @action public load(camera: any) {
        this.cameraPosition = observable.box(camera.cameraPosition);

    }
    @action public rotateAsix(rotate: string) {
        console.log(rotate);

        switch (rotate) {
            case 'w':

                this.cameraPosition.set({
                    xAngle: this.cameraPosition.get().xAngle,
                    yAngle: this.cameraPosition.get().yAngle + 5,
                    distance: this.cameraPosition.get().distance
                })
                //shapeStore.moveProjection();

                return;
            case 's':
                this.cameraPosition.set({
                    xAngle: this.cameraPosition.get().xAngle,
                    yAngle: this.cameraPosition.get().yAngle - 5,
                    distance: this.cameraPosition.get().distance
                })
                // shapeStore.moveProjection();

                return;
            case "a":
                this.cameraPosition.set({
                    xAngle: this.cameraPosition.get().xAngle - 5,
                    yAngle: this.cameraPosition.get().yAngle,
                    distance: this.cameraPosition.get().distance
                })
                // shapeStore.moveProjection();

                return;
            case 'd':
                this.cameraPosition.set({
                    xAngle: this.cameraPosition.get().xAngle + 5,
                    yAngle: this.cameraPosition.get().yAngle,
                    distance: this.cameraPosition.get().distance
                })

                //shapeStore.moveProjection();
                return;

        }
    }
}

export let camera = new Camera();