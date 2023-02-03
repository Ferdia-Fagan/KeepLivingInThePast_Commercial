import {ID_TYPE, KEY_TYPE} from "./StoreObject_Types";

export interface NonPersistedStoreObjectStub {
    id?: ID_TYPE
    key: KEY_TYPE
}

export interface PersistedStoreObjectStub {
    id: ID_TYPE
    key: KEY_TYPE
}

export interface UpdatedStoreObjectStub extends PersistedStoreObjectStub {}


