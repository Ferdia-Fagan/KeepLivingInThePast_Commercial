import {stitch} from "../../../../../utils/Stitching";
import {DBConnection_A} from "../layers/layer0_db/DB_Abstract";
import {EditableStoreDB_I} from "../layers/layer0_db/implementations/EditableDB";
import {NonPersistedStoreObjectStub, UpdatedStoreObjectStub} from "../layers/layer0_db/store_object/StoreObject_Dtos";
import {KEY_TYPE, Persisted} from "../layers/layer0_db/store_object/StoreObject_Types";
import {
    A_EditableDBControllerLayer,
    A_Generic_DBController,
    A_NonEditableDBController
} from "../layers/layer0_db/types/DB_Types";

export class EditableDB_Manager<
    STORE_OBJECT_T extends NonPersistedStoreObjectStub,
    UPDATE_STORE_OBJECT_T extends UpdatedStoreObjectStub
> implements
    EditableStoreDB_I<STORE_OBJECT_T, UPDATE_STORE_OBJECT_T> {

    db: A_EditableDBControllerLayer<STORE_OBJECT_T, UPDATE_STORE_OBJECT_T>
    constructor(
        db: A_NonEditableDBController<STORE_OBJECT_T>,
        methodsToNotStitch: Set<string> = null
    ) {
        this.db = db
        stitch<EditableDB_Manager<STORE_OBJECT_T,UPDATE_STORE_OBJECT_T>>({
            _this : this, 
            methodsToNotStitch : methodsToNotStitch,
            keyToObjectToSwitch : "db"
        })
    }

    addObj: (newElementToStore: STORE_OBJECT_T) => Promise<Persisted<STORE_OBJECT_T>>

    addObjs: (newObjectsToAdd: Array<STORE_OBJECT_T>) => Promise<Persisted<STORE_OBJECT_T>[]>

    getObjByIndexColumn: (indexName: string, value: IDBValidKey) => Promise<Persisted<STORE_OBJECT_T>>
    getObjById: (id: number) => Promise<Persisted<STORE_OBJECT_T>>
    getObjsByIds: (objectIds: number[]) => Promise<Persisted<STORE_OBJECT_T>[]>
    getObjByKey: (key: KEY_TYPE) => Promise<Persisted<STORE_OBJECT_T>>
    getObjsByKeys: (keys: KEY_TYPE[]) => Promise<Persisted<STORE_OBJECT_T>[]>

    getAllObjs: () => Promise<Persisted<STORE_OBJECT_T>[]>

    deleteObjById: (objId: number) => Promise<void>

    updateObject: (storeObject: UPDATE_STORE_OBJECT_T) => void
}

export interface CreateDBManagerParams<
    STORE_OBJECT_T extends NonPersistedStoreObjectStub,
    UPDATE_STORE_OBJECT_T extends UpdatedStoreObjectStub   
> {
    db: A_EditableDBControllerLayer<STORE_OBJECT_T, UPDATE_STORE_OBJECT_T>
    methodsToNotStitch?: Set<string>
}

export function createDBManager<
    STORE_OBJECT_T extends NonPersistedStoreObjectStub,
    UPDATE_STORE_OBJECT_T extends UpdatedStoreObjectStub
>(
    {
        db, methodsToNotStitch
    }: CreateDBManagerParams<STORE_OBJECT_T, UPDATE_STORE_OBJECT_T>
): EditableStoreDB_I<STORE_OBJECT_T, UPDATE_STORE_OBJECT_T>{
    return new EditableDB_Manager(db, methodsToNotStitch)
}
