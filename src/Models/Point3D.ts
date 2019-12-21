import { LOCAL } from "./const";
import { observable, computed, action, IObservableValue } from 'mobx';
import { app } from "./Application";
import { Matrix } from "./Matrix";

export default class Point3D {
    @observable _x: IObservableValue<number>;
    @observable _y: IObservableValue<number>;
    @observable _z: IObservableValue<number>;
    constructor(_x: number, _y: number, _z: number = 0, public _w: number = 1) {
        this._x = observable.box(_x);
        this._y = observable.box(_y);
        this._z = observable.box(_z);
    }

    @computed get x() {
        return this._x.get();
    }

    @computed get y() {
        return this._y.get();
    }

    @computed get z() {
        return this._z.get();
    }

    @computed get getX() {
        return this.x - LOCAL.CENTER_WIDTH;
    }
    @computed get d2() {
        return [this.x, this.y, 1];
    }
    @computed get getY() {
        return -1 * (this.y - LOCAL.CENTER_HEIGHT);
    }

    set setY(num: string) {
        this._y.set(-1 * (Number(num) + LOCAL.CENTER_HEIGHT));
    }

    set setX(num: string) {
        this._x.set((Number(num) + LOCAL.CENTER_WIDTH));
    }

    /**
     * Нахождение центра между двумя точками
     * @param start Первая точка
     * @param end Вторая точка
     */

    public static centerPoint = (start: Point3D, end: Point3D) =>
        new Point3D((start.x + end.x) / 2, (start.y + end.y) / 2)
    /**
     * Проверка линии на пересечение
     * @param point
     */
    public equal = (point: Point3D) =>
        point.x === point.x && point.y === point.y

    public lenBetween = (point: Point3D) =>
        Math.sqrt(Math.pow(point.x - this.x, 2) + Math.pow(point.y - this.y, 2))
    public minus = (point: Point3D) => {
        this._x.set(this.x - point.x);
        this._y.set(this.y - point.y);
        return this;
    }
    /**
     * Сложение точки данной точкой
     * @param point позиция точки
     */
    public plus = (point: Point3D) => {
        this._x.set(this.x + point.x);
        this._y.set(this.y + point.y);
        return this;
    }

    /**
     * Вычитание точки данной точки
     * @param point позиция точки
     */
    public static subtraction = (f: Point3D, s: Point3D) => new Point3D(f.x - s.x, f.y - s.y);

    public get stringify() {
        return `${this._x.get()} ${this._y.get()}`;
    }

    public get matrix() {
        return [this.getX, this.getY, this.z, 1];
    }

    public static sort(a: Point3D, b: Point3D) {
        if (a._x.get() > b._x.get()) {
            if (a._y > b._y) {
                return 1;
            } else {

            }
        }
    }
    get matrix2d() {
        return [this.getX, this.getY, 1]
    }


    @computed get getZ() {
        return this._z.get();
    }

    set setZ(num: string) {
        this._z.set(Number(num));
    }

    /**
     * Проецирование точек в 2D
     */
    get projection() {
        const arr = [this.matrix];
        const mtx = app.cameraInstance.rotationMatrix;
        let res = Matrix.multiplyMatrix(arr, mtx);
        res = [...res[0]]
        console.log(res);
        return new Point3D((res[0] / res[3]) + LOCAL.CENTER_WIDTH, (res[1] / res[3]) + LOCAL.CENTER_HEIGHT, 0);
    }



}
