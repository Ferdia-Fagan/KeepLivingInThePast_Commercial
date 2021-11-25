/**
 * This is a sample of code. Dont need to unit test Indexdb
 */

import "mockzilla-webextension";
require("fake-indexeddb/auto");

import { ID, KEY } from "../../../../src/background/datastores/stores/Utils";
import {DB_StoreDummy} from "./utils/DB_StoreDummy";

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

        const newObject = {
            KEY: "testKey1"
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
                {KEY: "testKey"}
            ]
        );

        let expectedResult = {ID: 1, KEY: "testKey"}

        let objectWithIndexColumnValue = await storeInstance.getObjectByIndexColumn(
            "KEY", "testKey"
        );

        console.log("hello" + objectWithIndexColumnValue)
        expect(objectWithIndexColumnValue.KEY).toBe(expectedResult.KEY)
    })

    it("getAllObjects(..)", async () => {
        let storeInstance = await DB_StoreDummy.builder(
            "test", 3, "test",
            [
                {KEY: "testKey1"},
                {KEY: "testKey2"},
                {KEY: "testKey3"}
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
                {KEY: "testKey1"}
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
                {KEY: "testKey1"}
            ]
        );

        let expectedTestKeyUpdated = {ID: 1, KEY: "testKey10"}

        storeInstance.updateObject(expectedTestKeyUpdated)

        let allObjects = await storeInstance.getAllObjects()

        expect(allObjects.length).toBe(1)
        expect(allObjects[0].ID).toBe(expectedTestKeyUpdated.ID)
        expect(allObjects[0].KEY).toBe(expectedTestKeyUpdated.KEY)
    })

});
