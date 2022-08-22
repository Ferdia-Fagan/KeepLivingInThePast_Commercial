import {
    NonPersistedStoreObjectStub
} from "../../../abstract/parts/layers/layer0_db/store_object/StoreObject_Dtos";

export default interface HostnameObject extends NonPersistedStoreObjectStub {
    hostname: string
}