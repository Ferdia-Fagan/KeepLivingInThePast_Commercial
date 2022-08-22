import {RequiredKeys} from "../../../../../../../../../../tests/utils/Types";
import {ID_NAME} from "./StoreObject_Constants";
import {NonPersistedStoreObjectStub, PersistedStoreObjectStub} from "./StoreObject_Dtos";

export type ID_TYPE = number
export type KEY_TYPE = IDBValidKey

export type PersistedStoreObject = PersistedStoreObjectStub
export type Persisted<STORE_OBJ_T extends NonPersistedStoreObjectStub> = RequiredKeys<STORE_OBJ_T, typeof ID_NAME>

// export type Persisted<STORE_OBJ_T extends StoreObjectStub> = RequiredKeys<STORE_OBJ_T, typeof ID_NAME>

// const x = Persisted<StoreObjectStub>

