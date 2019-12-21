import Point3D from "./Point3D";
import { LOCAL } from "./const";
import { computed } from 'mobx';
import * as THREE from 'three';

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

    const p = new Point3D(res[0] + LOCAL.CENTER_WIDTH, LOCAL.CENTER_HEIGHT - res[1]);
    console.log(p._x);
    console.log(p._y);

    return p;
};
export const Bis = (...points: Point3D[]) => {
    const [a, b, c] = points;
    console.log(points);
    const k1 = Math.sqrt(Math.pow(b.getX - a.getX, 2) + Math.pow(b.getY - a.getY, 2));
    const k2 = Math.sqrt(Math.pow(c.getX - a.getX, 2) + Math.pow(c.getY - a.getY, 2))
    const lambda = k1 / k2;
    const xNew = (b.getX + (lambda * c.getX)) / (1 + lambda);
    const yNew = (b.getY + (lambda * c.getY)) / (1 + lambda);

    return new Point3D(xNew + LOCAL.CENTER_WIDTH, -yNew + LOCAL.CENTER_HEIGHT);
}
export function rndColor() {
    return "#" + ((1 << 24) * Math.random() | 0).toString(16)
};
export const rdBis = (x, y) => {
    const a = new Function('x,y', "return " + eval)
    const res = a(x, y);
}
export const pBis = (line1, line2) => {
    const [p1, p2] = line1.points;
    const [p3, p4] = line2.points;

    const x = ((((p1.getX * p2.getY) - (p1.getY * p2.getX)) * (p3.getX - p4.getX)) - ((p1.getX - p2.getX) * (p3.getX * p4.getY - p3.getY * p4.getX))) /
        (((p1.getX - p2.getX) * (p3.getY - p4.getY)) - ((p3.getX - p4.getX) * (p1.getY - p2.getY)));
    const y = ((((p1.getX * p2.getY) - (p1.getY * p2.getX)) * (p3.getY - p4.getY)) - ((p1.getY - p2.getY) * (p3.getX * p4.getY - p3.getY * p4.getX))) /
        (((p1.getX - p2.getX) * (p3.getY - p4.getY)) - ((p3.getX - p4.getX) * (p1.getY - p2.getY)));
    console.log(x);
    console.log(y);
    return new Point3D(x + LOCAL.CENTER_WIDTH, -y + LOCAL.CENTER_HEIGHT, 0);
}

export class ColorR {
    constructor(public r: number, public g: number, public b: number) {

    }
    private componentToHex(c) {
        const hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }
    @computed get hex() {
        return new THREE.Color(this.rgbToHex(this.r, this.g, this.b));
    }
    private rgbToHex(r, g, b) {
        return '#' + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
    }
    get rbga() {
        return `rgb(${this.r},${this.g},${this.b}`;
    }
    static Morph(c1: ColorR, c2: ColorR, tval) {
        return new ColorR(ColorR.mpx(c1.r, c2.r, tval), ColorR.mpx(c1.g, c2.g, tval), ColorR.mpx(c1.b, c2.b, tval))
    }
    static mpx(v1, v2, t) {
        return Math.floor(v1 * (1 - t) + v2 * t)
    }
}
