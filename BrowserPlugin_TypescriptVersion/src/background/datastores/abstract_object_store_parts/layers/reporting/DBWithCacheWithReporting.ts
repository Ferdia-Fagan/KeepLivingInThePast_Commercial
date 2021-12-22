// TODO: abstract reporting behavior to modular dtos.tabs.

import {DBWithCache} from "../cache/DBWithCache";
import IndexObject from "../../../store_objects_interfaces/base_store_objects/IndexObject";
import {DBReportingManager} from "./utils/DBReporting";
import {CreateDBStore, CreateDBStoreHandler} from "../../factory/BuildDB";

interface ReportingOnAddObjectsInterface<STORE_T extends IndexObject> {
    addObject(value: STORE_T): Promise<number>
}
interface ReportingOnUpdateObjectsInterface<
    STORE_T_UPDATE_INTERFACE extends IndexObject
> {
    updateObject(value: STORE_T_UPDATE_INTERFACE): void
    deleteObjectById(elementId: number): void
}


export abstract class DBWithCacheWithReporting<
    STORE_T extends IndexObject,
    UPDATE_REPORT_INTERFACE extends IndexObject,
>
        extends DBWithCache<STORE_T, UPDATE_REPORT_INTERFACE> {

    reportingManager: DBReportingManager<UPDATE_REPORT_INTERFACE>
    protected constructor(storeName: string, db: IDBDatabase, areReportingAllChanges: boolean) {
        super(storeName, db)
        this.reportingManager = new DBReportingManager(areReportingAllChanges)
     }
}

export abstract class DBWithCacheWithReportingOfInsertedObjects<
    STORE_T extends IndexObject,
    UPDATE_REPORT_INTERFACE extends IndexObject
>
        extends DBWithCacheWithReporting<
            STORE_T,
            UPDATE_REPORT_INTERFACE
        >
            implements ReportingOnAddObjectsInterface<STORE_T> {

    protected constructor(storeName: string, db: IDBDatabase, areReportingAllChanges: boolean = false) {
        super(storeName, db, areReportingAllChanges)
    }

    async addObject(object: STORE_T): Promise<number> {
        return await super.addObject(object).then(
            objectId => {
                object.id = objectId
                let newObjectReport = object as unknown as UPDATE_REPORT_INTERFACE
                this.reportingManager.reportAddObject(objectId, newObjectReport)
                return objectId;
            }
        )
    }
}

export abstract class DBWithCacheWithReportingOfAllOperationsOnData<
    STORE_T extends IndexObject,
    UPDATE_REPORT_INTERFACE extends IndexObject,
>
        extends DBWithCacheWithReportingOfInsertedObjects<
            STORE_T,
            UPDATE_REPORT_INTERFACE
        >
            implements  ReportingOnAddObjectsInterface<STORE_T>,
                        ReportingOnUpdateObjectsInterface<UPDATE_REPORT_INTERFACE>
{

    protected constructor(storeName: string, db: IDBDatabase) {
        super(storeName, db, true)
    }

    updateObject(object: UPDATE_REPORT_INTERFACE): void {
        let updateReport = object as unknown as UPDATE_REPORT_INTERFACE
        this.reportingManager.reportUpdateObject(object.id, updateReport)
        super.updateObject(object)
    }

    deleteObjectById(objectId: number): void{
        this.reportingManager.reportDeleteObject(objectId)
        super.deleteObjectById(objectId)
    }
}

export interface DBBuilderInterface<
    STORE_T extends IndexObject,
    KEY_T extends IDBValidKey,
    STORE_T_UPDATE_INTERFACE extends IndexObject,
    T extends DBWithCacheWithReporting<STORE_T, STORE_T_UPDATE_INTERFACE>
    > {
    new (storeName: string, db: IDBDatabase): T
}

export async function builder<
    STORE_T extends IndexObject,
    KEY_T extends IDBValidKey,
    UPDATE_REPORT_INTERFACE extends IndexObject,
    T extends DBWithCacheWithReporting<
        STORE_T,  UPDATE_REPORT_INTERFACE
    >
>(
    DATABASE: string, DB_VERSION: number,STORE_NAME: string,
    createDBStore: CreateDBStoreHandler,
    objectToBuild: DBBuilderInterface<STORE_T, KEY_T,  UPDATE_REPORT_INTERFACE, T>
): Promise<T> {
    let createDB: IDBDatabase = await CreateDBStore(DATABASE, DB_VERSION, createDBStore)

    return new objectToBuild(STORE_NAME, createDB);
}

// export interface DBBuilderInterface {
//     // new <
//     //     STORE_T extends IndexObject, KEY_T extends IDBValidKey,
//     //     T extends DBWithCacheWithReporting<STORE_T, KEY_T>,
//     // > (storeName: string, db: IDBDatabase): T
//     new<STORE_T extends IndexObject, KEY_T extends IDBValidKey>
//         (storeName: string, db: IDBDatabase): DBWithCacheWithReporting<STORE_T, KEY_T>
// }
//
// export async function builder<
//     STORE_T extends IndexObject, KEY_T extends IDBValidKey,
//     T extends DBWithCacheWithReporting<STORE_T, KEY_T>
// >(
//     DATABASE: string, DB_VERSION: number,STORE_NAME: string,
//     createDBStore: CreateDBStoreHandler,
//     objectToBuild: DBBuilderInterface
// ): Promise<T> {
//     var createDB: IDBDatabase = await CreateDBStore(DATABASE, DB_VERSION, createDBStore)
//
//     // return new objectToBuild<STORE_T, KEY_T, T>(STORE_NAME, createDB);
//     return new objectToBuild<STORE_T, KEY_T>(STORE_NAME, createDB) as T;
// }