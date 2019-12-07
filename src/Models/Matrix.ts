import Point3D from "./Point3D";
import { PAGE_SIZE } from "./const";

export class Matrix {


    public static convertToMatrix(...points: Point3D[]): Array<number[]> {
        const arr: Array<number[]> = [];
        points.forEach(item => arr.push([item.x, item.y, item.z, 1]));

        return arr;
    }


    public static pointNormalize = (...arr: number[]) => {
        return (arr[0] / arr[1]) + arr[2]
    }

    public static convertToPoints = (arr) =>
        arr.map((matrix, idx) =>
            new Point3D(Matrix.pointNormalize(arr[idx][0], arr[idx][3], 0), Matrix.pointNormalize(arr[idx][1], arr[idx][3], 0), Matrix.pointNormalize(arr[idx][2], arr[idx][3], 0))
        )

    /**
     * Матрица трансформации
     * @param m1 
     * @param m2 
     */

    public static transform(m1: Array<number[]>, m2: Array<number[]>) {

        const out = [];
        console.log(m1);
        console.log(m2);
        for (let i = 0; i < m1.length; i++) {
            out.push([0, 0, 0, 0]);
        }
        for (let i = 0; i < m1.length; i++) {
            for (let j = 0; j < m2[0].length; j++) {
                for (let m = 0; m < m1[0].length; m++) {

                    out[i][j] += m1[i][m] * m2[m][j];
                }
            }
        }
        console.log(out);
        return out;
    }
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
    public static GroupMorphing(points: Point3D[], m2: Point3D[]) {

    }

    /**
     * @param xAngle Вращение вокруг Y
     * @param yAngle Вращение вокруг X
     * @param persectiveDistance Дальность перспективы
     */
    public static RotateMatrix = (xAngle, yAngle, persectiveDistance): Array<number[]> => {


        return [
            [Math.cos(xAngle), Math.sin(xAngle) * Math.sin(yAngle), 0, -1 * (Math.sin(xAngle) * Math.cos(yAngle)) / persectiveDistance],
            [0, Math.cos(yAngle), 0, (-1 * Math.sin(yAngle)) / persectiveDistance],
            [Math.sin(xAngle), -1 * (Math.sin(yAngle) * Math.cos(xAngle)), 0, (-1 * (Math.sin(yAngle) * Math.cos(xAngle))) / persectiveDistance],
            [0, 0, 0, 1]
        ]
    }

}