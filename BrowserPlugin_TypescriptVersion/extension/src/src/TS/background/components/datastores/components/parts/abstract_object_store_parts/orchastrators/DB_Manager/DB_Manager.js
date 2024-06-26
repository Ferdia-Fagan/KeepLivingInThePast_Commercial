"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDBManager = exports.EditableDB_Manager = exports.stitchObjects = void 0;
const DB_1 = require("../../layers/layer0_db/DB");
const DB_WithCache_Manager_1 = require("../DB_WithCache_Manager/DB_WithCache_Manager");
const BASE_DB_LAYER = DB_1.DBConnectionBase.name;
const haveReachedBaseDBLayer = (dbLayerName) => dbLayerName === BASE_DB_LAYER;
// export {
//     EditableDB_Manager
// }
//
//
//
// export class NonEditableDB_Manager<
//     STORE_OBJECT_T extends StoreObjectStub
// > implements
//     NonEditableStoreDBInterface<STORE_OBJECT_T> {
//
//     db: NonEditableStoreDBInterface<STORE_OBJECT_T>
//
//     constructor(db: NonEditableDB<STORE_OBJECT_T>) {
//         this.db = db
//
//         const dbPrototype = Object.getPrototypeOf(db)
//         const a2 = Object.getPrototypeOf(dbPrototype)
//         const a3 = Object.getPrototypeOf(a2)
//         const b1 = Object.getOwnPropertyNames(dbPrototype)
//         const b2 = Object.getOwnPropertyNames(a2)
//         const b3 = Object.getOwnPropertyNames(a3)
//         for(var key in db){
//             console.log(key)
//         }
//
//         // let currentLayerPrototype = Object.getPrototypeOf(db)
//         // while(!haveReachedBaseDBLayer(currentLayerPrototype.name)){
//         //     const currentLayerFuncNames = Object.getOwnPropertyNames(currentLayerPrototype)
//         //     currentLayerFuncNames.forEach(funcName => {
//         //         const x = funcName as keyof EditableStoreDBInterface<STORE_OBJECT_T>
//         //         this[x] = this.db[x].bind(this.db)
//         //     })
//         // }
//
//         const a = [
//             ...b2,
//             ...b3
//         ].filter(l => l !== "constructor")
//         const aaa: String = "fdsa"
//         a.forEach(funcName => {
//             const x = funcName as keyof NonEditableStoreDBInterface<STORE_OBJECT_T>
//             this[x] = this.db[x].bind(this.db)
//         })
//
//     }
//
//     addObj: (newElementToStore: STORE_OBJECT_T) => Promise<number>
//
//     addObjs: (newObjectsToAdd: Array<STORE_OBJECT_T>) => Promise<Persisted<STORE_OBJECT_T>[]>
//
//     getObjByIndexColumn: (indexName: string, value: IDBValidKey) => Promise<Persisted<STORE_OBJECT_T>>
//     getObjById: (id: number) => Promise<Persisted<STORE_OBJECT_T>>
//     getObjsByIds: (objectIds: number[]) => Promise<Persisted<STORE_OBJECT_T>[]>
//     getObjByKey: (key: KEY_TYPE) => Promise<Persisted<STORE_OBJECT_T>>
//     getObjByKeys: (keys: KEY_TYPE[]) => Promise<Persisted<STORE_OBJECT_T>[]>
//
//     getAllObjs: () => Promise<Persisted<STORE_OBJECT_T>[]>
//
//     deleteObjById: (objId: number) => void
//
// }
//
// class EditableDB_Manager<
//     STORE_OBJECT_T extends StoreObjectStub,
//     UPDATE_STORE_OBJECT_T extends UpdatedStoreObjectStub
// > extends
//     NonEditableDB_Manager<STORE_OBJECT_T>
// implements
//     EditableStoreDBInterface<STORE_OBJECT_T,UPDATE_STORE_OBJECT_T> {
//
//     db: A_EditableDBController<STORE_OBJECT_T, UPDATE_STORE_OBJECT_T>
//
//     updateObject: (storeObject: UPDATE_STORE_OBJECT_T) => void
//
// }
//
// class DB_Manager<T = A_Generic_DBController> {
//     db: T
//     constructor(db: T) {
//         let currentLayerPrototype = Object.getPrototypeOf(db)
//         while(!haveReachedBaseDBLayer(currentLayerPrototype.constructor.name)){
//             currentLayerPrototype = Object.getPrototypeOf(currentLayerPrototype)
//             const currentLayerFuncNames = Object.getOwnPropertyNames(currentLayerPrototype)
//             currentLayerFuncNames.filter(l => l !== "constructor").forEach(funcName => {
//                 const x = funcName as keyof T
//                 this[x] = this.db[x].bind(this.db)
//             })
//         }
//     }
// }
//
function stitchObjects(controller, db) {
    const methodsToNotStitch = new Set(Object.getOwnPropertyNames(controller).filter(item => typeof controller[item] === 'function'));
    const a = Object.getPrototypeOf(controller);
    const a1 = Object.getOwnPropertyNames(a);
    const b = Object.getPrototypeOf(a);
    const b1 = Object.getOwnPropertyNames(b);
    // const methodsToNotStitch = new Set(
    //     Object.getOwnPropertyNames(Object.getPrototypeOf())
    // )
    let currentLayerPrototype = Object.getPrototypeOf(db);
    while (!haveReachedBaseDBLayer(currentLayerPrototype.constructor.name)) {
        currentLayerPrototype = Object.getPrototypeOf(currentLayerPrototype);
        const currentLayerFuncNames = Object.getOwnPropertyNames(currentLayerPrototype);
        currentLayerFuncNames
            .filter(l => l !== "constructor")
            .filter(l => l in methodsToNotStitch)
            .forEach(funcName => {
            const x = funcName;
            controller[x] = controller.db[x].bind(this.db);
        });
    }
    return controller;
}
exports.stitchObjects = stitchObjects;
class EditableDB_Manager {
    constructor(db, methodsToNotStitch = null) {
        if (methodsToNotStitch == null) {
            const a0 = Object.getOwnPropertyNames(this);
            const a = Object.getPrototypeOf(DB_WithCache_Manager_1.EditableDB_WithCache_Manager);
            const a1 = Object.getOwnPropertyNames(a);
            const b = Object.getPrototypeOf(a);
            const b1 = Object.getOwnPropertyNames(b);
            const c = Object.getPrototypeOf(b);
            const c1 = Object.getOwnPropertyNames(c);
            methodsToNotStitch = new Set(Object.getOwnPropertyNames(b));
        }
        let currentLayerPrototype = Object.getPrototypeOf(db);
        while (!haveReachedBaseDBLayer(currentLayerPrototype.constructor.name)) {
            currentLayerPrototype = Object.getPrototypeOf(currentLayerPrototype);
            const currentLayerFuncNames = Object.getOwnPropertyNames(currentLayerPrototype);
            currentLayerFuncNames
                .filter(l => l !== "constructor")
                .filter(l => l in methodsToNotStitch)
                .forEach(funcName => {
                const x = funcName;
                this[x] = this.db[x].bind(this.db);
            });
        }
    }
}
exports.EditableDB_Manager = EditableDB_Manager;
function createDBManager(db, funcsToReplace = []) {
    // const obj: T & any = {
    //     db: db
    // }
    //
    // let currentLayerPrototype = Object.getPrototypeOf(db)
    // while(!haveReachedBaseDBLayer(currentLayerPrototype.constructor.name)){
    //     currentLayerPrototype = Object.getPrototypeOf(currentLayerPrototype)
    //     const currentLayerFuncNames = Object.getOwnPropertyNames(currentLayerPrototype)
    //     currentLayerFuncNames.filter(l => l !== "constructor").forEach(funcName => {
    //         const x = funcName as keyof T
    //         obj[x] = obj.db[x].bind(obj.db)
    //     })
    // }
    return new EditableDB_Manager(db);
}
exports.createDBManager = createDBManager;
// interface cons {
//     new<T = isA_Generic_EditableDB_Manager>(db: A_Generic_DBController): T
// }
//
// type isA_Generic_EditableDB_Manager =
//     A_EditableDBController<any, any>
//     |
//     A_NonEditableDBController<any>
//
//
//
//
// function createDBManager<T = isA_Generic_EditableDB_Manager>(theType: isA_Generic_EditableDB_Manager, db: A_Generic_DBController): T {
//     return new theType<T>(db)
// }
//# sourceMappingURL=DB_Manager.js.map