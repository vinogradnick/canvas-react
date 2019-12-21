import { observable, action, IObservableValue, computed } from 'mobx';
import Point3D from "../Point3D";
import LineTool, { ILineToolProps } from "../../components/Tools/LineTool";
import React from "react";
import uuidv4 from "../uuid";
import { IShape } from "../IShape";
import { ShapeType } from '../ShapeType';
import LineListView from "../../components/Tools/ListViews/LineListView";
import { Matrix } from '../Matrix';
import { app } from '../Application';
import { ACTIVE_CSS } from '../const';
import * as THREE from 'three';
import SplineView from '../../components/3DView/SplineView';
import { ColorR } from "../Bis";
import { rd } from "../../Store/ShapeStore";

export class LineShape implements IShape {

    public readonly key: string;
    public readonly type: ShapeType;
    @observable line: IObservableValue<THREE.Line>;
    @observable _points: IObservableValue<Array<Point3D>>;


    @observable selection: IObservableValue<boolean>;

    @computed get isFocused() {
        return this.selection.get();
    }

    @computed get projectionPoints() {
        return this.points.map(({ projection }) => projection)
    }


    public get points() {
        return this._points.get();
    }

    public set setPoints(value: Point3D[]) {
        this._points.set(value);
    }
    draw = (ctx: CanvasRenderingContext2D) => {
        const [p1, p2] = this.points;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.lineWidth = this.isFocused ? 5 : 1;
        ctx.stroke();
        console.log(ctx);
    }

    constructor(points: Array<Point3D>, public color: ColorR = new ColorR(rd(255), rd(255), rd(255))) {
        this._points = observable.box(points);
        this.selection = observable.box(false);
        this.key = uuidv4();
        this.focus = this.focus.bind(this);
        this.move = this.move.bind(this);
        this.type = ShapeType.LINE;
    }

    @action move(...points: Array<Point3D>) {
        this.setPoints = points;
    }

    @action focus() {
        if (this.selection) {
            this.selection.set(!this.selection.get());
        }
        console.log(this);
    }
    @computed get A() {
        const [start, end] = this.points;
        return start.getY - end.getY;
    }
    @computed get B() {
        const [start, end] = this.points;

        return end.getX - start.getX;
    }
    @computed get C() {
        const [start, end] = this.points;
        return start.getX * end.getY - end.getX * start.getY;
    }
    @computed get ABsqrt() {
        return Math.sqrt(Math.pow(this.A, 2) + Math.pow(this.B, 2));
    }

    @computed get formula() {
        const [start, end] = this.points;
        const xCo = start.getY - end.getY;
        const yCo = end.getX - start.getX;
        const xyCo = start.getX * end.getY - end.getX * start.getY;
        return ` F(x): ${xCo}x ${yCo < 0 ? yCo : '+' + yCo}y${xyCo < 0 ? `${xyCo}` : ` + ${xyCo}`} = 0        `
    }

    @computed get Component() {
        return <LineTool
            key={this.key}
            color={this.color.rbga}
            move={this.move}
            activate={this.focus}
            points={this.points}
            activation={this.selection.get()}
        />
    }

    get ListViewComponent() {
        return <LineListView line={this} key={this.key} />
    }

    @computed get ReactiveComponent() {
        return <SplineView line={this} />
    }
}

// @computed get Line3() {

//     var geometry = new THREE.BufferGeometry().setFromPoints(this.points.map(item => new THREE.Vector3(item.getX, item.getY, item.z)));
//     var material = new THREE.LineBasicMaterial({ color: 0xff0000, opacity: 0.35 });

//     var curveObject = new THREE.Line(geometry, material);
//     curveObject.uuid = this.key;
//     curveObject.castShadow = true;
//     curveObject.receiveShadow = true;
//     return curveObject;
// }


/*

camera.isActive.get() === false ? <LineTool
            key={this.key}
            move={this.move}
            activate={this.focus}
            points={this.points}
            activation={this.selection.get()}
        /> :


*/
