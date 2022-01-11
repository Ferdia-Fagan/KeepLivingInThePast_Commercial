import IndexObject from "../../../../store_objects_interfaces/base_store_objects/IndexObject";
import DBWithCacheWithReportingOfInsertedObjectsInterface from "./DBWithCacheWithReportingOfInsertedObjectsInterface";

export default interface DBWithCacheWithReportingOfAllOperationsOnDataInterface<STORE_T extends IndexObject>
                extends DBWithCacheWithReportingOfInsertedObjectsInterface<STORE_T> {
    updateObject(object: STORE_T): void
    deleteObjectById(objectId: number): void
}