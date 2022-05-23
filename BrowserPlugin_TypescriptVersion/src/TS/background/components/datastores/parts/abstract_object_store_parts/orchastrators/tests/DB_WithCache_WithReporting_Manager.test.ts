import "mockzilla-webextension";
import {verify} from "crypto";
import {
    DB_StoreDummy, PersistedStoreObjectInterfaceExample
} from "../../../../../../../../../tests/background/datastores/abstract_object_store_parts/utils/DB/DB_StoreDummy";
import {
    StoreObjectInterfaceExample
} from "../../../../../../../../../tests/background/datastores/abstract_object_store_parts/utils/DBWIthCache__StoreDummy";
import {EditableStoreDB_I} from "../../layers/layer0_db/implementations/EditableDB";
import {KEY_NAME} from "../../layers/layer0_db/store_object/StoreObject_Constants";
import {
    NonPersistedStoreObjectStub,
    UpdatedStoreObjectStub
} from "../../layers/layer0_db/store_object/StoreObject_Dtos";
import {A_EditableDBController} from "../../layers/layer0_db/types/DB_Types";
import {DBCache} from "../../layers/layer1_cache/DBCache_Implementations";
import {CacheComponent, create_DB_WithCache_Manager, DBComponent} from "../DB_WithCache_Manager";
require("fake-indexeddb/auto");

interface SampleDbWithCacheManagerInterface<
    STORE_OBJECT_T extends NonPersistedStoreObjectStub,
    UPDATE_STORE_OBJECT_T extends UpdatedStoreObjectStub
    >
    extends EditableStoreDB_I<STORE_OBJECT_T, UPDATE_STORE_OBJECT_T>,
        DBComponent<STORE_OBJECT_T, UPDATE_STORE_OBJECT_T>,
        CacheComponent<STORE_OBJECT_T> {}

function createDb(
    DATABASE: string, DB_VERSION: number,
    STORE_NAME: string,
    testData: StoreObjectInterfaceExample[] = [],
    prepopulateCache: StoreObjectInterfaceExample[] = []
): Promise<
    SampleDbWithCacheManagerInterface<StoreObjectInterfaceExample, PersistedStoreObjectInterfaceExample>
    > {
    return DB_StoreDummy.builder(
        DATABASE, DB_VERSION, STORE_NAME, testData
    ).then(db => {
        return create_DB_WithCache_Manager<StoreObjectInterfaceExample, PersistedStoreObjectInterfaceExample>(
            db, // as unknown as A_EditableDBController<StoreObjectInterfaceExample, PersistedStoreObjectInterfaceExample>,
            new DBCache<StoreObjectInterfaceExample>(((object) => object.key)),
            prepopulateCache
        )
    })
}

describe("DBStore", function(){

    beforeAll(async() => {
        await DB_StoreDummy.builder(
            "test", 3, "test")
    })

    describe('addObj', () => {

        it('add object with key that does not exist - successfully added object store and cache', async() => {
            let storeInstance = await createDb(
                "test", 3, "test"
            )

            const newObject: StoreObjectInterfaceExample = {
                key: "testKey1"
            }

            let newObjectAddedToStore = await storeInstance.addObj(newObject);

            expect(newObjectAddedToStore)
                .toMatchObject({ ...newObject, id: 1 })
            expect(storeInstance.cache.getObjIdByKey(newObjectAddedToStore.key))
                .toBe(newObjectAddedToStore.id)
        });

    })

    it("deleteObjectById", async () => {
        let storeInstance = await createDb(
            "test", 3, "test",
            [
                {key: "testKey1"}
            ]
        )

        await storeInstance.deleteObjById(1)

        let allObjectsFromStore = await storeInstance.getAllObjs()

        expect(allObjectsFromStore.length).toBe(0)
    })

    it("updateObject", async () => {
        let storeInstance = await createDb(
            "test", 3, "test",
            [
                {key: "testKey1"}
            ]
        )

        let expectedTestKeyUpdated = {
            id: 1, key: "testKey10"
        }

        storeInstance.updateObject(expectedTestKeyUpdated)

        let allObjects = await storeInstance.getAllObjs()

        expect(allObjects.length).toBe(1)
        expect(allObjects[0].id).toBe(expectedTestKeyUpdated.id)
        expect(allObjects[0].key).toBe(expectedTestKeyUpdated.key)
    })

});
