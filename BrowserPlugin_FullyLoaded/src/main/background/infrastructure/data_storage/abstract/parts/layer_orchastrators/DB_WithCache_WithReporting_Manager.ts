import {EditableStoreDB_I} from "../layers/layer0_db/implementations/EditableDB";
import {NonPersistedStoreObjectStub, UpdatedStoreObjectStub} from "../layers/layer0_db/store_object/StoreObject_Dtos";
import {Persisted, PersistedStoreObject} from "../layers/layer0_db/store_object/StoreObject_Types";
import {A_EditableDBControllerLayer} from "../layers/layer0_db/types/DB_Types";
import {DBCacheInterface} from "../layers/layer1_cache/DBCache_Implementations";
import {A_DBCacheController} from "../layers/layer1_cache/DBCache_Types";
import {A_DBAllOperationsReportingController} from "../layers/layer2_reporting/DBReporting_Types";
import {
    DBAllOperationsReporting,
    DBReportInterface
} from "../layers/layer2_reporting/implementations/DBAllOperationsReporting";
import {ExtractReportInformationFunc} from "../layers/layer2_reporting/implementations/DBInsertOperationsReporting";
import {CreateDBManagerParams} from "./DB_Manager";
import {CreateDBWithCacheManagerParams, EditableDB_WithCache_Manager} from "./DB_WithCache_Manager";

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
        db: A_EditableDBControllerLayer<STORE_OBJECT_T,UPDATE_STORE_OBJECT_T>,
        cache: A_DBCacheController<STORE_OBJECT_T>,
        report: A_DBAllOperationsReportingController<STORE_OBJECT_T,R_STORE_REPORT_T>
    ) {
        super(
            db,
            new Set([
                "addObj",
                "addObjs",
                "getObjByKey",
                "getObjByIndexColumn",
                "getObjByKeys",
                "db",
                "cache",
                "deleteObjById"
            ]),
            cache
        )
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

export interface CreateDBWithCacheWithReportingManagerParams<
    STORE_OBJECT_T extends NonPersistedStoreObjectStub,
    UPDATE_STORE_OBJECT_T extends UpdatedStoreObjectStub,
    R_STORE_REPORT_T extends PersistedStoreObject
> extends CreateDBWithCacheManagerParams<STORE_OBJECT_T,UPDATE_STORE_OBJECT_T> {
    extractReportInformationFunc: ExtractReportInformationFunc<STORE_OBJECT_T, R_STORE_REPORT_T>,

    reportPrePopulateData?: DBReportInterface<R_STORE_REPORT_T>
}

export function create_DB_WithCache_WithReporting_Manager<
    STORE_OBJECT_T extends NonPersistedStoreObjectStub,
    UPDATE_STORE_OBJECT_T extends UpdatedStoreObjectStub,
    R_STORE_REPORT_T extends PersistedStoreObject
>(
    {
        db, methodsToNotStitch,
        cache, cachePrePopulateData = [],
        extractReportInformationFunc,
        reportPrePopulateData
    }: CreateDBWithCacheWithReportingManagerParams<STORE_OBJECT_T, UPDATE_STORE_OBJECT_T, R_STORE_REPORT_T>
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
        >(reportPrePopulateData, extractReportInformationFunc)
    )
    cachePrePopulateData.forEach(obj => {
        manager.cache.cacheObject(obj as any)
    })

    return manager
}


