
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

interface X extends StoreObjectStub  {
    value1: string,
    value2: string
}

const x: Persisted<X> = {
    id: 1,
    value1: "l",
    value2: "l"
}

x.