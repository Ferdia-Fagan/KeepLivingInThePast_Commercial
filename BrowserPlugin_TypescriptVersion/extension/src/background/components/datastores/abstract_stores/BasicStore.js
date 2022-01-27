// import layer0_db from "../abstract_object_store_parts/layer0_db";
// import {IndexObject} from "../store_objects_interfaces/base_store_objects/IndexObject";
// import { ID } from "../stores/utils/Utils";
//
// /**
//  * description:
//  * store that does not have the concept of a 'key'. Any index could be searched.
//  */
// export default class BasicStore<StoreObjType extends IndexObject> extends layer0_db<StoreObjType> {
//     constructor(DATABASE: string, DB_VERSION: number,STORE_NAME: string){
//         function onUpgradeNeededHandler(event: any){    // TODO: correct any
//              event.currentTarget.result.createObjectStore(
//                 STORE_NAME, { keyPath: ID, autoIncrement: true });
//         }
//
//         super(DATABASE, DB_VERSION,STORE_NAME,onUpgradeNeededHandler);
//     }
// }
//
//# sourceMappingURL=BasicStore.js.map