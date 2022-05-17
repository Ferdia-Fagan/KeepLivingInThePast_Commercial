import {NonPersistedStoreObjectStub} from "../layers/layer0_db/store_object/StoreObject_Dtos";
import {UpdatedStoreObjectInterface} from "../layers/layer0_db/store_object/SObject";

export default interface DBWithCacheWithReportingBuilderInterface<
    STORE_T extends NonPersistedStoreObjectStub,
    UPDATE_REPORT_T extends UpdatedStoreObjectInterface
> {
    new (storeName: string, db: IDBDatabase): DBWithCacheWithReporting<STORE_T, UPDATE_REPORT_T>;
}