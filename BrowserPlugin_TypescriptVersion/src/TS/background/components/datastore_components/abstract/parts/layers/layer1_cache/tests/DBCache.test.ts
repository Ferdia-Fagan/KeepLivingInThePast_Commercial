import "mockzilla-webextension";
import {
    DBWithCache_StoreDummy, DEFAULT_STORE_OBJECT_KEY_GETTER, StoreObjectInterfaceExample
} from "../../../../../../../../../../tests/background/datastores/abstract_object_store_parts/utils/DBWIthCache__StoreDummy";
import {Persisted} from "../../layer0_db/store_object/StoreObject_Types";
require("fake-indexeddb/auto");

describe("DBCache", function() {

    describe("cacheObjectWithId", function() {
        it("object does not exist yet", async() => {
            let storeInstance = await DBWithCache_StoreDummy.builder();
            const idOfCacheObj = 0
            const keyOfCacheObj = "testKey"

            let testData: Persisted<StoreObjectInterfaceExample> = {
                id: idOfCacheObj,
                key: keyOfCacheObj
            }

            await storeInstance.cacheObject(testData)

            let testCache = await storeInstance["cache"].cache

            expect(testCache.size).toBe(1)
            expect(testCache.get(keyOfCacheObj)).toBe(idOfCacheObj)
        });
    })

    describe("getObjectIdByKey", function(){
        it("when object not cached - return undefined", async() => {
            const objectKeyThatDoesNotExist = "test2"
            let storeInstance = await DBWithCache_StoreDummy.builder(
                DEFAULT_STORE_OBJECT_KEY_GETTER,
                [
                    {id: 1, key: "test1"}
                ]
            )
            jest.spyOn(storeInstance["cache"], "get")

            // WHEN:
            let actualObjectId = await storeInstance.getObjIdByKey(objectKeyThatDoesNotExist)

            // THEN:
            expect(actualObjectId).toBe(undefined)
        })

        it("when object cached - return object id", async() => {
            let testDataSelecting: StoreObjectInterfaceExample = {
                id: 1, key: "test1"
            }
            let storeInstance = await DBWithCache_StoreDummy.builder(
                DEFAULT_STORE_OBJECT_KEY_GETTER,
                [
                    testDataSelecting,
                    {id: 2, key: "test2"}
                ]
            )
            jest.spyOn(storeInstance["cache"], "get")

            // WHEN
            let actualObjectId = await storeInstance.getObjIdByKey("test1")

            // THEN
            expect(storeInstance["cache"].get).toHaveBeenCalled()
            expect(actualObjectId).toBe(testDataSelecting.id)
        })
    })



})