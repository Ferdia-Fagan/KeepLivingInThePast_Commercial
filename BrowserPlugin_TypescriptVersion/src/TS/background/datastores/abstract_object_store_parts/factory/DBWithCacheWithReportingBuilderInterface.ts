import IndexKeyObject from "../../store_objects_interfaces/base_store_objects/IndexKeyObject";
import {DBWithCache} from "../layers/cache/DBWithCache";
import {DBWithCacheWithReporting} from "../layers/reporting/DBWithCacheWithReporting";

export default interface DBWithCacheWithReportingBuilderInterface<
    STORE_T extends IndexKeyObject, KEY_T extends IDBValidKey
> {
    new (storeName: string, db: IDBDatabase): DBWithCacheWithReporting<STORE_T, KEY_T>;
}