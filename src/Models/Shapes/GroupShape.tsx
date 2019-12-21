import { IShape } from "../IShape";
import React from 'react';
import uuidv4 from "../uuid";
import { observable, IObservableValue, computed, action } from 'mobx';
import Point3D from "../Point3D";
import { ShapeCollection } from "../ShapeCollection";
import { ShapeType } from "../ShapeType";
import { tsExpressionWithTypeArguments } from "@babel/types";
import folder from '../../assets/img/folder.svg';
import GroupTool from "../../components/Tools/ListViews/GroupTool";
import GroupFigure from "../../components/Tools/GroupFigure";
import { Matrix } from "../Matrix";
import { app } from "../Application";
import { LineShape } from "./LineShape";
import { LOCAL } from "../const";


//smirnndaya@gmail.com
interface ICoorder {
    maxX: number;
    minX: number;
    maxY: number;
    minY: number;
    maxZ?: number;
    minZ?: number;
}

export class GroupShape implements IShape {

    @observable points: Array<Point3D>;
    @observable children: ShapeCollection;
    @observable selection: IObservableValue<boolean>;

    public key: string;
    public type: ShapeType;
    public rotateAngleX: number = 0;
    public rotateAngleY: number = 0;
    public rotateAngleZ: number = 0;
    public scaleFactor: number;
    public matrix4d: number[][] = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];

    constructor(public level: number, ...shapes: IShape[]) {

        this.key = uuidv4();
        this.selection = observable.box(false);
        this.children = observable(new ShapeCollection(shapes));
        this.points = [new Point3D(0, 0)];
        this.type = ShapeType.GROUP;
        this.focus = this.focus.bind(this);
    }
    get rotateXMatrix() {
        return [[1, 0, 0, 0], [0, Math.cos(this.rotateAngleX), Math.sin(this.rotateAngleX), 0], [0, -Math.sin(this.rotateAngleX), 1, 0], [0, 0, Math.cos(this.rotateAngleX), 1]]
    }
    get rotateYMatrix() {
        return [[Math.cos(this.rotateAngleY), 0, -Math.sin(this.rotateAngleY), 0], [0, 1, 0, 0], [Math.sin(this.rotateAngleY), 0, Math.cos(this.rotateAngleY), 0], [0, 0, 0, 1]];
    }
    get rotateZMatrix() {
        return [[Math.cos(this.rotateAngleZ), Math.sin(this.rotateAngleZ), 0, 0], [-Math.sin(this.rotateAngleZ), Math.cos(this.rotateAngleZ), 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
    }
    @action applyMatrix() {
        if (this.rotateAngleX !== 0) {
            console.log(this.rotateXMatrix);
            for (let i = 0; i < this.children.collection.length; i++) {
                const item = this.children.collection[i];
                item.move(...item.points.map(item => this.mulPoint([item.matrix], this.rotateXMatrix)));
            }
        }
        if (this.rotateAngleY !== 0) {
            for (let i = 0; i < this.children.collection.length; i++) {
                const item = this.children.collection[i];
                item.move(...item.points.map(item => this.mulPoint([item.matrix], this.rotateYMatrix)));
            }
        }
        if (this.rotateAngleZ !== 0) {
            for (let i = 0; i < this.children.collection.length; i++) {
                const item = this.children.collection[i] as LineShape;
                item.move(...item.points.map(item => this.mulPoint([item.matrix], this.rotateZMatrix)));
            }
        }


        for (let i = 0; i < this.children.collection.length; i++) {
            const item = this.children.collection[i];
            item.move(...item.points.map(item => this.mulPoint([item.matrix], this.matrix4d)));
        }

    }

    private mulPoint(p: number[][], mtx) {

        const res = [...Matrix.multiplyMatrix(p, mtx)[0]];
        console.log(res);
        return new Point3D((res[0] / res[3]) + LOCAL.CENTER_WIDTH, (-1 * (res[1] / res[3])) + LOCAL.CENTER_HEIGHT, res[2] / res[3]);
    }

    @computed get isFocused() {

        return this.selection.get();
    }
    draw = (ctx: CanvasRenderingContext2D) => {
        this.children.collection.forEach(item => item.draw(ctx));
    };
    static CreateGroupShape(group: any) {
        const shapes = group.children.collection;
        const newArr = [];
        shapes.forEach(element => {
            if (element.type === 1) {
                newArr.push(new GroupShape(null))
            }
        });
        const newGp = new GroupShape(null, ...group.children.collection);
        newGp.points = [...group.points];
        return newGp;
    }


    @computed get centerFigure() {
        const { maxX, minX, maxY, minY, maxZ, minZ } = this.children.maxAndMinPoint;
        const avX = ((maxX - minX) / 2) + minX;
        const avY = ((maxY - minY) / 2) + minY;
        const avZ = ((maxZ - minZ) / 2) + minZ;
        return new Point3D(avX, avY, avZ);
    }

    @computed get getPoint() {
        return this.points[0];
    }

    @computed get groupCoord() {
        return this.children.maxAndMinPoint;

    }

    @computed get ReactiveComponent() {
        return (<group key={this.key}>
            {this.children.collection.map(item => item.ReactiveComponent)}
        </group>);

    }

    @computed get maxAndMinPoint() {
        return this.groupCoord;
        //     const min = this.groups.map((item: Group) => item.maxAndMinPoint);
        //     const arrShapes: ICoorder[] = [];
        //     for (let i = 0; i < min.length; i++) {
        //         arrShapes.push(min[i]);
        //     }
        //     let minX = PAGE_SIZE.WIDTH;
        //     let minY = PAGE_SIZE.HEIGHT;
        //     let maxX = 0;
        //     let maxY = 0;
        //     let maxZ = 0;
        //     let minZ = PAGE_SIZE.WIDTH;
        //     for (let j = 0; j < arrShapes.length; j++) {
        //         if (arrShapes[j].maxX > maxX)
        //             maxX = arrShapes[j].maxX;

        //         if (arrShapes[j].maxY > maxY)
        //             maxY = arrShapes[j].maxY;

        //         if (arrShapes[j].minX < minX)
        //             minX = arrShapes[j].minX;

        //         if (arrShapes[j].minY < minY)
        //             minY = arrShapes[j].minY;

        //         if (arrShapes[j].minZ < minZ)
        //             minZ = arrShapes[j].minZ;

        //         if (arrShapes[j].maxZ < maxZ)
        //             maxZ = arrShapes[j].maxZ;

        //     }
        //     return { minX, minY, maxX, maxY, minZ, maxZ };
        // }


    }


    @computed get centerGroups() {
        console.log(this.maxAndMinPoint);
        return this.maxAndMinPoint;

    }

    @computed get ultraCenter() {
        const { maxX, minX, maxY, minY, maxZ, minZ } = this.centerGroups;

        const avX = ((maxX - minX) / 2) + minX;
        const avY = ((maxY - minY) / 2) + minY;
        const avZ = ((maxZ - minZ) / 2) + minZ;
        return new Point3D(avX, avY, avZ);
    }


    @action movePoint = (point: Point3D) =>
        this.points = [point];

    @action move = (...points: Point3D[]) => {

        const delta = Point3D.subtraction(this.centerFigure, points[0]);
        for (let i = 0; i < this.children.collection.length; i++) {
            const item = this.children.collection[i];
            item.move(...item.points.map(p => p.minus(delta)));
        }
    }


    get ListViewComponent() {


        return (
            <GroupTool
                group={this}
                key={this.key}
                focus={this.focus} />
        )
    }

    get Component() {
        return <GroupFigure key={this.key + 'F317'} group={this}>
            {this.children.collection.map(item => item.Component)}
        </GroupFigure>
    }


    @action public focus = () => {
        this.selection.set(!this.selection.get());
        console.log('focus');
    }


    get ActionComponent() {
        return <>

        </>
    }


}
