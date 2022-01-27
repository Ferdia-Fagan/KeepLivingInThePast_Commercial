import {IndexObject} from "../../store_objects_interfaces/base_store_objects/IndexObject";
import {DBWithCache} from "../layers/layer1_cache/DBWithCache";
import {DBWithCacheWithReporting} from "../layers/layer2_reporting/DBWithCacheWithReporting";

export default interface DBWithCacheWithReportingBuilderInterface<
    STORE_T extends IndexObject,
    KEY_T extends IDBValidKey
> {
    new (storeName: string, db: IDBDatabase): DBWithCacheWithReporting<STORE_T, KEY_T>;
}