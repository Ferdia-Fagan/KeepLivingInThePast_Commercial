import "mockzilla-webextension";
require("fake-indexeddb/auto");
import {DBWithCache} from "../../../../src/background/datastores/abstract_object_store_parts/DBWithCache";
import {DBWithCache_StoreDummy} from "./utils/DBWIthCache__StoreDummy";

describe("DBWithCache", function() {

    beforeAll(async() => {
        await DBWithCache_StoreDummy.builder(
            "test", 3, "test");
    })

    describe("addObject", function() {
        it("object does not exist yet", async() => {
            let storeInstance = await DBWithCache_StoreDummy.builder(
                "test", 3, "test");

            let testData = {
                KEY: "testKey"
            }

            await storeInstance.addObject(testData)

            let results = await storeInstance.getAllObjects()

            expect(results.length).toBe(1)
            expect(results[0].KEY).toBe("testKey")
        });
    })

    describe("getObjectByKey", function(){
        it("when object not cached - pull {ID,KEY} from store into cache", async() => {
            let testDataSelecting = {ID: 1, KEY: "test1"}
            let storeInstance = await DBWithCache_StoreDummy.builder(
                "test", 3, "test",
                [
                    testDataSelecting,
                    {ID: 2, KEY: "test2"}
                ]);
            jest.spyOn(storeInstance.cache, "get")

            // WHEN:
            let result = await storeInstance.getObjectByKey("test1")

            // THEN:
            expect(storeInstance.cache.get).not.toHaveBeenCalled()
            expect(result.ID).toBe(testDataSelecting.ID)
            expect(result.KEY).toBe(testDataSelecting.KEY)
        })

        it("when object cached", async() => {
            let testDataSelecting = {ID: 1, KEY: "test1"}
            let storeInstance = await DBWithCache_StoreDummy.builder(
                "test", 3, "test",
                [
                    testDataSelecting,
                    {ID: 2, KEY: "test2"}
                ],[
                    testDataSelecting
                ]);
            jest.spyOn(storeInstance.cache, "get")

            // WHEN
            let result = await storeInstance.getObjectByKey("test1")

            // THEN
            expect(storeInstance.cache.get).toHaveBeenCalled()
            expect(result.ID).toBe(testDataSelecting.ID)
            expect(result.KEY).toBe(testDataSelecting.KEY)
        })
    })



})