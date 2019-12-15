import { PAGE_SIZE } from "./const";
import { observable, computed, action } from 'mobx';
import { app } from "./Application";
import { Matrix } from "./Matrix";

export default class Point3D {

    constructor(public _x: number, public _y: number, public _z: number = 0, public _w: number = 1) {

    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    get z() {
        return this._z;
    }

    get getX() {
        return this._x - (PAGE_SIZE.WIDTH / 2);
    }

    get getY() {
        return -1 * (this._y - (PAGE_SIZE.HEIGHT / 2));
    }

    set setY(num: string) {
        this._y = -1 * (Number(num) + (PAGE_SIZE.HEIGHT / 2))
    }

    set setX(num: string) {

        this._x = (Number(num) + (PAGE_SIZE.WIDTH / 2));
    }

    public static centerPoint = (start: Point3D, end: Point3D) =>
        new Point3D((start._x + end._x) / 2, (start._y + end._y) / 2)

    public equal = (point: Point3D) =>
        point._x == point._x && point._y === point._y && this._z === point._z;
    public lenBetween = (point: Point3D) =>
        Math.sqrt(Math.pow(point._x - this._x, 2) + Math.pow(point._y - this._y, 2))
    public minus = (point: Point3D) => {
        this._x -= point._x;
        this._y -= point._y;
        return this;
    }
    public plus = (point: Point3D) => {
        this._x += point._x;
        this._y += point._y;
        return this;
    }
    public static subtraction = (f: Point3D, s: Point3D) => new Point3D(f._x - s._x, f._y - s._y);

    public get stringify() {
        return `${this._x} ${this._y}`;
    }
    public get matrix() {
        return [this.getX, this.getY, this._z, 1];
    }

    public static sort(a: Point3D, b: Point3D) {
        if (a._x > b._x) {
            if (a._y > b._y) {
                return 1;
            } else {

            }
        }
    }

    get convert() {
        return new Point3D(this._x, this._y, 0);
    }

    get getZ() {
        return this._z - (PAGE_SIZE.HEIGHT / 2);
    }

    set setZ(num: string) {
        this._z = Number(num);
    }
    get projection() {
        const arr = [this.matrix];
        const mtx = app.cameraInstance.rotationMatrix;
        let res = Matrix.multiplyMatrix(arr, mtx);
        res = [...res[0]]
        console.log(res);
        return new Point3D((res[0] / res[3]) + PAGE_SIZE.WIDTH / 2, (res[1] / res[3]) + PAGE_SIZE.HEIGHT / 2, 0);
    }


    get toString() {
        return `${this.getX} ${this.getY} ${this.getZ}`;
    };

}
