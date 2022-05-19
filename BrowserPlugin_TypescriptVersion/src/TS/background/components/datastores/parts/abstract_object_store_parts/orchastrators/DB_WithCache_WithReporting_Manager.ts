import {EditableStoreDB_I} from "../layers/layer0_db/implementations/EditableDB";
import {NonPersistedStoreObjectStub, UpdatedStoreObjectStub} from "../layers/layer0_db/store_object/StoreObject_Dtos";
import {Persisted, PersistedStoreObject} from "../layers/layer0_db/store_object/StoreObject_Types";
import {A_EditableDBController} from "../layers/layer0_db/types/DB_Types";
import {DBCacheInterface} from "../layers/layer1_cache/DBCache_Implementations";
import {A_DBCacheController} from "../layers/layer1_cache/DBCache_Types";
import {A_DBAllOperationsReportingController} from "../layers/layer2_reporting/DBReporting_Types";

interface EditableDB_WithCache_WithReporting<
    STORE_OBJECT_T extends NonPersistedStoreObjectStub,
    UPDATE_STORE_OBJECT_T extends UpdatedStoreObjectStub
>
    extends EditableStoreDB_I<
        STORE_OBJECT_T, UPDATE_STORE_OBJECT_T
    > {}


class DB_WithCache_WithReporting_Manager<
    STORE_OBJECT_T extends NonPersistedStoreObjectStub,
    UPDATE_STORE_OBJECT_T extends UpdatedStoreObjectStub
>
    implements EditableDB_WithCache_WithReporting< STORE_OBJECT_T, UPDATE_STORE_OBJECT_T >
{
    db: A_EditableDBController<STORE_OBJECT_T,UPDATE_STORE_OBJECT_T>
    cache: A_DBCacheController<STORE_OBJECT_T>
    report: A_DBAllOperationsReportingController<Persisted<STORE_OBJECT_T>>

    constructor(
        db: A_EditableDBController<STORE_OBJECT_T,UPDATE_STORE_OBJECT_T>,
        cache: A_DBCacheController<STORE_OBJECT_T>,
        report: A_DBAllOperationsReportingController<Persisted<STORE_OBJECT_T>>
    ) {
        this.db = db
        this.cache = cache
        this.report = report

        const a = Object.getOwnPropertyNames(this)
        const b = Object.getPrototypeOf(this)
        const c = Object.getOwnPropertyNames(b)
        const d = Object.getPrototypeOf(b)
        const e = Object.getOwnPropertyNames(d)

        console.log()
    }

    addObj(newElementToStore: STORE_OBJECT_T): Promise<Persisted<STORE_OBJECT_T>> {
        return this.db.addObj(newElementToStore).then(newObjAdded => {
            this.cache.cacheObjectWithId(newObjAdded.id, newElementToStore)
            this.report.reportAddedObject(newObjAdded)
            return newObjAdded
        })
    }

    addObjs(newObjectsToAdd: Array<STORE_OBJECT_T>): Promise<Persisted<STORE_OBJECT_T>[]> {
        return this.db.addObjs(newObjectsToAdd).then(newObjectsAdded => {
            newObjectsAdded.forEach(newObjectAdded => {
                this.cache.cacheObjectWithId(newObjectAdded.id, newObjectAdded)
                this.report.reportAddedObject(newObjectAdded)
            })
            return newObjectsAdded
        })
    }

    updateObject(storeObject: UPDATE_STORE_OBJECT_T): void {
        // todo: refactor
        this.db.updateObject(storeObject)
        this.report.reportUpdateObject(storeObject as any)
    }

    deleteObjById(objId: number): Promise<void> {
        return this.db.getObjById(objId).then(obj => {
            this.db.deleteObjById(objId)
            this.cache.deleteObjByKey(obj.key)
            this.report.reportDeletedObject(objId)
        })
    }

}



