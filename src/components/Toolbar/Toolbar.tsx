import React, {Component} from 'react';
import group from '../../assets/img/group.svg';
import {shapeStore} from "../../Store/ShapeStore";

class Toolbar extends Component {
    render() {
        return (
            <nav className="nav-container">
                <div className="tool-item" onClick={e => shapeStore.createLine()}>
                    Создание линии
                </div>
                <div className="tool-item">
                    Удаление линии
                </div>
                <div className="tool-item" onClick={e => shapeStore.groupFigures()}>

                    Сгруппировать
                </div>
                <div className="tool-item" onClick={e => shapeStore.unGroupFigures()}>
                    Удалить группу
                </div>
                <div className="tool-item" onClick={e => shapeStore.isShow.set(!shapeStore.isShow.get())}>
                    Отображение Координатной оси
                </div>
                <div className="tool-item">
                    Сменить Render Engine
                </div>
            </nav>
        );
    }
}

export default Toolbar;
