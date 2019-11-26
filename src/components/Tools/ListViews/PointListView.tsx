
import React from 'react';
import circle from "../../../assets/img/circle.svg";
import Point3D from "../../../Models/Point3D";

function PointListView({ point }: { point: Point3D }) {

    return (
        <li className="group-item">
            <img src={circle} width={16} height={16} alt="" />
            <span className="point-text"> P: ({point.getX};{point.getY};{point.getZ})</span>
        </li>
    )
}

export default PointListView
