import {DBWithCache} from "./layer1_cache/DBWithCache";
import DB from "./layer0_db/DB";
import {
    DBWithCacheWithReportingOfAllOperationsOnData,
    DBWithCacheWithReportingOfInsertedObjects
} from "./layer2_reporting/DBWithCacheWithReporting";

export type StoreController = (
    DB<any, any> |
    DBWithCache<any, any> |
    DBWithCacheWithReportingOfInsertedObjects<any, any> |
    DBWithCacheWithReportingOfAllOperationsOnData<any, any>
)