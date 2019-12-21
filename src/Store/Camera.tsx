import {observable, action, computed, IObservableValue} from 'mobx';
import Point3D from '../Models/Point3D';
import {Matrix} from '../Models/Matrix';
import {ACTIVE_CSS, LOCAL} from '../Models/const';

export interface ICameraPos {
    xAngle: number;
    yAngle: number;
    distance: number;
}

export class Camera {
    @observable cameraPosition: IObservableValue<ICameraPos>;
    @observable isActive: IObservableValue<boolean>;
    @observable point: IObservableValue<Point3D>;

    constructor() {
        const pos: ICameraPos = {xAngle: 0, yAngle: 0, distance: 11};
        this.cameraPosition = observable.box(pos);
        this.isActive = observable.box(false);
        this.point = observable.box(new Point3D(0, 0, 0))

    }

    get cameraFovTop() {
        return LOCAL.getWidth / Matrix.rad(35);
    }

    get cameraFovLeft() {
        return LOCAL.getHEIGHT / Matrix.rad(35);
    }

    @computed get xPosition() {
        return this.point.get().x;

    }

    @computed get yPosition() {
        return this.point.get().y;

    }

    @computed get zPosition() {
        return this.point.get().z;

    }

    @computed get active() {
        return this.isActive.get();
    }

    @computed get CameraGet() {
        return ACTIVE_CSS ? `${this.cameraPosition.get().xAngle == 0 ? '' : `rotateX(${this.cameraPosition.get().xAngle}deg)`} 
                    ${this.cameraPosition.get().yAngle == 0 ? '' : `rotateZ(${this.cameraPosition.get().yAngle}deg)`} `
            : "";
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

    @computed get rotationMatrix() {
        return Matrix.RotateMatrix(
            this.xAngle,
            this.yAngle,
            this.zDistance
        )
    }

    @action
    public load(camera: any) {
        this.cameraPosition = observable.box(camera.cameraPosition);
    }

    @action Update(camera: any) {
        this.cameraPosition = observable.box(camera.cameraPosition)
    }


}

export type $Camera = { camera: Camera };
