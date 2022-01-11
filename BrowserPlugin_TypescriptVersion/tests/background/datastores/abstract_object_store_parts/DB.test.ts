/**
 * This is a sample of code. Dont need to unit test Indexdb
 */

import "mockzilla-webextension";
require("fake-indexeddb/auto");

import { ID_NAME, KEY_NAME } from "../../../../src/TS/background/datastores/stores/utils/Utils";
import {DB_StoreDummy, StoreObjectInterfaceExample} from "./utils/DB_StoreDummy";
import IndexObject from "../../../../src/TS/background/datastores/store_objects_interfaces/base_store_objects/IndexObject";

var HAS_BEEN__CREATED: boolean = false;

var script_self = this;

const flushPromises = () => new Promise(setImmediate);

describe("DBStore", function(){

    beforeAll(async() => {
        await DB_StoreDummy.builder(
            "test", 3, "test");
    })

    it("addObject(...) - add object with key that does not exist - successfully added object", async() => {
        let storeInstance = await DB_StoreDummy.builder(
            "test", 3, "test");

        const newObject: StoreObjectInterfaceExample = {
            theKey: "testKey1"
        }

        let newObjectAddedToStore = await storeInstance.addObject(
            newObject
        );

        // await FlushPromises();

        expect(newObjectAddedToStore).toBe(1)
    });

    it("getObjectByIndexColumn(...) - get object by column index that exists", async () => {
        let storeInstance = await DB_StoreDummy.builder(
            "test", 3, "test",
            [
                {theKey: "testKey"}
            ]
        );

        let expectedResult: StoreObjectInterfaceExample = {
            id: 1, theKey: "testKey"
        }

        let objectWithIndexColumnValue = await storeInstance.getObjectByIndexColumn(
            KEY_NAME, "testKey"
        );

        console.log("hello" + objectWithIndexColumnValue)
        expect(objectWithIndexColumnValue. theKey).toBe(expectedResult.theKey)
    })

    it("getAllObjects(..)", async () => {
        let storeInstance = await DB_StoreDummy.builder(
            "test", 3, "test",
            [
                {theKey: "testKey1"},
                {theKey: "testKey2"},
                {theKey: "testKey3"}
            ]
        );

        let allObjectsFromStore = await storeInstance.getAllObjects()

        // assert(allObjectsFromStore.length == 3)
        console.log("results\n")
        console.log(allObjectsFromStore)
        expect(allObjectsFromStore.length).toBe(3)
    })

    it("deleteObjectById", async () => {
        let storeInstance = await DB_StoreDummy.builder(
            "test", 3, "test",
            [
                {theKey: "testKey1"}
            ]
        );

        storeInstance.deleteObjectById(1)

        let allObjectsFromStore = await storeInstance.getAllObjects()

        expect(allObjectsFromStore.length).toBe(0)
    })

    it("updateObject", async () => {
        let storeInstance = await DB_StoreDummy.builder(
            "test", 3, "test",
            [
                {theKey: "testKey1"}
            ]
        );

        let expectedTestKeyUpdated: StoreObjectInterfaceExample = {
            id: 1, theKey: "testKey10"
        }

        storeInstance.updateObject(expectedTestKeyUpdated)

        let allObjects = await storeInstance.getAllObjects()

        expect(allObjects.length).toBe(1)
        expect(allObjects[0].id).toBe(expectedTestKeyUpdated.id)
        expect(allObjects[0].theKey).toBe(expectedTestKeyUpdated.theKey)
    })

});
