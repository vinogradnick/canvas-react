import {IShape} from "./IShape";
import {observable, action, computed, IObservableArray} from 'mobx';

import {LOCAL} from "./const";
import {ShapeType} from "./ShapeType";
import {Matrix} from "./Matrix";
import {app} from "./Application";
import {LineShape} from "./Shapes/LineShape";
import {GroupShape} from "./Shapes/GroupShape";

export class ShapeCollection {
    @observable collection: IObservableArray<IShape>;

    constructor(shapes: Array<IShape> = []) {
        this.collection = observable(shapes);
    }

    @computed get getCircles() {
        return this.collection.filter(item => item.type == ShapeType.CIRCLE);
    }

    @action public addItem = (...shapes: IShape[]) =>
        this.collection.push(...shapes);

    @computed get getGroupList() {
        return observable(this.collection.filter(item => item.type === ShapeType.GROUP) as Array<GroupShape>)
    }

    @computed get getLineList() {
        return observable(this.collection.filter(item => item.type === ShapeType.LINE) as LineShape[]);

    }

    @computed get getSelectLines() {
        return this.collection.filter(item => item.type === ShapeType.LINE && item.isFocused);
    }

    @computed get getSelectedGroupes() {
        return this.collection.filter(item => item.type === ShapeType.GROUP && item.isFocused);

    }

    @action projection() {
        return this.collection.forEach(item => {
            const oldP = [...item.points];
            const mtx = app.cameraInstance.rotationMatrix;
            console.log(mtx);
            const matrix = Matrix.convertToMatrix(...item.points);
            const p = Matrix.convertToPoints(Matrix.multiplyMatrix(matrix, mtx));
            console.table(p);
            item.move(p[0], p[1]);
            //item.move(...oldP.map(this.pointProjection));
        })
    }

    // @action pointProjection(p: Point3D) {
    //     const cameraView = camera.cameraPosition.get();
    //     const x = p.x * Math.cos(cameraView.xAngle) * p.z * Math.sin(cameraView.xAngle);
    //     const z = p.z * Math.cos(cameraView.xAngle) - p.x * Math.sin(cameraView.xAngle);
    //     const y = p.y * Math.cos(cameraView.yAngle) + z * Math.sin(cameraView.yAngle);
    //     const d = z * Math.cos(cameraView.yAngle) - p.z * Math.sin(cameraView.yAngle) + 40;
    //     const point = new Point3D(0, 0, 0);

    //     point._x = (K_VIEW / d) * x + PAGE_SIZE.WIDTH / 2;
    //     point._y = (K_VIEW / d) * y + PAGE_SIZE.HEIGHT / 2;
    //     console.log(point);
    //     return point;
    // }

    @action public removeItem = (key: string) =>
        this.collection = observable(this.collection.filter(item => item.key !== key));

    @action removeSelected = () =>
        this.collection = observable(this.collection.filter(item => !item.isFocused));

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
        let minX = LOCAL.getWidth;
        let minY = LOCAL.getHEIGHT;
        let minZ = LOCAL.getHEIGHT;
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
        return {minX, minY, maxX, maxY, maxZ, minZ};

    }

    public findItem = (key: string) => this.collection.find(item => item.key === key);
}

