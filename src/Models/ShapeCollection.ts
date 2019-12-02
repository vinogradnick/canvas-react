import { IShape } from "./IShape";
import { observable, action, computed } from 'mobx';
import { LineShape } from "./Shapes/LineShape";
import Point3D from "./Point3D";
import { PAGE_SIZE } from "./const";
import { ShapeType } from "./ShapeType";
import { tsExpressionWithTypeArguments } from "@babel/types";
import { Camera3d } from "./Camera";
import { Matrix } from "./Matrix";

export class ShapeCollection {
    @observable collection: Array<IShape>;

    constructor(shapes: Array<IShape> = []) {
        this.collection = observable(shapes);
    }

    @action public addItem = (...shapes: IShape[]) =>
        this.collection.push(...shapes);

    @computed get getGroupList() {
        return this.collection.filter(item => item.type === ShapeType.GROUP);
    }

    @computed get getLineList() {
        return this.collection.filter(item => item.type === ShapeType.LINE);

    }

    @computed get getSelectLines() {
        return this.collection.filter(item => item.type === ShapeType.LINE && item.isFocused);
    }

    @computed get getSelectedGroupes() {
        return this.collection.filter(item => item.type === ShapeType.GROUP && item.isFocused);

    }
    @action projection() {
        return this.collection.forEach(item => {
            const mtx = Camera3d.rotationMatrix;
            console.log(mtx);
            const p = Matrix.convertToPoints(Matrix.transform(Matrix.convertToMatrix(...item.points), mtx));
            item.points = [p[0], p[1]];
        })
    }

    @action public removeItem = (key: string) =>
        this.collection = this.collection.filter(item => item.key !== key);

    @action removeSelected = () =>
        this.collection = this.collection.filter(item => !item.isFocused);

    @action
    public focus(key: string) {
        const item = this.findItem(key);
        item.focus();

    }

    @computed get maxAndMinPoint() {
        const min = this.collection.map((item: IShape) => item.points);
        const arrShapes = [];
        for (let i = 0; i < min.length; i++) {
            arrShapes.push(...min[i]);
        }
        let minX = PAGE_SIZE.WIDTH;
        let minY = PAGE_SIZE.HEIGHT;
        let minZ = PAGE_SIZE.HEIGHT;
        let maxX = 0;
        let maxY = 0;
        let maxZ = 0;
        for (let j = 0; j < arrShapes.length; j++) {
            if (arrShapes[j].x > maxX) {
                maxX = arrShapes[j].x;
            }
            if (arrShapes[j].y > maxY) {
                maxY = arrShapes[j].y;
            }
            if (arrShapes[j].x < minX) {
                minX = arrShapes[j].x;
            }
            if (arrShapes[j].y < minY) {
                minY = arrShapes[j].y;
            }
            if (arrShapes[j].minZ < minZ)
                minZ = arrShapes[j].z;

            if (arrShapes[j].maxZ < maxZ)
                maxZ = arrShapes[j].z;
        }
        return { minX, minY, maxX, maxY, maxZ, minZ };

    }

    public findItem = (key: string) => this.collection.find(item => item.key === key);
}

