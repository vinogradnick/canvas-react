import React, { Component } from 'react';
import group from '../../assets/img/group.svg';
import ToolbarItem from './ToolbarItem/ToolbarItem';
import uuidv4 from '../../Models/uuid';
import { RwEngine } from '../../Store/RwEngine';
import { ShapeStore, shapeStore } from '../../Store/ShapeStore';
const store = shapeStore;
const fileItems = [{
    name: 'Открыть',
    action: () => console.log('open'),
},
{
    name: 'Сохранить',
    action: () => RwEngine.jsonSave()
}
];
const figureItems = [{
    name: 'Создать линию',
    action: () => store.createLine(),

}, {
    name: 'Удалить линию',
    action: () => store.removeSelected(),
}]
const groupItems = [{
    name: 'Сгруппировать',
    action: () => store.groupFigures()
},
{
    name: 'Разгруппировать',
    action: () => store.unGroupFigures()
}
    , {
    name: 'Удалить группу',
    action: () => console.log('open'),
}]
class Toolbar extends Component {
    render() {
        return (
            <nav className="nav-container">
                <ToolbarItem itemName="Файл" items={fileItems} uuid={uuidv4()} />
                <ToolbarItem itemName="Работа с фигурами" items={figureItems} uuid={uuidv4()} />
                <ToolbarItem itemName="Группировка" items={groupItems} uuid={uuidv4()} />
                <input type="file" onChange={e => RwEngine.LoadFile(e)} />
            </nav>
        );
    }
}

export default Toolbar;
