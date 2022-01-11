import {DBWithCache} from "../../abstract_object_store_parts/layers/cache/DBWithCache";
import DB from "../../abstract_object_store_parts/layers/db/DB";
import {
    DBWithCacheWithReportingOfAllOperationsOnData,
    DBWithCacheWithReportingOfInsertedObjects
} from "../../abstract_object_store_parts/layers/reporting/DBWithCacheWithReporting";

export type StoreController = (
    DB<any, any> |
    DBWithCache<any, any> |
    DBWithCacheWithReportingOfInsertedObjects<any, any> |
    DBWithCacheWithReportingOfAllOperationsOnData<any, any>
)