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

export class LineShape implements IShape {
    public readonly key: string;
    public readonly type: ShapeType;
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

    constructor(points: Array<Point3D>) {
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
            move={this.move}
            activate={this.focus}
            points={app.cameraInstance.active ? this.projectionPoints : this.points}
            activation={this.selection.get()}
        />
    }

    get ListViewComponent() {
        return <LineListView line={this} key={this.key} />
    }
    @computed get Line3() {
        var curve = new THREE.CatmullRomCurve3(this.points.map(item => new THREE.Vector3(item.getX, item.getY, item.z)));
        var points = curve.getPoints(50);

        var geometry = new THREE.BufferGeometry().setFromPoints(points);
        var material = new THREE.LineBasicMaterial({ color: 0xff0000 });

        var curveObject = new THREE.Line(geometry, material);
        curveObject.uuid = this.key;
        curveObject.castShadow = true;
        curveObject.receiveShadow = true;
        return curveObject;
    }

}
/*

camera.isActive.get() === false ? <LineTool
            key={this.key}
            move={this.move}
            activate={this.focus}
            points={this.points}
            activation={this.selection.get()}
        /> :


*/