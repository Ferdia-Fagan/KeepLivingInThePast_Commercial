import IndexObject from "../../../../store_objects_interfaces/base_store_objects/IndexObject";

export default interface DBWithCacheWithReportingOfInsertedObjectsInterface<STORE_T extends IndexObject> {
    addObject(object: STORE_T): Promise<number>
}
