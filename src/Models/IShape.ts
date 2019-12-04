import { ShapeType } from "./ShapeType";
import Point3D from "./Point3D";

export interface IShape {
    type: ShapeType;
    key: string;
    points: Array<Point3D>;
    Component: JSX.Element;
    ListViewComponent: JSX.Element;
    isFocused: boolean;
    focus: () => void;
    move: (...points: Point3D[]) => void;



}

