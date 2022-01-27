import "mockzilla-webextension";
require("fake-indexeddb/auto");
import {DBWithCache} from "../DBWithCache";
import {DBWithCache_StoreDummy, StoreObjectInterfaceExample} from "../../../../../../../../../../tests/background/datastores/abstract_object_store_parts/utils/DBWIthCache__StoreDummy";

describe("DBWithCache", function() {

    beforeAll(async() => {
        await DBWithCache_StoreDummy.builder(
            "test", 3, "test");
    })

    describe("addObject", function() {
        it("object does not exist yet", async() => {
            let storeInstance = await DBWithCache_StoreDummy.builder(
                "test", 3, "test");

            let testData: StoreObjectInterfaceExample = {
                theKey: "testKey"
            }

            await storeInstance.addObject(testData)

            let results = await storeInstance.getAllObjects()

            expect(results.length).toBe(1)
            expect(results[0].theKey).toBe("testKey")
        });
    })

    describe("getObjectByKey", function(){
        it("when object not cached - pull {ID,KEY} from store into layer1_cache", async() => {
            let testDataSelecting = {id: 1, theKey: "test1"}
            let storeInstance = await DBWithCache_StoreDummy.builder(
                "test", 3, "test",
                [
                    testDataSelecting,
                    {id: 2, theKey: "test2"}
                ]);
            jest.spyOn(storeInstance["cache"], "get")

            // WHEN:
            let result = await storeInstance.getObjectByKey("test1")

            // THEN:
            expect(storeInstance["cache"].get)
                .not.toHaveBeenCalled()
            expect(result.id).toBe(testDataSelecting.id)
            expect(result.theKey).toBe(testDataSelecting.theKey)
        })

        it("when object cached", async() => {
            let testDataSelecting: StoreObjectInterfaceExample = {
                id: 1, theKey: "test1"
            }
            let storeInstance = await DBWithCache_StoreDummy.builder(
                "test", 3, "test",
                [
                    testDataSelecting,
                    {id: 2, theKey: "test2"}
                ],[
                    testDataSelecting
                ]);
            jest.spyOn(storeInstance["cache"], "get")

            // WHEN
            let result = await storeInstance.getObjectByKey("test1")

            // THEN
            expect(storeInstance["cache"].get).toHaveBeenCalled()
            expect(result.id).toBe(testDataSelecting.id)
            expect(result.theKey).toBe(testDataSelecting.theKey)
        })
    })



})