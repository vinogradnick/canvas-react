import React, { Component } from 'react'
import * as THREE from 'three';
import { PAGE_SIZE } from '../../Models/const';
import { app } from '../../Models/Application';
import { ShapeStore } from '../../Store/ShapeStore';
import { observer, inject } from 'mobx-react';
import { LineShape } from '../../Models/Shapes/LineShape';
@inject('shapeStore')
@observer
export default class UltraWebGLContainer extends Component<{ shapeStore?: ShapeStore }> {
    mount: HTMLDivElement;
    scene: THREE.Scene;
    light: THREE.SpotLight;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    lines: THREE.Line[];
    req: any;
    constructor(props) {
        super(props);
        this.anime = this.anime.bind(this);
        this.lines = [];
    }
    public initRenderer() {
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(PAGE_SIZE.WIDTH, PAGE_SIZE.HEIGHT + 50);
        this.renderer.shadowMap.enabled = true;
        this.mount.appendChild(this.renderer.domElement);
        this.renderer.render(this.scene, this.camera);
    }
    public createScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xf0f0f0);

        this.camera = new THREE.PerspectiveCamera(70, PAGE_SIZE.WIDTH / PAGE_SIZE.HEIGHT, 1, 10000);
        this.camera.position.set(0, 0, 0);
        this.scene.add(this.camera);

        // this.scene.add(new THREE.AmbientLight(0xf0f0f0));
        // var light = new THREE.SpotLight(0xffffff, 1.5);
        // light.position.set(0, 1500, 200);
        // light.castShadow = true;
        // light.shadow = new THREE.SpotLightShadow(new THREE.PerspectiveCamera(70, 1, 200, 2000));
        // light.shadow.bias = - 0.000222;
        // light.shadow.mapSize.width = 1024;
        // light.shadow.mapSize.height = 1024;
        // this.scene.add(light);

        var planeGeometry = new THREE.PlaneBufferGeometry(2000, 2000);
        planeGeometry.rotateX(- Math.PI / 2);
        var planeMaterial = new THREE.ShadowMaterial({ opacity: 0.2 });

        var plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.position.y = 0;
        plane.receiveShadow = true;
        this.scene.add(plane);

        var helper = new THREE.GridHelper(2000, 100);
        helper.position.y = 0;
        //@ts-ignore
        helper.material.opacity = 0.25;
        //@ts-ignore
        helper.material.transparent = true;
        this.scene.add(helper);
        var axes = new THREE.AxesHelper(1000);
        axes.position.set(0, 0, 0);
        this.scene.add(axes);
    }

    componentDidMount() {
        this.createScene();
        this.initRenderer();
        this.addListenters();


        this.anime();

    }
    componentWillUnmount() {
        this.scene.remove(...this.lines);
        cancelAnimationFrame(this.req);
        this.lines = [];
        this.scene = null;
        this.renderer = null;

    }
    public observe() {
        this.scene.remove(...this.lines);
        this.lines = [];
        const data = this.props.shapeStore.list;
        console.log(data);
        this.lines = data;
        this.scene.add(...data);
        console.log(this.lines);
    }
    public addListenters() {
        const size = 20;

        document.addEventListener('keypress', (e) => {
            console.log(e.key);
            switch (e.key) {
                case "w":
                    this.camera.position.y += size;
                    return;
                case "s":
                    this.camera.position.y -= size;
                    return;
                case "a":
                    this.camera.position.x -= size;
                    return;
                case "d":
                    this.camera.position.x += size;
                    return;
                case "q":
                    this.camera.rotation.x += 1;
                    return;
                case "e":
                    this.camera.rotation.x -= 1;
                    return;
                case "r":
                    this.camera.rotation.y += 1;
                    return;
                case "f":
                    this.camera.rotation.y -= 1;
                    return;
            }
        })
    }
    public anime() {

        this.req = requestAnimationFrame(this.anime);
        this.observe();
        this.camera.rotation.x = app.cameraInstance.xAngle;
        this.camera.rotation.y = app.cameraInstance.yAngle;
        this.camera.position.setZ(app.cameraInstance.zDistance);
        this.renderer.render(this.scene, this.camera);
    }
    render() {
        return (
            <div className="svg-flex-container" ref={ref => (this.mount = ref)} />
        )
    }
}
