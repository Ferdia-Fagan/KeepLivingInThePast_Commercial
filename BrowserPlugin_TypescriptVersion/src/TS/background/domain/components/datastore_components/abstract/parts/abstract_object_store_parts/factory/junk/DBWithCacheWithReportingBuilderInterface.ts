import {NonPersistedStoreObjectStub, UpdatedStoreObjectStub} from "../../../layers/layer0_db/store_object/StoreObject_Dtos";

export default interface DBWithCacheWithReportingBuilderInterface<
    STORE_T extends NonPersistedStoreObjectStub,
    UPDATE_REPORT_T extends UpdatedStoreObjectStub
> {
    new (storeName: string, db: IDBDatabase): DBWIThCacheWithReporting<STORE_T, UPDATE_REPORT_T>;
}