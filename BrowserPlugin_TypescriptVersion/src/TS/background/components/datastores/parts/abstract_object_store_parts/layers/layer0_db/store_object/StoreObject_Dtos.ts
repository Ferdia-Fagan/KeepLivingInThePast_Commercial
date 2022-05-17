import {ID_TYPE} from "./StoreObject_Types";

export interface NonPersistedStoreObjectStub {
    id?: ID_TYPE
}

export interface PersistedStoreObjectStub {
    id: ID_TYPE
}

export interface UpdatedStoreObjectStub extends PersistedStoreObjectStub {}


