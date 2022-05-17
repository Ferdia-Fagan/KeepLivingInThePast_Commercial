import {keys} from "ts-transformer-keys";
import {DBConnection_A} from "../layers/layer0_db/DB_Abstract";
import {EditableDB, EditableStoreDB_I} from "../layers/layer0_db/implementations/EditableDB";
import {NonEditableDB, NonEditableStoreDB_I} from "../layers/layer0_db/implementations/NonEditableDB";
import {
    NonPersistedStoreObjectStub,
    UpdatedStoreObjectStub
} from "../layers/layer0_db/store_object/StoreObject_Dtos";
import {KEY_TYPE, Persisted} from "../layers/layer0_db/store_object/StoreObject_Types";
import {
    A_EditableDBController,
    A_Generic_DBController,
    A_NonEditableDBController
} from "../layers/layer0_db/types/DB_Types";
import {DBComponent, EditableDB_WithCache_Manager} from "./DB_WithCache_Manager";

const BASE_DB_LAYER = DBConnection_A.name
const haveReachedBaseDBLayer = (dbLayerName: string) => dbLayerName === BASE_DB_LAYER


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

export function stitchObjects<
    STORE_OBJECT_T extends NonPersistedStoreObjectStub,
    UPDATE_STORE_OBJECT_T extends UpdatedStoreObjectStub
>(
    controller: DBComponent<STORE_OBJECT_T, UPDATE_STORE_OBJECT_T> & any,
    db: A_EditableDBController<STORE_OBJECT_T, UPDATE_STORE_OBJECT_T>
): DBComponent<STORE_OBJECT_T, UPDATE_STORE_OBJECT_T> {
    const methodsToNotStitch = new Set(Object.getOwnPropertyNames(controller).filter(item => typeof controller[item] === 'function'))
    const a = Object.getPrototypeOf(controller)
    const a1 = Object.getOwnPropertyNames(a)
    const b = Object.getPrototypeOf(a)
    const b1 = Object.getOwnPropertyNames(b)
    // const methodsToNotStitch = new Set(
    //     Object.getOwnPropertyNames(Object.getPrototypeOf())
    // )
    let currentLayerPrototype = Object.getPrototypeOf(db)
    while(!haveReachedBaseDBLayer(currentLayerPrototype.constructor.name)){
        currentLayerPrototype = Object.getPrototypeOf(currentLayerPrototype)
        const currentLayerFuncNames = Object.getOwnPropertyNames(currentLayerPrototype)
        currentLayerFuncNames
            .filter(l => l !== "constructor")
            .filter(l => l !in methodsToNotStitch)
            .forEach(funcName => {
                const x = funcName as keyof EditableStoreDB_I<STORE_OBJECT_T, UPDATE_STORE_OBJECT_T>
                controller[x] = controller.db[x].bind(this.db)
            })
    }
    return controller
}

export class EditableDB_Manager<
    STORE_OBJECT_T extends NonPersistedStoreObjectStub,
    UPDATE_STORE_OBJECT_T extends UpdatedStoreObjectStub
> implements
    EditableStoreDB_I<STORE_OBJECT_T, UPDATE_STORE_OBJECT_T> {

    db: A_EditableDBController<STORE_OBJECT_T, UPDATE_STORE_OBJECT_T>
    constructor(
        db: A_NonEditableDBController<STORE_OBJECT_T>,
        methodsToNotStitch: Set<string> = null

    ) {
        if(methodsToNotStitch == null){
            const a0 = Object.getOwnPropertyNames(this)
            const a = Object.getPrototypeOf(EditableDB_WithCache_Manager)
            const a1 = Object.getOwnPropertyNames(a)
            const b = Object.getPrototypeOf(a)
            const b1 = Object.getOwnPropertyNames(b)
            const c = Object.getPrototypeOf(b)
            const c1 = Object.getOwnPropertyNames(c)
            methodsToNotStitch = new Set(Object.getOwnPropertyNames(b))
        }
        let currentLayerPrototype = Object.getPrototypeOf(db)
        while(!haveReachedBaseDBLayer(currentLayerPrototype.constructor.name)){
            currentLayerPrototype = Object.getPrototypeOf(currentLayerPrototype)
            const currentLayerFuncNames = Object.getOwnPropertyNames(currentLayerPrototype)
            currentLayerFuncNames
                .filter(l => l !== "constructor")
                .filter(l => l !in methodsToNotStitch)
                .forEach(funcName => {
                    const x = funcName as keyof EditableStoreDB_I<STORE_OBJECT_T, UPDATE_STORE_OBJECT_T>
                    this[x] = this.db[x].bind(this.db)
            })
        }
    }

    addObj: (newElementToStore: STORE_OBJECT_T) => Promise<number>

    addObjs: (newObjectsToAdd: Array<STORE_OBJECT_T>) => Promise<Persisted<STORE_OBJECT_T>[]>

    getObjByIndexColumn: (indexName: string, value: IDBValidKey) => Promise<Persisted<STORE_OBJECT_T>>
    getObjById: (id: number) => Promise<Persisted<STORE_OBJECT_T>>
    getObjsByIds: (objectIds: number[]) => Promise<Persisted<STORE_OBJECT_T>[]>
    getObjByKey: (key: KEY_TYPE) => Promise<Persisted<STORE_OBJECT_T>>
    getObjByKeys: (keys: KEY_TYPE[]) => Promise<Persisted<STORE_OBJECT_T>[]>

    getAllObjs: () => Promise<Persisted<STORE_OBJECT_T>[]>

    deleteObjById: (objId: number) => void

    updateObject: (storeObject: UPDATE_STORE_OBJECT_T) => void
}


export function createDBManager<T = A_Generic_DBController>(db: T, funcsToReplace: string[] = []): EditableDB_Manager<any, any> {
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

    return new EditableDB_Manager(db)
}


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


