import { camera } from './Camera';
import { shapeStore } from './ShapeStore';
// export interface IContainer {
//     shapeStore: ShapeStore;
//     cameraStore: Camera;
// }
// export interface ContainerStore {
//     key: string;
//     value: Object;
// }
// export class DIContainer {
//     containerStore: ContainerStore[];
//     constructor(oldContainer: DIContainer = null, ...instances: ContainerStore[]) {
//         this.containerStore = [];
//     }
//     public Register<T>(typeName: string, item: T) {
//         console.log('register');
//         this.containerStore.push({ key: typeName, value: item });
//     }
//     public RegisterOrUpdate<T>(typeName: string, item: T) {
//         const instance = this.getInstance<T>(typeName);
//         if (instance === null || instance === undefined) {
//             this.Register<T>(typeName, item);
//         }
//         else {
//             this.updateInstance(typeName, item);
//         }
//     }
//     public getInstance<T>(typeName: string): T {
//         console.log(this.containerStore);
//         if (this.containerStore.length > 0 && this.containerStore !== undefined) {
//             const g = this.containerStore.find(item => item.key === typeName);
//             if (g !== null && g !== undefined)
//                 return <T>g.value;

//         }

//         else
//             return null;
//     }
//     public updateInstance<T>(typeName: string, newInstance: T) {
//         this.containerStore.forEach(element => {
//             if (element.key === typeName) {
//                 element.value = newInstance;
//             }
//         });
//     }



// }
