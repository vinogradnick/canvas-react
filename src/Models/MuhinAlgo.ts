import Point3D from "./Point3D";
import { Matrix } from "./Matrix";
import { toJS } from 'mobx';

export class MuhinAlgo {
    private finalArr: Point3D[];
    private triangle: Point3D[][];
    constructor(...points: Point3D[]) {
        return this.calc(points);
    }
    private initVector(points: Point3D[]) {
        const vectorArr = [];
        for (let i = 0; i < points.length - 1; i++) {
            vectorArr.push(new Vector(points[i + 1], points[i], i, i + 1))
        }
        vectorArr.push(new Vector(points[0], points[points.length - 1], points.length - 1, 0));
        return vectorArr;
    }
    private calc(points: Point3D[]) {
        const vectorList = this.initVector(points);
        console.table(vectorList);
        const vectorShare = this.vectorPointShare(points, vectorList);
        const problemArr = vectorShare.filter(item => !item.isValid);
        const tempArr = [];
        if (problemArr.length == 0) {
            const f = this.flex(points);
            const triangles = [];
            points.push(new Point3D(f.x, f.y))
            for (let i = 0; i < points.length - 1; i += 3) {
                triangles.push(points.length - 1, i, i + 1)
            }
            return triangles;
        }
        console.log(problemArr);

        problemArr.forEach(item => {

            const rotate = this.rotateMatrix(item.v1);
            points.forEach(fl => console.log(toJS(fl)))
            const ttr = this.translatePointArr(points, item.point).map(dataArr => dataArr.d2);
            console.log(ttr);
            const end: any = Matrix.multiplyMatrix(ttr, rotate);

            console.log(end);
            points = end.map((flex, id) => {
                return new Point3D(this.fix(flex[0]), this.fix(flex[1]))
            })

            const data = points.filter(flex => flex.y === 0);
            const y2 = data[1].y;
            const y1 = data[0].y;
            const x2 = data[1].x;
            const x1 = data[0].x;
            const A = y2 - y1
            const C = y1 * x1 - x1 * y2 + x2 * y1 - x1 * y1;
            const x = -C / A;
            const m = Matrix.multiplyMatrix([[x, 0, 1]], this.rotateMatrixBack(item.v1));

            const p = new Point3D(m[0][1], m[0][1]);
            const backRotate = Matrix.multiplyMatrix([...points.map(datFlx => datFlx.d2)], this.rotateMatrixBack(item.v1));
            console.log(backRotate);
            points.forEach((it, idx) => {
                it._x.set(backRotate[idx][0])
                it._y.set(backRotate[idx][1]);
            })
            points = this.translatePointArrBack(points, item.point);
            p.plus(item.point);
            tempArr.push(p);
            console.log('-------------SECOND-STEP--------------')
        })

        return this.calc([...points, ...tempArr]);
    }
    private flex(points: Point3D[]) {
        let x = 0;
        let y = 0;
        points.forEach(item => {
            x += item.x;
            y += item.y;
        })
        return { x: x / points.length, y: y / points.length };
    }

    public rotateMatrix(vector: Vector) {
        
        const cos = (vector.value[0] * 1 + vector.value[1] * 0) / (Math.sqrt(Math.pow(vector.value[0], 2) + Math.pow(vector.value[1], 2)) * Math.sqrt(1 + 0))
        const sin = Math.sqrt((1 - Math.pow(cos, 2)));
        console.log(cos);
        console.log(sin);
        return [[cos, -sin, 0], [sin, cos, 0], [0, 0, 1]]
    }
    public translatePointArr(points: Point3D[], point: Point3D) {
        const ar = [];
        for (let i = 0; i < points.length; i++) {
            ar.push(new Point3D(points[i].x - point.x, points[i].y - point.y))
        }
        return ar;
    }
    public rotateMatrixBack(vector: Vector) {
        const cos = (vector.value[0] * 1 + vector.value[1] * 0) / (Math.sqrt(Math.pow(vector.value[0], 2) + 1) * Math.sqrt(Math.pow(vector.value[1], 2) + 0))
        const sin = Math.sqrt((1 - Math.pow(cos, 2)));

        return [[cos, sin, 0], [-sin, cos, 0], [0, 0, 1]]
    }
    public translatePointArrBack(points, point: Point3D) {
        return points.map(item => item.plus(point));
    }
    public validVectors(vectors: VectorPointShare) {

    }
    static Traingulate(...points) {
        const algo = new MuhinAlgo(...points);

    }
    private vectorPointShare(points, vector: Vector[]) {
        const arr = [new VectorPointShare(vector[vector.length - 1], vector[0], points[0])];
        for (let i = 0; i < points.length - 1; i++) {
            arr.push(new VectorPointShare(vector[i], vector[i + 1], points[i]))
        }
        return arr;
    }
    private fix(data: number) {
        console.log(data);
        return Number(data.toFixed(3))
    }
}
export class Vector {

    constructor(public p1, public p2, public i1, public i2) {

    }
    get value() {

        return [this.p1.x - this.p2.x, this.p1.y - this.p2.y]
    }

}
export class VectorPointShare {
    constructor(public v1: Vector, public v2: Vector, public point: Point3D) {

    }
    get isValid() {

        const part1 = this.v1.value[0] * this.v2.value[1];
        const part2 = this.v1.value[1] * this.v2.value[0];

        const data = (part1 + (-1 * part2)) >= 0;

        return data;
    }
}