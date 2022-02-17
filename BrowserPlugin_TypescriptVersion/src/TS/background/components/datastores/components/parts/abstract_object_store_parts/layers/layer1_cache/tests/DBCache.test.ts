import "mockzilla-webextension";
require("fake-indexeddb/auto");
import {
    DBWithCache_StoreDummy,
    DEFAULT_STORE_OBJECT_KEY_GETTER,
    StoreObjectInterfaceExample
} from "../../../../../../../../../../../tests/background/datastores/abstract_object_store_parts/utils/DBWIthCache__StoreDummy";

describe("DBCache", function() {

    describe("addObject", function() {
        it("object does not exist yet", async() => {
            let storeInstance = await DBWithCache_StoreDummy.builder();
            const idOfCacheObj = 0
            const keyOfCacheObj = "testKey"

            let testData: StoreObjectInterfaceExample = {
                id: idOfCacheObj,
                theKey: keyOfCacheObj
            }

            await storeInstance.cacheObjectWithId(testData.id, testData)

            let testCache = await storeInstance["cache"].cache

            expect(testCache.size).toBe(1)
            expect(testCache.get(keyOfCacheObj)).toBe(idOfCacheObj)
        });
    })

    describe("getObjectByKey", function(){
        it("when object not cached - return undefined", async() => {
            const objectKeyThatDoesNotExist = "test2"
            let storeInstance = await DBWithCache_StoreDummy.builder(
                DEFAULT_STORE_OBJECT_KEY_GETTER,
                [
                    {id: 1, theKey: "test1"}
                ]
            )
            jest.spyOn(storeInstance["cache"], "get")

            // WHEN:
            let actualObjectId = await storeInstance.getObjectIdByKey(objectKeyThatDoesNotExist)

            // THEN:
            expect(actualObjectId).toBe(undefined)
        })

        it("when object cached - return object id", async() => {
            let testDataSelecting: StoreObjectInterfaceExample = {
                id: 1, theKey: "test1"
            }
            let storeInstance = await DBWithCache_StoreDummy.builder(
                DEFAULT_STORE_OBJECT_KEY_GETTER,
                [
                    testDataSelecting,
                    {id: 2, theKey: "test2"}
                ]
            )
            jest.spyOn(storeInstance["cache"], "get")

            // WHEN
            let actualObjectId = await storeInstance.getObjectIdByKey("test1")

            // THEN
            expect(storeInstance["cache"].get).toHaveBeenCalled()
            expect(actualObjectId).toBe(testDataSelecting.id)
        })
    })



})