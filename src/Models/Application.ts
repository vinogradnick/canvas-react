import { $Camera, Camera } from "../Store/Camera";
import { $ShapeStore, ShapeStore } from '../Store/ShapeStore';
import { RwEngine } from "./RwEngine";
export class Application {
    constructor(
        private store = new ShapeStore(),
        private camera: Camera = new Camera()) {

    }
    public save() {
        const writer = new RwEngine(this.camera, this.store);
        writer.jsonSave(this.camera, this.store);

    }
    public load(evt) {
        const writer = new RwEngine(this.camera, this.store);
        writer.LoadFile(evt);
    }
    get cameraInstance() {
        return this.camera;
    }
    get storeInstance() {
        return this.store;
    }


}
export const app = new Application();