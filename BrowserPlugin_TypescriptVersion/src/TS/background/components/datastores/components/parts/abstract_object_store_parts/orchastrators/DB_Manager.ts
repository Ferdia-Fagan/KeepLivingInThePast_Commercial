import {
    A_EditableDBController,
    A_NonEditableDBController,
    EditableStoreDBInterface,
    NonEditableStoreDBInterface
} from "../layers/layer0_db/DB";
import {StoreObjectStub, UpdatedStoreObjectStub} from "../layers/layer0_db/store_object/Types";

export {
    NonEditableDB_Manager, EditableDB_Manager
}

class NonEditableDB_Manager<
    STORE_OBJECT_T extends StoreObjectStub
> implements
    NonEditableStoreDBInterface<STORE_OBJECT_T> {

    db: A_NonEditableDBController<STORE_OBJECT_T>
    
    constructor(db: A_NonEditableDBController<STORE_OBJECT_T>) {
        this.db = db
    }

    addObj = this.db.addObj

    addObjs = this.db.addObjs

    deleteObjById = this.db.deleteObjById

    getAllObjs = this.db.getAllObjs

    getObjById = this.db.getObjById

    getObjByIndexColumn = this.db.getObjByIndexColumn

    getObjByKey = this.db.getObjByKey

    getObjByKeys = this.db.getObjByKeys

    getObjsByIds = this.db.getObjsByIds

}

class EditableDB_Manager<
    STORE_OBJECT_T extends StoreObjectStub,
    UPDATE_STORE_OBJECT_T extends UpdatedStoreObjectStub
> extends
    NonEditableDB_Manager<STORE_OBJECT_T>
implements
    EditableStoreDBInterface<STORE_OBJECT_T,UPDATE_STORE_OBJECT_T> {

    db: A_EditableDBController<STORE_OBJECT_T, UPDATE_STORE_OBJECT_T>

    updateObject = this.db.updateObject

}


