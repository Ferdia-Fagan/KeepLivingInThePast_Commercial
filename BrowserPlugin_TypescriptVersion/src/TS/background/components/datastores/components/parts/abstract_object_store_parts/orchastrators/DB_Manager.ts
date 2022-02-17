import {keys} from "ts-transformer-keys";
import {
    A_EditableDBController,
    A_NonEditableDBController,
    EditableStoreDBInterface,
    NonEditableStoreDBInterface
} from "../layers/layer0_db/DB";
import {KEY_TYPE, Persisted, StoreObjectStub, UpdatedStoreObjectStub} from "../layers/layer0_db/store_object/Types";

export {
    EditableDB_Manager
}

export class NonEditableDB_Manager<
    STORE_OBJECT_T extends StoreObjectStub
> implements
    NonEditableStoreDBInterface<STORE_OBJECT_T> {

    db: NonEditableStoreDBInterface<STORE_OBJECT_T>
    
    constructor(db: NonEditableStoreDBInterface<STORE_OBJECT_T>) {
        this.db = db

        const x: NonEditableStoreDBInterface<STORE_OBJECT_T> = {

        }

        // interface Props {
        //     id: string;
        //     name: string;
        //     age: number;
        // }
        // Object.keys(Props)
        // const keysOfProps = keys<NonEditableStoreDBInterface>();

        debugger
        // this.addObj = this.db.addObj.bind(this.db)

        this.addObjs = this.db.addObjs.bind(this.db)

        this.deleteObjById = this.db.deleteObjById.bind(this.db)

        this.getAllObjs = this.db.getAllObjs.bind(this.db)

        this.getObjById = this.db.getObjById.bind(this.db)

        this.getObjByIndexColumn = this.db.getObjByIndexColumn.bind(this.db)

        this.getObjByKey = this.db.getObjByKey.bind(this.db)

        this.getObjByKeys = this.db.getObjByKeys.bind(this.db)

        this.getObjsByIds = this.db.getObjsByIds.bind(this.db)

        const y = Object.keys(
            this
        )
        debugger
    }

    addObj(newElementToStore: STORE_OBJECT_T){
        return this.db.addObj(newElementToStore)
    }

    // addObj: (newElementToStore: STORE_OBJECT_T) => Promise<number>

    addObjs: (newObjectsToAdd: Array<STORE_OBJECT_T>) => Promise<Persisted<STORE_OBJECT_T>[]>

    getObjByIndexColumn: (indexName: string, value: IDBValidKey) => Promise<Persisted<STORE_OBJECT_T>>
    getObjById: (id: number) => Promise<Persisted<STORE_OBJECT_T>>
    getObjsByIds: (objectIds: number[]) => Promise<Persisted<STORE_OBJECT_T>[]>
    getObjByKey: (key: KEY_TYPE) => Promise<Persisted<STORE_OBJECT_T>>
    getObjByKeys: (keys: KEY_TYPE[]) => Promise<Persisted<STORE_OBJECT_T>[]>

    getAllObjs: () => Promise<Persisted<STORE_OBJECT_T>[]>

    deleteObjById: (objId: number) => void

}

class EditableDB_Manager<
    STORE_OBJECT_T extends StoreObjectStub,
    UPDATE_STORE_OBJECT_T extends UpdatedStoreObjectStub
> extends
    NonEditableDB_Manager<STORE_OBJECT_T>
implements
    EditableStoreDBInterface<STORE_OBJECT_T,UPDATE_STORE_OBJECT_T> {

    db: A_EditableDBController<STORE_OBJECT_T, UPDATE_STORE_OBJECT_T>

    constructor(db: A_EditableDBController<STORE_OBJECT_T, UPDATE_STORE_OBJECT_T>) {
        super(db)

        this.updateObject = this.db.updateObject.bind(this.db)
    }

    updateObject: (storeObject: UPDATE_STORE_OBJECT_T) => void


}


