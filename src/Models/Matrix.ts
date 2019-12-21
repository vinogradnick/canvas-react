import Point3D from "./Point3D";
import {LOCAL} from "./const";

export class Matrix {


    public static convertToMatrix = (...points: Point3D[]): Array<number[]> =>

        points.map(item => [item.getX, item.getY, item.getZ, 1]);


    public static pointNormalize = (...arr: number[]) => {
        return arr[0] / arr[1]
    }

    public static convertToPoints = (arr) =>
        arr.map((matrix, idx) =>
            new Point3D((arr[idx][0] / matrix[3]) + LOCAL.CENTER_WIDTH, -1 * ((arr[idx][1] / matrix[3]) + LOCAL.CENTER_HEIGHT), arr[idx][2], 1)
        )


    public static rad = (x: number) => (x * 180) / Math.PI;


    public static Morphing(points: Point3D[], t: number, pEnd: Point3D[]) {
        return points.map((point, idx) =>
            new Point3D(
                Matrix.operation(
                    point.x, pEnd[idx].x, t)
                ,
                Matrix.operation(
                    point.y, pEnd[idx].y, t)
                ,
                Matrix.operation(
                    point.z, pEnd[idx].z, t)
            ));
    }

    public static multiplyMatrix(A, B) {
        var rowsA = A.length, colsA = A[0].length,
            rowsB = B.length, colsB = B[0].length,
            C = [];

        if (colsA != rowsB) return false;

        for (var i = 0; i < rowsA; i++) C[i] = [];

        for (var k = 0; k < colsB; k++) {
            for (var i = 0; i < rowsA; i++) {
                var temp = 0;
                for (var j = 0; j < rowsB; j++)
                    temp += A[i][j] * B[j][k];
                C[i][k] = temp;
            }
        }

        return C;
    }

    public static operation = (v1: number, v2: number, t: number) => (v1 * t + v2 * t) / 10;

    /**
     * @param xAngle Вращение вокруг Y
     * @param yAngle Вращение вокруг X
     * @param persectiveDistance Дальность перспективы
     */
    public static RotateMatrix = (u, o, persectiveDistance) =>
        [
            [Math.cos(u), Math.sin(u) * Math.sin(o), 0, -1 * (Math.sin(u) * Math.cos(o)) / persectiveDistance],
            [0, Math.cos(o), 0, (-1 * Math.sin(o)) / persectiveDistance],
            [Math.sin(u), -1 * (Math.sin(o) * Math.cos(u)), 0, (-1 * (Math.cos(o) * Math.cos(u))) / persectiveDistance],
            [0, 0, 0, 1]
        ]

}
