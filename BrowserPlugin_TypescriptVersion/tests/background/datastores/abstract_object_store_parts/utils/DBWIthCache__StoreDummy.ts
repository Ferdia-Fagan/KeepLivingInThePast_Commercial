import {
    NonPersistedStoreObjectStub, PersistedStoreObjectStub,
    UpdatedStoreObjectStub
} from "../../../../../src/TS/background/components/datastores/parts/abstract_object_store_parts/layers/layer0_db/store_object/StoreObject_Dtos";
import {
    ID_TYPE,
    KEY_TYPE
} from "../../../../../src/TS/background/components/datastores/parts/abstract_object_store_parts/layers/layer0_db/store_object/StoreObject_Types";
import {
    StoreObjectKeyGetter
} from "../../../../../src/TS/background/components/datastores/parts/abstract_object_store_parts/layers/layer1_cache/DBCache_Types";
import {
    DBCache
} from "../../../../../src/TS/background/components/datastores/parts/abstract_object_store_parts/layers/layer1_cache/DBCache_Implementations";
import MapCache from "../../../../../src/TS/background/utils/MapCache";

export interface StoreObjectInterfaceExample 
    extends PersistedStoreObjectStub{ }

type StoreObjectUpdateInterfaceExample = StoreObjectInterfaceExample & UpdatedStoreObjectStub
const THE_KEY_NAME = "theKey"

export const DEFAULT_STORE_OBJECT_KEY_GETTER: StoreObjectKeyGetter<StoreObjectInterfaceExample> = (obj: StoreObjectInterfaceExample) => obj.key

export class DBWithCache_StoreDummy<
    STORE_T extends NonPersistedStoreObjectStub
> extends DBCache<STORE_T> {

    static async builder<
        STORE_T extends NonPersistedStoreObjectStub = StoreObjectInterfaceExample
    >(
        storeObjectKeyGetter: StoreObjectKeyGetter<NonPersistedStoreObjectStub> = DEFAULT_STORE_OBJECT_KEY_GETTER,
        testDataForCache: STORE_T[] = []
    ) {
        const cacheInit = new Map<KEY_TYPE, ID_TYPE>(
            testDataForCache.map(testDataToAdd => [
                storeObjectKeyGetter(testDataToAdd), testDataToAdd.id
            ])
        )

        return new DBWithCache_StoreDummy(
            storeObjectKeyGetter,
            new MapCache<KEY_TYPE, ID_TYPE>(cacheInit),
        )
    }
}

// export class DBWithCache_StoreDummy
//     extends DBCache<StoreObjectInterfaceExample, StoreObjectUpdateInterfaceExample>
//         implements  NonEditableStoreDBInterface<StoreObjectInterfaceExample, StoreObjectUpdateInterfaceExample>,
//                     DBWithCacheInterface<StoreObjectInterfaceExample>{
//
//     private constructor(STORE_NAME: string, DB: IDBDatabase){
//         super(STORE_NAME, DB)
//     }
//
//     getStoreObjectKey(storeObj: StoreObjectInterfaceExample): IDBValidKey {
//         return storeObj.theKey;
//     }
//
//     addObject = (newElementToStore: StoreObjectInterfaceExample): Promise<number> =>
//         super.addObject(newElementToStore)
//
//     getObjectByIndexColumn = (indexName: string, value: IDBValidKey): Promise<StoreObjectInterfaceExample> =>
//         super.getObjectByIndexColumn(indexName, value)
//
//     getAllObjects = (): Promise<Array<StoreObjectInterfaceExample>> =>
//         super.getAllObjects()
//
//     getObjectByKey = (key: string): Promise<StoreObjectInterfaceExample> =>
//         super.getObjectByKey(key)
//
//     updateObject = (storeObject: StoreObjectUpdateInterfaceExample): void =>
//         super.updateObject(storeObject)
//
//     deleteObjectById = (objectId: number): void =>
//         super.deleteObjectById(objectId)
// }