import Point3D from "../Point3D";
import { PAGE_SIZE } from "../const";

export const Bis = (...points: Point3D[]) => {
    const [a, b, c] = points;
    console.log(points);
    const k1 = Math.sqrt(Math.pow(b.getX - a.getX, 2) + Math.pow(b.getY - a.getY, 2));
    const k2 = Math.sqrt(Math.pow(c.getX - a.getX, 2) + Math.pow(c.getY - a.getY, 2))
    const lambda = k1 / k2;
    const xNew = (b.getX + (lambda * c.getX)) / (1 + lambda);
    const yNew = (b.getY + (lambda * c.getY)) / (1 + lambda);

    return new Point3D(xNew + PAGE_SIZE.WIDTH / 2, -1 * yNew + PAGE_SIZE.HEIGHT / 2);
}
export const Height = (...points: Point3D[]) => {
    const [a, b, c] = points;
    const rk = [b.getX - a.getX, b.getY - a.getY];
    const bcMX = (c.getX - b.getX);
    const bcMY = (c.getY - b.getY);

    const kk =
        (((b.getX - a.getX) * bcMX) +
            ((b.getY - a.getY) * bcMY)) /
        (Math.pow(bcMX, 2) + Math.pow(bcMY, 2));
    const res = [b.getX - (kk * bcMX), b.getY - (kk * bcMY)];

    const p = new Point3D(res[0] + (PAGE_SIZE.WIDTH / 2), (PAGE_SIZE.HEIGHT / 2) - res[1]);
    console.log(p._x);
    console.log(p._y);

    return p;
}