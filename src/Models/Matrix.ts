import Point3D from "./Point3D";

export class Matrix {


    public static convertToMatrix(...points: Point3D[]): Array<number[]> {
        const arr: Array<number[]> = [];
        points.forEach(item => arr.push([item.x, item.y, item.z, 1]));
        arr.push([0, 0, 0, 1]);
        return arr;
    }

    public static convertToPoints = (arr) =>
        arr.map((matrix, idx) =>
            new Point3D(Math.abs(arr[idx][0]), Math.abs(arr[idx][1]), Math.abs(arr[idx][2]))
        )

    /**
     * Матрица трансформации
     * @param m1 
     * @param m2 
     */

    public static transform(m1: Array<number[]>, m2: Array<number[]>) {
        "use asm";
        const out = [];

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
        return out;
    }

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
            [Math.cos(xAngle), Math.sin(xAngle) * Math.sin(yAngle), 0, (Math.sin(xAngle) * Math.cos(yAngle)) / persectiveDistance],
            [0, Math.cos(yAngle), 0, (-1 * Math.sin(yAngle)) / persectiveDistance],
            [Math.sin(xAngle), -1 * (Math.sin(yAngle) * Math.cos(xAngle)), 0, (-1 * (Math.sin(yAngle) * Math.cos(xAngle))) / persectiveDistance],
            [0, 0, 0, 1]
        ]
    }

}