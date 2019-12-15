import { $Camera, Camera } from "../Store/Camera";
import { $ShapeStore, ShapeStore } from '../Store/ShapeStore';
import { FigureFactory } from "./Factory";
import uuidv4 from "./uuid";
export class RwEngine {
    constructor(private camera: Camera, private store: ShapeStore) {
    }
    public jsonSave(camera: Camera, shapeStore: ShapeStore) {
        this.SaveFile(JSON.stringify({ camera, shapeStore }), uuidv4() + ".json");
    }
    private SaveFile(text, filename) {
        var pom = document.createElement('a');
        pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        pom.setAttribute('download', filename);
        if (document.createEvent) {
            var event = document.createEvent('MouseEvents');
            event.initEvent('click', true, true);
            pom.dispatchEvent(event);
        }
        else {
            pom.click();
        }
    }
    public LoadFile(evt) {
        var file = evt.target.files[0]; // FileList object
        console.log(file);
        let reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => this.updateStore(reader);
    }
    public updateStore(reader: FileReader) {
        const struct = JSON.parse(reader.result.toString());
        console.log(struct);
        this.store.Update(FigureFactory.CreateStore(struct.shapeStore));
        this.camera.Update(Camera.CreateCamera(struct.camera));
    }
}
