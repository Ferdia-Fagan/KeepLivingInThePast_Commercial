import MapCache from "../../../../../../utils/MapCache";
import {NonPersistedStoreObjectStub} from "../layer0_db/store_object/StoreObject_Dtos";
import {ID_TYPE, KEY_TYPE} from "../layer0_db/store_object/StoreObject_Types";
import {StoreObjectKeyGetter} from "./DBCache";
import {DBCache} from "./DBCache_Implementations";

function createDbCache<STORE_T extends NonPersistedStoreObjectStub>(
    storeObjectKeyGetter: StoreObjectKeyGetter<STORE_T>,
    cacheInitData: STORE_T[] = []
) {
    return new DBCache(
        storeObjectKeyGetter,
        new MapCache<KEY_TYPE, ID_TYPE>(
            new Map<KEY_TYPE, ID_TYPE>(
                cacheInitData.map(testDataToAdd => [
                    storeObjectKeyGetter(testDataToAdd), testDataToAdd.id
                ])
            ),
            100, 10
        )
    )
}

// export interface DBBuilderInterface<
//     STORE_T extends StoreObjectInterface,
//     STORE_T_UPDATE_INTERFACE extends UpdatedStoreObjectInterface,
//     T extends DB<STORE_T, STORE_T_UPDATE_INTERFACE>
// > {
//     new (storeName: string, db: IDBDatabase): T
// }
//
// export async function builder<
//     STORE_T extends StoreObjectInterface,
//     STORE_T_UPDATE_INTERFACE extends UpdatedStoreObjectInterface,
//     T extends DB<STORE_T, STORE_T_UPDATE_INTERFACE>
// >(
//     DATABASE: string, DB_VERSION: number,STORE_NAME: string,
//     createDBStore: CreateDBStoreHandler,
//     objectToBuild: DBBuilderInterface<STORE_T, STORE_T_UPDATE_INTERFACE, T>
// ): Promise<T> {
//     var createDB: IDBDatabase = await CreateDBStore(DATABASE, DB_VERSION, createDBStore)
//
//     return new objectToBuild(STORE_NAME, createDB);
// }