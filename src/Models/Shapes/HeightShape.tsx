import { LineShape } from "./LineShape";
import Point3D from "../Point3D";

export default class HeightShape extends LineShape {
    constructor(points: Point3D[]) {
        super(points);
    }
}