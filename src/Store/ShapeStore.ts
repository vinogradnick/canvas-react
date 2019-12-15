import { IShape } from "../Models/IShape";
import { observable, action, IObservableValue, computed, toJS } from 'mobx';
import { ShapeCollection } from "../Models/ShapeCollection";
import { GroupShape } from "../Models/Shapes/GroupShape";
import Point3D from "../Models/Point3D";
import { LineShape } from "../Models/Shapes/LineShape";
import { PAGE_SIZE } from "../Models/const";
import { Morph } from "./Morph";
import { Bis, Height } from '../Models/Shapes/Bis';
import { ShapeType } from "../Models/ShapeType";
export const rd = (max: number): number => Math.ceil(Math.random() * max);
export class ShapeStore {
    @observable store: IObservableValue<GroupShape>;
    @observable mousePoint: Point3D;
    @observable isShow: IObservableValue<boolean>;
    @observable morphDialog: IObservableValue<boolean>;


    constructor(group: GroupShape = null) {

        this.store = group !== null ? observable.box(group) : observable.box(new GroupShape());
        this.mousePoint = new Point3D(0, 0);
        this.isShow = observable.box(true);
        this.morphDialog = observable.box(false);


    }
    @action morphing() {
        const f = <GroupShape>this.store.get().children.getSelectedGroupes[0];
        const s = <GroupShape>this.store.get().children.getSelectedGroupes[1];
        const m = new Morph(f, s);
        console.log(m.morph());
        this.addItem(...m.morph());
    }
    @action setMorphDialog(v: boolean) {
        console.log(v);
        this.morphDialog.set(v);
    }
    @computed get getActiveGroupShape() {
        return <GroupShape>(this.store.get().children.getSelectedGroupes[0]);
    }
    @computed get group() {
        return this.store.get();
    }

    @action moveMouse(point: Point3D) {
        console.log('flex');
        this.mousePoint = point;
    }
    @computed get list(): THREE.Line[] {

        const item = this.group.children.collection
            .filter(item => item.type == ShapeType.GROUP)
            .map((item: GroupShape) =>
                item.children.collection
                    .map((item: LineShape) => item.Line3)
            );
        console.log(item);
        const data = [];
        item.forEach(item => data.push(...item))

        return ([
            ...this.group.children.collection
                .filter(item => item.type == ShapeType.LINE)
                .map((item: LineShape) => item.Line3),
            ...data
        ]);
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

    @action bis() {
        this.group.children.getSelectLines.forEach(line => {
            const circle = this.group.children.getCircles[0];
            this.addItem(new LineShape([...circle.points, Bis(...circle.points, ...line.points)]))
        });

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
        this.addItem(...arr);

    }

    @action public Update(shapeStore: ShapeStore) {
        this.store = observable.box(shapeStore.group);
        console.log(toJS(this.group));
    }

    @action createLine() {
        this.addItem(new LineShape([
            new Point3D(rd(PAGE_SIZE.WIDTH), rd(PAGE_SIZE.HEIGHT)),
            new Point3D(rd(PAGE_SIZE.WIDTH), rd(PAGE_SIZE.HEIGHT))
        ]))
    }

}

export type $ShapeStore = { shapeStore: ShapeStore };