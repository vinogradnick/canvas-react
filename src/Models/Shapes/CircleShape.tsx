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
import CircleTool from '../../components/Tools/CircleTool';

export class CircleShape implements IShape {
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
        this.type = ShapeType.CIRCLE;
    }

    @action move(...points: Array<Point3D>) {
        console.log(points);
        this.setPoints = points;
    }

    @action focus() {
        if (this.selection) {
            this.selection.set(!this.selection.get());
        }
        console.log(this);
    }

    @computed get formula() {

        return ` F(x): x^2+y^2=10`;
    }

    @computed get Component() {
        return <CircleTool
            key={this.key}
            move={this.move}
            activate={this.focus}
            points={app.cameraInstance.active ? this.projectionPoints : this.points}
            activation={this.selection.get()}
        />
    }

    get ListViewComponent() {
        return <div>

        </div>
    }

}
