import { IShape } from "../Models/IShape";
import { observable, action, IObservableValue } from 'mobx';
import { ShapeCollection } from "../Models/ShapeCollection";
import { GroupShape } from "../Models/Shapes/GroupShape";
import Point3D from "../Models/Point3D";
import { LineShape } from "../Models/Shapes/LineShape";
import { PAGE_SIZE } from "../Models/const";

export const rd = (max: number): number => Math.ceil(Math.random() * max);

export class ShapeStore {
    @observable group: GroupShape;
    @observable mousePoint: Point3D;
    @observable isShow: IObservableValue<boolean>;



    constructor() {
        this.group = observable(new GroupShape());
        this.mousePoint = new Point3D(0, 0);
        this.isShow = observable.box(true);
    }

    @action moveMouse(point: Point3D) {
        console.log('flex');
        this.mousePoint = point;
    }

    @action addItem = (...shapes: IShape[]) =>
        this.group.children.addItem(...shapes);


    @action removeItem(key: string) {
        this.group.children.removeItem(key);

    }
    @action removeSelected() {
        this.group.children.removeSelected();

    }
    @action moveProjection() {
        this.group.children.projection();

    }

    @action groupFigures() {
        const lines = this.group.children.getSelectLines;
        const group = new GroupShape(null, ...lines);
        if (lines.length > 0) {
            lines.forEach(item => {

                this.group.children.removeItem(item.key)
            });

            this.group.children.addItem(group);
            group.focus();
        }


    }

    @action unGroupFigures() {
        const groupes = this.group.children.getSelectedGroupes;

        const arr = [];
        groupes.forEach((item: GroupShape) => {
            arr.push(...item.children.collection);
            this.removeItem(item.key);

        });


    }


    @action createLine() {
        this.addItem(new LineShape([
            new Point3D(rd(PAGE_SIZE.WIDTH), rd(PAGE_SIZE.HEIGHT)),
            new Point3D(rd(PAGE_SIZE.WIDTH), rd(PAGE_SIZE.HEIGHT))
        ]))
    }
}


export const shapeStore = new ShapeStore();
