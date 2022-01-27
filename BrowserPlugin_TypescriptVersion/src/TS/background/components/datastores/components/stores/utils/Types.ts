import {DBWithCache} from "../../../parts/abstract_object_store_parts/layers/layer1_cache/DBWithCache";
import DB from "../../../parts/abstract_object_store_parts/layers/layer0_db/DB";
import {
    DBWithCacheWithReportingOfAllOperationsOnData,
    DBWithCacheWithReportingOfInsertedObjects
} from "../../../parts/abstract_object_store_parts/layers/layer2_reporting/DBWithCacheWithReporting";

export type StoreController = (
    DB<any, any> |
    DBWithCache<any, any> |
    DBWithCacheWithReportingOfInsertedObjects<any, any> |
    DBWithCacheWithReportingOfAllOperationsOnData<any, any>
)