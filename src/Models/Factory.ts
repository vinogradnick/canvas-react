import { IShape } from "./IShape";
import { LineShape } from "./Shapes/LineShape";
import { GroupShape } from "./Shapes/GroupShape";
import { ShapeStore } from "../Store/ShapeStore";
import Point3D from "./Point3D";

export class FigureFactory {

    constructor() {

    }
    public static CreateLine = (shape: any): LineShape =>

        new LineShape(FigureFactory.createPoints(shape));
    public static createPoints = (arrayJsonPoints: any) => {
        console.log(arrayJsonPoints);
        return arrayJsonPoints.map(item => new Point3D(item._x, item._y, item._z))
    }
    public static CreateGroupShape = (jsonGroup: any): GroupShape => {

        const nArr: IShape[] = [];
        console.log(jsonGroup);
        jsonGroup.children.collection.forEach(element => {
            if (element.type === 1) {
                nArr.push(FigureFactory.CreateGroupShape(element));
            }
            else {
                console.log('is line ==========');
                nArr.push(FigureFactory.CreateLine(element._points));
            }
        });
        const group = new GroupShape(null, ...nArr);
        group.points = FigureFactory.createPoints(jsonGroup.points);
        return group;
    }
    public static CreateStore(storeJSON: any) {
        const group = FigureFactory.CreateGroupShape(storeJSON.store);
        return new ShapeStore(group);
    }

}
