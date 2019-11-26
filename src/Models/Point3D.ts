import {IPoint} from "./IPoint";
import {PAGE_SIZE} from "./const";

export default class Point3D implements IPoint<Point3D> {

    constructor(public x: number, public y: number, public z: number = 0) {

    }


    get getX() {
        return this.x - (PAGE_SIZE.WIDTH / 2);
    }

    get getY() {
        return -1 * (this.y - (PAGE_SIZE.HEIGHT / 2));
    }

    set setY(num: number) {
        this.y = (num + (PAGE_SIZE.HEIGHT / 2))
    }

    set setX(num: number) {
        this.x = (num + (PAGE_SIZE.WIDTH / 2));
    }

    public static centerPoint = (start: Point3D, end: Point3D) =>
        new Point3D((start.x + end.x) / 2, (start.y + end.y) / 2)

    public equal = (point: Point3D) => point.x == point.x && point.y === point.y && this.z === point.z;
    public lenBetween = (point: Point3D) => Math.sqrt(Math.pow(point.x - this.x, 2) + Math.pow(point.y - this.y, 2))
    public minus = (point: Point3D) => {
        this.x -= point.x;
        this.y -= point.y;
        return this;
    }
    public plus = (point: Point3D) => {
        this.x += point.x;
        this.y += point.y;
        return this;
    }
    public static subtraction = (f: Point3D, s: Point3D) => new Point3D(f.x - s.x, f.y - s.y);

    public get stringify() {
        return `${this.x} ${this.y}`;
    }


    public static sort(a: Point3D, b: Point3D) {
        if (a.x > b.x) {
            if (a.y > b.y) {
                return 1;
            } else {

            }
        }
    }

    get convert() {
        return new Point3D(this.x, this.y, 0);
    }

    get getZ() {
        return this.z;
    }

    set setZ(z: number) {
        this.z = z;
    }


    get toString() {
        return `${this.getX} ${this.getY} ${this.getZ}`;
    };

}
