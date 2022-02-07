import {
    NonEditableStoreDBInterface
} from "../../../../../src/TS/background/components/datastores/components/parts/abstract_object_store_parts/layers/layer0_db/DB";
import {
    ID_NAME, ID_TYPE,
    KEY_NAME,
    KEY_TYPE, StoreObjectStub, UpdatedStoreObjectStub
} from "../../../../../src/TS/background/components/datastores/components/parts/abstract_object_store_parts/layers/layer0_db/store_object/Types";
import {
    DBCache,
    StoreObjectKeyGetter
} from "../../../../../src/TS/background/components/datastores/components/parts/abstract_object_store_parts/layers/layer1_cache/DBCache";
import MapCache from "../../../../../src/TS/background/utils/MapCache";

export interface StoreObjectInterfaceExample extends StoreObjectStub{
    theKey: KEY_TYPE
}
type StoreObjectUpdateInterfaceExample = StoreObjectInterfaceExample & UpdatedStoreObjectStub
const THE_KEY_NAME = "theKey"

export const DEFAULT_STORE_OBJECT_KEY_GETTER: StoreObjectKeyGetter<StoreObjectInterfaceExample> = (obj: StoreObjectInterfaceExample) => obj.theKey

export class DBWithCache_StoreDummy<
    STORE_T extends StoreObjectStub
> extends DBCache<STORE_T> {

    static async builder<
        STORE_T extends StoreObjectStub = StoreObjectInterfaceExample
    >(
        storeObjectKeyGetter: StoreObjectKeyGetter<StoreObjectStub> = DEFAULT_STORE_OBJECT_KEY_GETTER,
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