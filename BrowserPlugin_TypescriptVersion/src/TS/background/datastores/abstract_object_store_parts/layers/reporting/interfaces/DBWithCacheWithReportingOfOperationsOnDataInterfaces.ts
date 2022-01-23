import {IndexObject, UpdateObjectIndex} from "../../../../store_objects_interfaces/base_store_objects/IndexObject";

export interface DBWithCacheWithReportingOfInsertedObjectsInterface<STORE_T extends IndexObject> {
    addObject(object: STORE_T): Promise<number>
}

export interface DBWithCacheWithReportingOfOperationsOnDataInterfaces<
    STORE_T extends IndexObject,
    STORE_T_UPDATE_INTERFACE extends UpdateObjectIndex
> extends DBWithCacheWithReportingOfInsertedObjectsInterface<STORE_T> {
    updateObject(object: STORE_T_UPDATE_INTERFACE): void
    deleteObjectById(objectId: number): void
}