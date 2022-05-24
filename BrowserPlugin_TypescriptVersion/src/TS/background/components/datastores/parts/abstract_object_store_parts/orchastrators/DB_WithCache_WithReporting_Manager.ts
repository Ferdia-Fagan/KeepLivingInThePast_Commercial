import {
    StoreObjectInterfaceExample
} from "../../../../../../../../tests/background/datastores/abstract_object_store_parts/utils/DBWIthCache__StoreDummy";
import {EditableStoreDB_I} from "../layers/layer0_db/implementations/EditableDB";
import {NonPersistedStoreObjectStub, UpdatedStoreObjectStub} from "../layers/layer0_db/store_object/StoreObject_Dtos";
import {Persisted, PersistedStoreObject} from "../layers/layer0_db/store_object/StoreObject_Types";
import {A_EditableDBController} from "../layers/layer0_db/types/DB_Types";
import {DBCacheInterface} from "../layers/layer1_cache/DBCache_Implementations";
import {A_DBCacheController} from "../layers/layer1_cache/DBCache_Types";
import {A_DBAllOperationsReportingController} from "../layers/layer2_reporting/DBReporting_Types";
import {
    DBAllOperationsReporting,
    DBAllOperationsReporting_I,
    DBReportInterface
} from "../layers/layer2_reporting/implementations/DBAllOperationsReporting";
import {ExtractReportInformationFunc} from "../layers/layer2_reporting/implementations/DBInsertOperationsReporting";
import {EditableDB_WithCache_Manager} from "./DB_WithCache_Manager";

interface EditableDB_WithCache_WithReporting<
    STORE_OBJECT_T extends NonPersistedStoreObjectStub,
    UPDATE_STORE_OBJECT_T extends UpdatedStoreObjectStub
>
    extends EditableStoreDB_I<
        STORE_OBJECT_T, UPDATE_STORE_OBJECT_T
    > {}

class EditableDB_WithCache_WithReporting_Manager<
    STORE_OBJECT_T extends NonPersistedStoreObjectStub,
    UPDATE_STORE_OBJECT_T extends UpdatedStoreObjectStub,
    R_STORE_REPORT_T extends PersistedStoreObject
>
    extends EditableDB_WithCache_Manager<STORE_OBJECT_T, UPDATE_STORE_OBJECT_T>
    implements
        EditableDB_WithCache_WithReporting< STORE_OBJECT_T, UPDATE_STORE_OBJECT_T >
{
    report: A_DBAllOperationsReportingController<STORE_OBJECT_T,R_STORE_REPORT_T>

    constructor(
        db: A_EditableDBController<STORE_OBJECT_T,UPDATE_STORE_OBJECT_T>,
        cache: A_DBCacheController<STORE_OBJECT_T>,
        report: A_DBAllOperationsReportingController<STORE_OBJECT_T,R_STORE_REPORT_T>
    ) {
        super(db, cache)
        this.report = report
    }

    addObj = (newElementToStore: STORE_OBJECT_T): Promise<Persisted<STORE_OBJECT_T>> =>
        super.addObj(newElementToStore).then( (newObj: Persisted<STORE_OBJECT_T>) => {
            this.report.reportAddedObject(newObj)
            return newObj
        })

    addObjs = (newObjectsToAdd: Array<STORE_OBJECT_T>): Promise<Persisted<STORE_OBJECT_T>[]> =>
        super.addObjs(newObjectsToAdd).then(newObjectsAdded => {
            this.report.reportAddedObjects(newObjectsAdded)
            return newObjectsAdded
        })

    updateObject? = (storeObject: UPDATE_STORE_OBJECT_T): void => {
        super.updateObject(storeObject)
        this.report.reportUpdateObject(storeObject as any)
    }

    deleteObjById(objId: number): Promise<void> {
        return super.deleteObjById(objId).then(_ => {
            this.report.reportDeletedObject(objId)
        })
    }

}

export function create_DB_WithCache_WithReporting_Manager<
    STORE_OBJECT_T extends NonPersistedStoreObjectStub,
    UPDATE_STORE_OBJECT_T extends UpdatedStoreObjectStub,
    R_STORE_REPORT_T extends PersistedStoreObject
>(
    db: A_EditableDBController<STORE_OBJECT_T,UPDATE_STORE_OBJECT_T>,
    cache: DBCacheInterface<STORE_OBJECT_T>,
    extractReportInformationFunc: ExtractReportInformationFunc<STORE_OBJECT_T, R_STORE_REPORT_T>,
    prepopulateCache?: StoreObjectInterfaceExample[],
    prepopulateReport?: DBReportInterface<R_STORE_REPORT_T>
): EditableDB_WithCache_WithReporting_Manager<STORE_OBJECT_T, UPDATE_STORE_OBJECT_T, R_STORE_REPORT_T> {
    const manager =  new EditableDB_WithCache_WithReporting_Manager<
        STORE_OBJECT_T,
        UPDATE_STORE_OBJECT_T,
        R_STORE_REPORT_T
    >(
        db,
        cache,
        new DBAllOperationsReporting<
            STORE_OBJECT_T, R_STORE_REPORT_T
            >(prepopulateReport, extractReportInformationFunc)
    )
    prepopulateCache.forEach(obj => {
        manager.cache.cacheObject(obj as any)
    })

    return manager
    // return stitchObjects(
    //     new EditableDB_WithCache_Manager(db,cache),
    //     db
    // ) as (EditableDB_WithCache_Manager<STORE_OBJECT_T, UPDATE_STORE_OBJECT_T> & EditableStoreDB_I<STORE_OBJECT_T, UPDATE_STORE_OBJECT_T>)
}


