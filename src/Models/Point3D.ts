import { PAGE_SIZE } from "./const";
import { observable, computed, action } from 'mobx';

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

    set setY(num: number) {
        this._y = (num + (PAGE_SIZE.HEIGHT / 2))
    }

    set setX(num: number) {
        this._x = (num + (PAGE_SIZE.WIDTH / 2));
    }

    public static centerPoint = (start: Point3D, end: Point3D) =>
        new Point3D((start._x + end._x) / 2, (start._y + end._y) / 2)

    public equal = (point: Point3D) => point._x == point._x && point._y === point._y && this._z === point._z;
    public lenBetween = (point: Point3D) => Math.sqrt(Math.pow(point._x - this._x, 2) + Math.pow(point._y - this._y, 2))
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
        return this._z;
    }

    set setZ(z: number) {
        this._z = z;
    }


    get toString() {
        return `${this.getX} ${this.getY} ${this.getZ}`;
    };

}
