import { LineShape } from "./LineShape";
import { IShape } from "../IShape";
import Point3D from "../Point3D";
import { ShapeType } from "../ShapeType";
import { observable, IObservableArray, action, computed, IObservableValue } from 'mobx';
import uuidv4 from "../uuid";
import CurveTool from "../../components/Tools/CurveTool";
import React from "react";
import { rd } from "../../Store/ShapeStore";
import { LOCAL } from "../const";
export class CurveShape implements IShape {
    draw: (ctx: CanvasRenderingContext2D) => void;
    type: ShapeType;
    

    @observable _points: IObservableValue<Point3D[]>;

    @observable selection: IObservableValue<boolean>;
    key: string;

    @action move = (...points: Point3D[]) => { this._points.set(points) }
    ReactiveComponent: JSX.Element;
    constructor(...points: Point3D[]) {
        this._points = observable.box(points);
        this.key = uuidv4();
        this.type = ShapeType.CURVE;
        this.selection = observable.box(false);
    }
    public static create() {
        const plist = new Array(2).fill(null).map(item => new Point3D(rd(LOCAL.getWidth), rd(LOCAL.getHEIGHT)));
        const curve = new CurveShape(...plist);
        curve._points.set([...curve.points, ...curve.points.map(item => new Point3D(item.x - 10, item.y + 10))]);
        return curve;
    }
    @computed get points() {
        return this._points.get();
    }
    @action focus = () => this.selection.set(!this.selection.get())
    @computed get isFocused() {
        return this.selection.get();
    }
    @computed get Component() {
        return <CurveTool key={this.key} curve={this} />
    }
    @computed get ListViewComponent() {
        return (<li>
            <span
                className="left-bar-name-group"
                onClick={e => this.focus()}
                style={{ fontWeight: this.isFocused ? "bold" : "normal" }}>
                Кривая Бизье
            </span>

        </li>)
    }

}