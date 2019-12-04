import { Camera, } from "./Camera";
import { ShapeStore } from "./ShapeStore";
import uuidv4 from "../Models/uuid";
import { camera } from './Camera';
import { shapeStore } from './ShapeStore';
import { FigureFactory } from "../Models/Factory";


interface ILoadInterface {
    camera: Camera,
    shapeStore: ShapeStore
}

export class RwEngine {
    constructor() {

    }
    public static jsonSave() {
        RwEngine.SaveFile(JSON.stringify({ camera, shapeStore }), uuidv4() + ".json");
    }
    public static SaveFile(text, filename) {
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
    public static LoadFile(evt) {
        var file = evt.target.files[0]; // FileList object
        console.log(file);
        let reader = new FileReader();

        reader.readAsText(file);

        reader.onload = function () {
            const struct = JSON.parse(reader.result.toString());

            camera.Update(Camera.CreateCamera(struct.camera));
            shapeStore.Update(FigureFactory.CreateStore(struct.shapeStore));

        };

        reader.onerror = function () {
            console.log(reader.error);
        };
    }

}