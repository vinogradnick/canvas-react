import React, { Component } from 'react';
import group from '../../assets/img/group.svg';
import ToolbarItem from './ToolbarItem/ToolbarItem';
import uuidv4 from '../../Models/uuid';
import MousePoint from '../Sidebar/MousePoint/MousePoint';
import { app } from '../../Models/Application';
import { CircleShape } from '../../Models/Shapes/CircleShape';
import Point3D from '../../Models/Point3D';
import { LOCAL } from "../../Models/const";
import { PolygonShape } from '../../Models/Shapes/PolygonShape';
import { rd } from '../../Store/ShapeStore';
import { CurveShape } from '../../Models/Shapes/CurveShape';

const fileItems = [{
    name: 'Открыть',
    action: () => console.log('open'),
},
{
    name: 'Сохранить',
    action: () => app.save()
}
];

const figureItems = [{
    name: 'Создать линию',
    action: () => app.storeInstance.createLine(),

}, {
    name: 'Удалить линию',
    action: () => app.storeInstance.removeSelected(),
},
{
    name: 'Добавить точку ',
    action: () => app.storeInstance.addItem(new CircleShape([new Point3D(LOCAL.CENTER_WIDTH, LOCAL.CENTER_HEIGHT)]))
},
{
    name: 'Добавить фигуру ',
    action: () => app.storeInstance.addItem(PolygonShape.create(Number(prompt('Количество точек фигуры'))))
},
{
    name: 'Добавить кривую ',
    action: () => app.storeInstance.addItem(CurveShape.create())
},
];

const groupItems = [{
    name: 'Сгруппировать',
    action: () => app.storeInstance.groupFigures()
},
{
    name: 'Разгруппировать',
    action: () => app.storeInstance.unGroupFigures()
}
    , {
    name: 'Удалить группу',
    action: () => console.log('open'),
}];

const trigArr = [
    {
        name: 'Биссектриса ',
        action: () => app.storeInstance.bis()
    }
    ,
    {
        name: 'Медиана',
        action: () => app.storeInstance.median()
    },
    {
        name: 'Высота',
        action: () => app.storeInstance.height()
    }
];

class Toolbar extends Component {
    render() {
        return (
            <nav className="nav-container">
                <ToolbarItem key={uuidv4()} itemName="Файл" items={fileItems} uuid={uuidv4()} />
                <ToolbarItem key={uuidv4()} itemName="Работа с фигурами" items={figureItems} uuid={uuidv4()} />
                <ToolbarItem key={uuidv4()} itemName="Группировка" items={groupItems} uuid={uuidv4()} />
                <ToolbarItem key={uuidv4()} itemName="Морфинг"
                    items={[
                        {
                            name: 'Морфинг групп',
                            action: () => app.storeInstance.morphing()
                        }]}
                    uuid={uuidv4()} />
                <ToolbarItem key={uuidv4()} itemName="Действия" items={trigArr} uuid={uuidv4()} />

                <input key={uuidv4()} type="file" onChange={e => app.load(e)} />

            </nav>
        );
    }
}

export default Toolbar;
