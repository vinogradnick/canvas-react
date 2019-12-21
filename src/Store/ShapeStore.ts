import { IShape } from "../Models/IShape";
import { observable, action, IObservableValue, computed, toJS } from 'mobx';
import { ShapeCollection } from "../Models/ShapeCollection";
import { GroupShape } from "../Models/Shapes/GroupShape";
import Point3D from "../Models/Point3D";
import { LineShape } from "../Models/Shapes/LineShape";
import { LOCAL } from "../Models/const";
import { Morph } from "./Morph";
import { Height, pBis, Bis } from '../Models/Bis';
import { ShapeType } from "../Models/ShapeType";

/**
 * Генерация рандомных чисел
 * @param max
 */
export const rd = (max: number): number => Math.ceil(Math.random() * max);

/**
 * Хранилище объектов Store
 */
export class ShapeStore {
    /**
     * Корневая группа
     */
    @observable store: IObservableValue<GroupShape>;
    @observable mousePoint: Point3D;
    @observable isShow: IObservableValue<boolean>;
    @observable morphDialog: IObservableValue<boolean>;
    public level: number;
    public activeGroupList: [] = [];

    constructor(group: GroupShape = null) {

        this.store = group !== null ? observable.box(group) : observable.box(new GroupShape(0));
        this.mousePoint = new Point3D(0, 0);
        this.isShow = observable.box(true);
        this.morphDialog = observable.box(false);


    }

    @action morphing() {
        const f = this.store.get().children.getSelectedGroupes[0] as GroupShape;
        const s = this.store.get().children.getSelectedGroupes[1] as GroupShape;
        const m = new Morph(f, s);
        console.log(m.morph());
        this.addItem(...m.morph());
    }

    @action setMorphDialog(v: boolean) {

        this.morphDialog.set(v);
    }

    @computed get getActiveGroupShape() {
        return <GroupShape>(this.store.get().children.getSelectedGroupes[0]);
    }

    @computed get group() {
        return this.store.get();
    }

    @action moveMouse(point: Point3D) {
        this.mousePoint = point;
    }


    @action addItem = (...shapes: IShape[]) => {
        if (this.group.isFocused) {
            this.group.children.addItem(...shapes);
        }
        else
            this.findActiveGroup(this.group, ...shapes);

    }



    @action removeItem(key: string) {
        this.group.children.removeItem(key);

    }

    @action removeSelected() {
        this.group.children.removeSelected();

    }

    @action moveProjection() {
        this.group.children.projection();

    }

    @action bis() {
        const lines = this.group.children.getSelectLines as LineShape[];
        if (lines.length > 0) {
            const [l1, l2] = lines;
            const rp = pBis(l1, l2);

            // const u1 = { a: l1.A * l2.ABsqrt, b: l1.B * l2.ABsqrt, c: l1.C / l2.ABsqrt };
            // const u2 = { a: l2.A * l1.ABsqrt, b: l2.B * l1.ABsqrt, c: l2.C * l1.ABsqrt };
            // const u3 = { a: u1.a - u2.a, b: u1.b - u2.b, c: u1.c - u2.c };
            // const u4 = { a: u2.a - u1.a, b: u2.b - u1.b, c: u2.c - u1.c }
            // const f = new Function('x', `return ((${u3.a / u3.b}*x)+${u3.c / u3.b})`);
            // const f2 = new Function('x', `return ((${u4.a / u4.b}*x)+${u4.c / u4.b})`);

            // const p = new Point3D(LOCAL.CENTER_WIDTH, f(LOCAL.CENTER_HEIGHT));
            // const s = new Point3D(LOCAL.CENTER_WIDTH, f2(LOCAL.CENTER_HEIGHT));

            this.addItem(new LineShape([rp, Bis(rp, l1.points[1], l2.points[1])]))
            this.addItem(new LineShape([rp, Bis(rp, l1.points[0], l2.points[0])]))
            this.addItem(new LineShape([rp, Bis(rp, l1.points[0], l2.points[1])]))
            this.addItem(new LineShape([rp, Bis(rp, l1.points[1], l2.points[0])]))
        }

    }

    @action median() {
        this.group.children.getSelectLines.forEach(line => {
            const circle = this.group.children.getCircles[0];
            const [p1, p2] = line.points;
            const np = new Point3D((p1.x + p2.x) / 2, (p1.y + p2.y) / 2);
            this.addItem(new LineShape([...circle.points, np]))
        }
        );

    }

    @action height() {
        this.group.children.getSelectLines.forEach(line => {
            const circle = this.group.children.getCircles[0];
            this.addItem(new LineShape([...circle.points, Height(...circle.points, ...line.points)]))
        }
        );

    }

    @action groupFigures() {

        const lines = this.group.children.collection.filter(item => item.isFocused);
        const groups = this.group.children.getSelectedGroupes;
        groups.forEach((item: GroupShape) => item.level += 1)
        const group = new GroupShape(1, ...lines);
        this.group.children.addItem(group);
        lines.forEach(item => this.group.children.removeItem(item.key));

    }
    @action unGroupFigures() {
        const groupList = this.group.children.getSelectedGroupes;

    }


    @action unGroup(group: GroupShape, level: number) {
        const list = group.children.getSelectedGroupes;
        if (list.length > 0) {
            this.addItem()
        }
    }

    @action recursiveDraw(context: CanvasRenderingContext2D) {
        this.group.children.collection.forEach(item => item.draw(context));
    }



    @action findActiveGroup(group: GroupShape, ...shapes: IShape[]) {
        const groups = group.children.collection.filter(item => item.type === ShapeType.GROUP);
        if (groups.length > 0) {
            groups.forEach((item: GroupShape) => {
                if (item.isFocused) {
                    const groups = shapes.filter(data => data.type === ShapeType.GROUP);
                    groups.forEach((group: GroupShape) => group.level = item.level + 1)
                    item.children.addItem(...shapes);
                }
                else {
                    this.findActiveGroup(item, ...shapes);
                }
            })
        }
        else {
            group.children.addItem(...shapes);
        }

    }


    @action removeGroup(group: GroupShape, prev: GroupShape) {
        const groups = group.children.collection.filter(item => item.type === ShapeType.GROUP);
        if (groups.length > 0) {
            groups.forEach((item: GroupShape) => {

                if (item.isFocused) {
                    //item.children.removeItem();

                }

            })
        }
        else {

        }

    }



    @action
    public Update(shapeStore: ShapeStore) {
        this.store = observable.box(shapeStore.group);
        console.log(toJS(this.group));
    }

    @action createLine() {
        this.addItem(new LineShape([
            new Point3D(rd(LOCAL.getWidth), rd(LOCAL.getHEIGHT)),
            new Point3D(rd(LOCAL.getWidth), rd(LOCAL.getHEIGHT))
        ]))
    }

}

export type $ShapeStore = { shapeStore: ShapeStore };
