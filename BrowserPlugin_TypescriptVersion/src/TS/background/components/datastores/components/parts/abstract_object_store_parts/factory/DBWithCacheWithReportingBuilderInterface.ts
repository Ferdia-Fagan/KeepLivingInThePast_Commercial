import {UpdatedStoreObjectInterface} from "../layers/layer0_db/store_object/SObject";
import {StoreObjectStub} from "../layers/layer0_db/store_object/Types";

export default interface DBWithCacheWithReportingBuilderInterface<
    STORE_T extends StoreObjectStub,
    UPDATE_REPORT_T extends UpdatedStoreObjectInterface
> {
    new (storeName: string, db: IDBDatabase): DBWithCacheWithReporting<STORE_T, UPDATE_REPORT_T>;
}