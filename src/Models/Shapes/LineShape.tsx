import { observable, action, IObservableValue, computed } from 'mobx';
import Point3D from "../Point3D";
import LineTool, { ILineToolProps } from "../../components/Tools/LineTool";
import React from "react";
import uuidv4 from "../uuid";
import { IShape } from "../IShape";
import { ShapeType } from '../ShapeType';
import LineListView from "../../components/Tools/ListViews/LineListView";
import { Camera3d } from '../Camera';
import { Matrix } from '../Matrix';

export class LineShape implements IShape {
    public readonly key: string;
    public readonly type: ShapeType;
    @observable points: Array<Point3D>;
    @observable selection: IObservableValue<boolean>;

    @computed get isFocused() {
        return this.selection.get();
    }


    constructor(points: Array<Point3D>) {
        this.points = observable(points);
        this.selection = observable.box(false);
        this.key = uuidv4();
        this.focus = this.focus.bind(this);
        this.move = this.move.bind(this);
        this.type = ShapeType.LINE;
    }

    @action move(...points: Array<Point3D>) {

        this.points = points;
    }

    @action focus() {
        if (this.selection) {
            this.selection.set(!this.selection.get());
        }
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
            points={this.points}
            activation={this.selection.get()}
        />
    }

    get ListViewComponent() {
        return <LineListView line={this} key={this.key} />
    }

}
