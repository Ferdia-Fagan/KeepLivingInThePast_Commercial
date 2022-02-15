
// TODO: complete

import {A_NonEditableDBController, NonEditableStoreDBInterface} from "../layers/layer0_db/DB";
import {Persisted, PersistedStoreObject, StoreObjectStub} from "../layers/layer0_db/store_object/Types";
import {DBCacheInterface} from "../layers/layer1_cache/DBCache";
import {A_DBInsertsReportingController} from "../layers/layer2_reporting/DBReporting";
import {NonEditableDB_WithCache_Manager} from "./DB_WithCache_Manager";

export class NonEditableDB_WithCache_WithReporting_Manager<
    STORE_OBJECT_T extends StoreObjectStub
> extends NonEditableDB_WithCache_Manager<STORE_OBJECT_T>
    implements NonEditableStoreDBInterface<STORE_OBJECT_T> {

    private reportManager: A_DBInsertsReportingController<Persisted<STORE_OBJECT_T>>

    constructor(
        db: A_NonEditableDBController<STORE_OBJECT_T>,
        cache: DBCacheInterface<STORE_OBJECT_T>,
        reportManager: A_DBInsertsReportingController<Persisted<STORE_OBJECT_T>>
    ) {
        super(db, cache)
        this.reportManager = reportManager
    }

    addObj = (newObjToStore: STORE_OBJECT_T) => {
        return super.addObj(newObjToStore).then(persistedObjId => {
            newObjToStore.id = persistedObjId
            this.reportManager.reportAddedObject(newObjToStore as Persisted<STORE_OBJECT_T>)
            return persistedObjId
        })
    }

    addObjs = (newObjsToAdd: Array<STORE_OBJECT_T>) => {
        return super.addObjs(newObjsToAdd).then(persistedNewObjs => {
            persistedNewObjs.forEach(persistedNewObj => {
                this.reportManager.reportAddedObject(persistedNewObj)
            })
            return persistedNewObjs
        })
    }

}

export class EditableDB_WithCache_WithReporting_Manager<
    STORE_OBJECT_T extends StoreObjectStub
    > extends NonEditableDB_WithCache_Manager<STORE_OBJECT_T>
    implements NonEditableStoreDBInterface<STORE_OBJECT_T> {

    private reportManager: A_DBInsertsReportingController<Persisted<STORE_OBJECT_T>>

    constructor(
        db: A_NonEditableDBController<STORE_OBJECT_T>,
        cache: DBCacheInterface<STORE_OBJECT_T>,
        reportManager: A_DBInsertsReportingController<Persisted<STORE_OBJECT_T>>
    ) {
        super(db, cache)
        this.reportManager = reportManager
    }

    addObj = (newObjToStore: STORE_OBJECT_T) => {
        return super.addObj(newObjToStore).then(persistedObjId => {
            newObjToStore.id = persistedObjId
            this.reportManager.reportAddedObject(newObjToStore as Persisted<STORE_OBJECT_T>)
            return persistedObjId
        })
    }

    addObjs = (newObjsToAdd: Array<STORE_OBJECT_T>) => {
        return super.addObjs(newObjsToAdd).then(persistedNewObjs => {
            persistedNewObjs.forEach(persistedNewObj => {
                this.reportManager.reportAddedObject(persistedNewObj)
            })
            return persistedNewObjs
        })
    }

}

