import "mockzilla-webextension";
import {
    DB_StoreDummy, PersistedStoreObjectInterfaceExample
} from "../../../../../../../../../../tests/background/datastores/abstract_object_store_parts/utils/DB/DB_StoreDummy";
import {
    StoreObjectInterfaceExample
} from "../../../../../../../../../../tests/background/datastores/abstract_object_store_parts/utils/DBWIthCache__StoreDummy";
import {buildDBLayer, KeyIndexKeyAssignement} from "../../layers/layer0_db/construction/Builder";
import {EditableDB, EditableStoreDB_I} from "../../layers/layer0_db/implementations/EditableDB";
import {KEY_NAME} from "../../layers/layer0_db/store_object/StoreObject_Constants";
import {
    NonPersistedStoreObjectStub,
    UpdatedStoreObjectStub
} from "../../layers/layer0_db/store_object/StoreObject_Dtos";
import {A_EditableDBControllerLayer} from "../../layers/layer0_db/types/DB_Types";
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

function createDb<
    STORE_T extends NonPersistedStoreObjectStub,
    STORE_T_UPDATE_INTERFACE extends UpdatedStoreObjectStub
>(
    DATABASE: string, DB_VERSION: number,
    STORE_NAME: string,
    testData: STORE_T[] = [],
    prepopulateCache: STORE_T[] = []
): Promise<
    SampleDbWithCacheManagerInterface<STORE_T, STORE_T_UPDATE_INTERFACE>
> {
    return buildDBLayer<
        STORE_T,
        STORE_T_UPDATE_INTERFACE,
        EditableDB<STORE_T, STORE_T_UPDATE_INTERFACE>
    >({
        DATABASE: "test",
        DB_VERSION: 3,
        STORE_NAME: "test",
        dbConstructor: EditableDB,
        startingData: testData,
        keyIndexAssignement: KeyIndexKeyAssignement,
        otherKeysIndexAssignements: []
    }).then(db => {
        return create_DB_WithCache_Manager<STORE_T, STORE_T_UPDATE_INTERFACE>(
            {db : db, cache : new DBCache<STORE_T>(((object) => object.key)), cachePrePopulateData : prepopulateCache}
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

            // await FlushPromises();

            expect(newObjectAddedToStore)
                .toMatchObject({ ...newObject, id: 1 })
            expect(storeInstance.cache.getObjIdByKey(newObjectAddedToStore.key))
                .toBe(newObjectAddedToStore.id)
        });

    })



    describe('getObjectByIndexColumn', () => {
        it("when is not in cache - get object by column index that exists from db and cache", async () => {
            let storeInstance = await createDb(
                "test", 3, "test",
                [
                    {key: "testKey"}
                ]
            )

            let expectedResult: StoreObjectInterfaceExample = {
                id: 1, key: "testKey"
            }

            expect(storeInstance.cache.getObjIdByKey(expectedResult.key))
                .toBe(undefined)

            let objectWithIndexColumnValue = await storeInstance.getObjByIndexColumn(
                KEY_NAME, "testKey"
            );

            console.log("hello" + objectWithIndexColumnValue)
            expect(objectWithIndexColumnValue.key)
                .toBe(expectedResult.key)
            expect(storeInstance.cache.getObjIdByKey(expectedResult.key))
                .toBe(objectWithIndexColumnValue.id)
        })

    })

    describe('getObjByKey', () => {
        it("is not cached - so getObjByKey", async () => {
            const testData: StoreObjectInterfaceExample = {
                id: 1, key: "testKey"
            }
            const storeInstance = await createDb(
                "test", 3, "test",
                [
                    testData
                ]
            )

            expect(storeInstance.cache.getObjIdByKey(testData.key))
                .toBe(undefined)

            const spyOnDbGetObjByKeyFunc = jest.spyOn(storeInstance.db, 'getObjByKey')

            const objectWithIndexColumnValue = await storeInstance.getObjByKey(testData.key)

            expect(spyOnDbGetObjByKeyFunc)
                .toHaveBeenCalledWith(testData.key)
            expect(objectWithIndexColumnValue.key)
                .toBe(testData.key)
            expect(storeInstance.cache.getObjIdByKey(testData.key))
                .toBe(testData.id)
        })

        it("is cached - so getObjById", async () => {
            const testData: StoreObjectInterfaceExample = {
                id: 1, key: "testKey"
            }
            const storeInstance = await createDb(
                "test", 3, "test",
                [
                    testData
                ],
                [
                    testData
                ]
            )

            expect(storeInstance.cache.getObjIdByKey(testData.key))
                .toBe(testData.id)

            const spyOnDbGetObjByIdFunc = jest.spyOn(storeInstance.db, 'getObjById')

            const objectWithIndexColumnValue = await storeInstance.getObjByKey(testData.key)

            expect(spyOnDbGetObjByIdFunc)
                .toHaveBeenCalledWith(testData.id)
            expect(objectWithIndexColumnValue.key)
                .toBe(testData.key)
        })
    })

    describe('getAllObjs', () => {
        it("getAllObjs", async () => {
            let storeInstance = await createDb(
                "test", 3, "test",
                [
                    {key: "testKey1"},
                    {key: "testKey2"},
                    {key: "testKey3"}
                ]
            )

            let allObjectsFromStore = await storeInstance.getAllObjs()

            expect(allObjectsFromStore.length).toBe(3)
        })
    });

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
