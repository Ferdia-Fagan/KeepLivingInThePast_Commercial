import {StoreObjectInterface, UpdatedStoreObjectInterface} from "../layers/layer0_db/store_object/StoreObject";
import {DBWithCacheWithReporting} from "../layers/layer2_reporting/DBWithCacheWithReporting";

export default interface DBWithCacheWithReportingBuilderInterface<
    STORE_T extends StoreObjectInterface,
    UPDATE_REPORT_T extends UpdatedStoreObjectInterface
> {
    new (storeName: string, db: IDBDatabase): DBWithCacheWithReporting<STORE_T, UPDATE_REPORT_T>;
}