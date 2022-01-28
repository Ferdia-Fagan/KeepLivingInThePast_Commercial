// TODO: abstract layer2_reporting behavior to modular dtos.tabs.

import {StoreObjectInterface, UpdatedStoreObjectInterface} from "../layer0_db/store_object/StoreObject";
import {ID_TYPE} from "../layer0_db/store_object/DataTypes";
import {CreateDBStore, CreateDBStoreHandler} from "../../factory/BuildDBConstructionActions";
import {DBWithCache} from "../layer1_cache/DBWithCache";
import {DBReportingManager} from "./utils/DBReporting";

export interface DBWithCacheWithReportingOfInsertedObjectsInterface<STORE_T extends StoreObjectInterface> {
    addObject(storeObject: STORE_T): Promise<ID_TYPE>
}

export interface DBWithCacheWithReportingOfOperationsOnDataInterfaces<STORE_T extends StoreObjectInterface,
    STORE_T_UPDATE_INTERFACE extends UpdatedStoreObjectInterface> extends DBWithCacheWithReportingOfInsertedObjectsInterface<STORE_T> {
    updateObject(value: STORE_T_UPDATE_INTERFACE): void
    deleteObjectById(elementId: number): void
}

export abstract class DBWithCacheWithReporting<
    STORE_T extends StoreObjectInterface,
    UPDATE_REPORT_INTERFACE extends UpdatedStoreObjectInterface,
>
        extends DBWithCache<STORE_T, UPDATE_REPORT_INTERFACE> {

    reportingManager: DBReportingManager<UPDATE_REPORT_INTERFACE>
    protected constructor(
        storeName: string, db: IDBDatabase,
        reportingManager: DBReportingManager<UPDATE_REPORT_INTERFACE>
    ) {
        super(storeName, db)
        this.reportingManager = reportingManager
    }
}

export abstract class DBWithCacheWithReportingOfInsertedObjects<
    STORE_T extends StoreObjectInterface,
    UPDATE_REPORT_INTERFACE extends UpdatedStoreObjectInterface
>
        extends DBWithCacheWithReporting<
            STORE_T,
            UPDATE_REPORT_INTERFACE
        >
            implements DBWithCacheWithReportingOfInsertedObjectsInterface<STORE_T> {

    protected constructor(storeName: string, db: IDBDatabase, reportingAllOperations = false) {
        super(
            storeName, db,
            new DBReportingManager(reportingAllOperations)
        )
    }

    async addObject(storeObject: STORE_T): Promise<ID_TYPE> {
        return await super.addObject(storeObject).then(
            objectId => {
                storeObject.id = objectId
                let newObjectReport = storeObject as unknown as UPDATE_REPORT_INTERFACE
                this.reportingManager.reportAddObject(objectId, newObjectReport)
                return objectId;
            }
        )
    }
}

export abstract class DBWithCacheWithOptionalReportingOfInsertedObjects<
    STORE_T extends StoreObjectInterface,
    UPDATE_REPORT_INTERFACE extends UpdatedStoreObjectInterface
    >
    extends DBWithCacheWithReportingOfInsertedObjects<
        STORE_T,
        UPDATE_REPORT_INTERFACE
        > {

    protected abstract checkIfStoreObjectShouldBeReported(storeObject: STORE_T): boolean

    addObject(storeObject: STORE_T): Promise<ID_TYPE> {
        if(this.checkIfStoreObjectShouldBeReported(storeObject)){
            return super.addObject(storeObject).then(
                objectId => {
                    storeObject.id = objectId
                    let newObjectReport = storeObject as unknown as UPDATE_REPORT_INTERFACE
                    this.reportingManager.reportAddObject(objectId, newObjectReport)
                    return objectId;
                }
            )
        } else {
            // no need to report
            return super.addObject(storeObject)
        }
    }

}

export abstract class DBWithCacheWithReportingOfAllOperationsOnData<
    STORE_T extends StoreObjectInterface,
    UPDATE_REPORT_INTERFACE extends UpdatedStoreObjectInterface,
>
        extends DBWithCacheWithReportingOfInsertedObjects<
            STORE_T,
            UPDATE_REPORT_INTERFACE
        >
            implements  DBWithCacheWithReportingOfInsertedObjectsInterface<STORE_T>,
                        DBWithCacheWithReportingOfOperationsOnDataInterfaces<STORE_T, UPDATE_REPORT_INTERFACE>
{

    protected constructor(storeName: string, db: IDBDatabase) {
        super(
            storeName, db,
            true
        )
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
    STORE_T extends StoreObjectInterface,
    KEY_T extends IDBValidKey,
    STORE_T_UPDATE_INTERFACE extends UpdatedStoreObjectInterface,
    T extends DBWithCacheWithReporting<STORE_T, STORE_T_UPDATE_INTERFACE>
    > {
    new (storeName: string, db: IDBDatabase): T
}

export async function builder<
    STORE_T extends StoreObjectInterface,
    KEY_T extends IDBValidKey,
    UPDATE_REPORT_INTERFACE extends UpdatedStoreObjectInterface,
    T extends DBWithCacheWithReporting<
        STORE_T,  UPDATE_REPORT_INTERFACE
    >
>(
    DATABASE: string, DB_VERSION: number,STORE_NAME: string,
    createDBStore: CreateDBStoreHandler,
    objectToBuild: DBBuilderInterface<STORE_T, KEY_T,  UPDATE_REPORT_INTERFACE, T>
): Promise<T> {
    let createDBPromise: IDBDatabase = await CreateDBStore(DATABASE, DB_VERSION, createDBStore)

    return new objectToBuild(STORE_NAME, createDBPromise);
}

// export interface DBBuilderInterface {
//     // new <
//     //     STORE_T extends Interfaces, KEY_T extends IDBValidKey,
//     //     T extends DBWithCacheWithReporting<STORE_T, KEY_T>,
//     // > (storeName: string, layer0_db: IDBDatabase): T
//     new<STORE_T extends Interfaces, KEY_T extends IDBValidKey>
//         (storeName: string, layer0_db: IDBDatabase): DBWithCacheWithReporting<STORE_T, KEY_T>
// }
//
// export async function builder<
//     STORE_T extends Interfaces, KEY_T extends IDBValidKey,
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