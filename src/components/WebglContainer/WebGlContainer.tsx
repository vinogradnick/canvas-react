import React, { Component } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'
import * as THREE from 'three';
import { PAGE_SIZE } from '../../Models/const';
import Point3D from '../../Models/Point3D';


export default class WebGlContainer extends Component {
    mount: HTMLDivElement;
    camera: THREE.Camera;
    scene: THREE.Scene;
    renderer: THREE.WebGLRenderer;
    lines: THREE.Line[] = [];
    constructor(props) {
        super(props);
        this.animate = this.animate.bind(this);
        this.flex = this.flex.bind(this);

    }
    componentDidMount() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(90, PAGE_SIZE.WIDTH / PAGE_SIZE.HEIGHT, 1, 1000);
        this.camera.position.set(0, 0, 100);
        this.camera.lookAt(0, 10, 0);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(PAGE_SIZE.WIDTH, PAGE_SIZE.HEIGHT);
        this.mount.appendChild(this.renderer.domElement);
        this.lies();
        this.animate();

    }
    public createLine(start: Point3D, end: Point3D) {
        const material = new THREE.LineBasicMaterial({ color: 0x0000ff, linewidth: 5 });
        const geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3(start._x, start._y, start._z));
        geometry.vertices.push(new THREE.Vector3(end._x, end._y, end._z));
        return new THREE.Line(geometry, material);
    }
    public lies() {

        this.lines.push(this.createLine(new Point3D(0, 0, 0), new Point3D(50, 0, 0)));
        this.lines.push(this.createLine(new Point3D(0, 0, 0), new Point3D(0, 50, 0)));
        this.lines.push(this.createLine(new Point3D(0, 0, 0), new Point3D(0, 0, 50)));
        this.lines.push(this.createLine(new Point3D(0, 0, 0), new Point3D(50, 50, 0)));
        this.lines.push(this.createLine(new Point3D(0, 0, 0), new Point3D(-50, -50, 0)));

        this.lines.forEach(item => this.scene.add(item));

    }
    public animate() {
        requestAnimationFrame(this.animate);
        this.renderer.render(this.scene, this.camera);
        console.log('animeate')
    }
    public flex() {

        this.animate();
    }
    render() {
        return (
            <div onClick={e => this.flex()} className="svg-flex-container" ref={ref => (this.mount = ref)} />
        )
    }
}
