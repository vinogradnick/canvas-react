import Point3D from "../Point3D";
import { IShape } from "../IShape";
import { observable, action, IObservableValue, IObservableArray, computed } from 'mobx';
import { ShapeType } from "../ShapeType";
import uuidv4 from "../uuid";
import { Matrix } from "../Matrix";
import { LOCAL } from "../const";
import { LineShape } from "./LineShape";
import PolygonTool from "../../components/Tools/PolygonTool";
import React from "react";
import { TriangulateAlgo } from "./ TriangulateAlg";
import { rd } from "../../Store/ShapeStore";
import Delaunator from 'delaunator';


export class PolygonShape implements IShape {
    draw: (ctx: CanvasRenderingContext2D) => void;


    ReactiveComponent: JSX.Element;
    public readonly key: string;
    public readonly type: ShapeType;
    @observable selection: IObservableValue<boolean>;
    @observable deloneActive: IObservableValue<boolean>;

    @observable points: IObservableArray<Point3D>;
    constructor(...points: Point3D[]) {
        this.points = observable(points);
        this.selection = observable.box(false);
        this.key = uuidv4();
        this.deloneActive = observable.box(window.confirm("Использовать триангуляцию делоне"));
    }
    @computed get ListViewComponent() {
        return <>
            <li>
                <span
                    className="left-bar-name-group"
                    onClick={e => this.focus()}
                    style={{ fontWeight: this.isFocused ? "bold" : "normal" }}>
                    {this.points.map(item => item.stringify)}
                </span>

                )}
            </li>

        </>
    };

    @action move = (...points: Point3D[]) => this.points = observable(points)

    @action focus = () => this.selection.set(!this.selection.get())

    @computed get isFocused() {
        return this.selection.get();
    }
    @computed get pointsList() {
        return this.points.map(item => `${item.x},${item._y}`).join(' ');
    }
    @computed get Component() {
        return <PolygonTool key={this.key} polygone={this} />
    }
    @action addPoint(e) {
        this.points.push(new Point3D(e.clientX, e.clientY));
    }
    @computed get pointArr() {
        const arr = [];
        this.points.forEach(item => arr.push(item.getX, item.getY))
        if (this.deloneActive.get()) {

            const ar = this.points.map(item => [item.getX, item.getY])
            const trig = Delaunator.from(ar);
            const temp = [];
            console.log(trig);
            for (let i = 0; i < trig.triangles.length; i += 3) {
                temp.push([
                    this.points[trig.triangles[i]],
                    this.points[trig.triangles[i + 1]],
                    this.points[trig.triangles[i + 2]],
                ]
                );

            }
            return temp;
        }
        else {

            const trigPoints = TriangulateAlgo(arr, null, 2);
            const pList = [];
            for (let i = 0; i < trigPoints.length; i += 3) {
                pList.push([
                    this.points[trigPoints[i]],
                    this.points[trigPoints[i + 1]],
                    this.points[trigPoints[i + 2]
                    ]
                ]);
            }
            return pList;
        }
    }
    public static create(count: number) {
        const plist = new Array(count).fill(null).map(item => new Point3D(rd(LOCAL.getWidth), rd(LOCAL.getHEIGHT)));
        return new PolygonShape(...plist);
    }

    @action triangulate() {
        // const negative = this.negativeVrtx.filter(({ value }) => value.x < 0 && value.y < 0);
        // const mx = Matrix.multiplyMatrix(this.rotate(-1 / Math.sqrt(LOCAL.CENTER_WIDTH), 3 / Math.sqrt(LOCAL.CENTER_HEIGHT)), this.transform(negative[0].x, negative[1].y))
        // const np = this.points
        //     .map(item => Matrix.multiplyMatrix([item.matrix2d], mx));
        // const nArr = this.newFigure(np);


    }
    // private newFigure(points) {
    //     const findEq = [];
    //     for (let i = 0; i < points.length - 1; i++) {
    //         if (Math.abs(points[i].x) === Math.abs(points[i + 1].x)) {
    //             findEq.push(this.newF(new Point3D(points[i].x, points[i].y), new Point3D(points[i + 1].x, points[i + 1].y)))
    //         }
    //     }
    //     return findEq;
    // }
    // private newF(p1, p2) {
    //     return new LineShape([p1, p2]);
    // }
    // @computed get negativeVrtx() {
    //     const list = [];
    //     for (let i = 0; i < this.points.length - 1; i++)
    //         list.push({ key: i, value: new Point3D(this.points[i + 1].x - this.points[i].x, this.points[i + 1].y - this.points[i].y) });
    //     list.push({ key: this.points.length - 1, value: new Point3D(this.points[0].x - this.points[this.points.length - 1].x, this.points[0].x - this.points[this.points.length - 1].x) });
    //     return list;
    // }
    private rotate(cos, sin) {
        return [[cos, -sin, 0],
        [sin, cos, 0],
        [0, 0, 1]]
    }
    private backRotate(cos, sin) {
        return [[cos, sin, 0],
        [-sin, cos, 0],
        [0, 0, 1]]
    }
    private transform(x, y) {
        return [[1, 0, 0],
        [0, 1, 0],
        [-x, -y, 1]]
    }
    private backTransform(x, y) {
        return [[1, 0, 0],
        [0, 1, 0],
        [x, y, 1]]
    }
}