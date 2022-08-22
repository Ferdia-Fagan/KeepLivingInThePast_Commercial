import {DBConnection_A} from "../domain/components/datastore_components/abstract/parts/layers/layer0_db/DB_Abstract";
import {
    EditableStoreDB_I
} from "../domain/components/datastore_components/abstract/parts/layers/layer0_db/implementations/EditableDB";
import {
    NonPersistedStoreObjectStub,
    UpdatedStoreObjectStub
} from "../domain/components/datastore_components/abstract/parts/layers/layer0_db/store_object/StoreObject_Dtos";
import {
    A_EditableDBControllerLayer
} from "../domain/components/datastore_components/abstract/parts/layers/layer0_db/types/DB_Types";
import {DBComponent} from "../domain/components/datastore_components/abstract/parts/layer_orchastrators/DB_WithCache_Manager";

const BASE_DB_LAYER = DBConnection_A.name
const haveReachedBaseDBLayer = (dbLayerName: string) => dbLayerName === BASE_DB_LAYER

export function stitchObjects<STORE_OBJECT_T extends NonPersistedStoreObjectStub,
    UPDATE_STORE_OBJECT_T extends UpdatedStoreObjectStub>(
    controller: DBComponent<STORE_OBJECT_T, UPDATE_STORE_OBJECT_T> & any,
    db: A_EditableDBControllerLayer<STORE_OBJECT_T, UPDATE_STORE_OBJECT_T>
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
    while (!haveReachedBaseDBLayer(currentLayerPrototype.constructor.name)) {
        currentLayerPrototype = Object.getPrototypeOf(currentLayerPrototype)
        const currentLayerFuncNames = Object.getOwnPropertyNames(currentLayerPrototype)
        currentLayerFuncNames
            .filter(l => l !== "constructor")
            .filter(l => l ! in methodsToNotStitch)
            .forEach(funcName => {
                const x = funcName as keyof EditableStoreDB_I<STORE_OBJECT_T, UPDATE_STORE_OBJECT_T>
                controller[x] = controller.db[x].bind(this.db)
            })
    }
    return controller
}

interface StitchParams<T> {
    _this: any;
    methodsToNotStitch: Set<string>;
    keyToObjectToSwitch: keyof T;
}

export function stitch<T>(
    {_this, methodsToNotStitch=null, keyToObjectToSwitch}: StitchParams<T>
) {
    const objToStitch = _this[keyToObjectToSwitch]
    let currentLayerPrototype = Object.getPrototypeOf(objToStitch)
    while (!haveReachedBaseDBLayer(currentLayerPrototype.constructor.name)) {
        const currentLayerFuncNames = Object.getOwnPropertyNames(currentLayerPrototype)
        currentLayerFuncNames
            .filter(l => l !== "constructor")
            .filter(l => methodsToNotStitch == null || !methodsToNotStitch.has(l))
            .forEach(funcName => {
                const x = funcName as keyof T
                _this[x] = _this[keyToObjectToSwitch][x].bind(_this[keyToObjectToSwitch])
            })

        currentLayerPrototype = Object.getPrototypeOf(currentLayerPrototype)
    }
}