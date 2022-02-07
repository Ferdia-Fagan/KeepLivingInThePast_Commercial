
// proprietary object properties:

import {RequiredKeys} from "../../../../../../../../../../../tests/utils/Types";

export type ID_TYPE = number
export type KEY_TYPE = IDBValidKey
export const ID_NAME = 'id'
export const KEY_NAME = "KEY"

// encapsulated objects:

export interface StoreObjectStub {
    id?: ID_TYPE
}

export type StoreObject = StoreObjectStub

export interface PersistedStoreObjectStub {
    id: ID_TYPE
}

export interface UpdatedStoreObjectStub extends PersistedStoreObjectStub {

}

export type PersistedStoreObject = PersistedStoreObjectStub
export type Persisted<STORE_OBJ_T extends StoreObjectStub> = RequiredKeys<STORE_OBJ_T, typeof ID_NAME>
// export type Persisted<STORE_OBJ_T extends StoreObjectStub> = RequiredKeys<STORE_OBJ_T, typeof ID_NAME>

// const x = Persisted<StoreObjectStub>