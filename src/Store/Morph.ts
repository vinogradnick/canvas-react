import { IShape } from "../Models/IShape";
import { GroupShape } from "../Models/Shapes/GroupShape";
import Point3D from "../Models/Point3D";
import { LineShape } from "../Models/Shapes/LineShape";
export class Morph {
    constructor(public f: GroupShape, public s: GroupShape) {
    }
    morph() {
        const linesF = [...this.f.children.collection];
        const linesS = [...this.s.children.collection];
        const groupList = [];
        for (let tEval = 0; tEval < 1; tEval += 0.05) {
            const newLine = (linesF.map((item, idx) => new LineShape([this.morphVal(item.points[0], linesS[idx].points[0], tEval),
            this.morphVal(item.points[1], linesS[idx].points[1], tEval)])) as IShape[]);
            groupList.push(...newLine);
        }
        return [new GroupShape(null, ...groupList)];
    }
    morphVal(p1, p2, tValue) {
        return new Point3D(this.morp(p1.x, p2.x, tValue), this.morp(p1.y, p2.y, tValue), this.morp(p1.z, p2.z, tValue));
    }
    morp(xStart, xEnd, tVal) {
        return xStart * (1 - tVal) + xEnd * tVal;
    }
}
