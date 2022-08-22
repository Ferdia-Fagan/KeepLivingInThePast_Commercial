/**
 * This is a sample of code. Dont need to unit test Indexdb
 */

import "mockzilla-webextension";
require("fake-indexeddb/auto");

import {
    DB_StoreDummy,
    PersistedStoreObjectInterfaceExample,
    StoreObjectInterfaceExample
} from "../../../../../../../../../../tests/background/datastores/abstract_object_store_parts/utils/DB/DB_StoreDummy";
import {buildDBLayer} from "../construction/Builder";
import {EditableDB} from "../implementations/EditableDB";
import {ID_NAME, KEY_NAME} from "../store_object/StoreObject_Constants";

var HAS_BEEN__CREATED: boolean = false;

var script_self = this;

const flushPromises = () => new Promise(setImmediate);

describe("DBStore", function(){

    beforeAll(async() => {
        await buildDBLayer({
            DATABASE: "test",
            DB_VERSION: 3,
            STORE_NAME: "test",
            dbConstructor: EditableDB,
        })
        // await DB_StoreDummy.builder(
        //     "test", 3, "test");
    })

    it("addObj - add object with key that does not exist - successfully added object", async() => {
        let storeInstance = await buildDBLayer({
            DATABASE: "test",
            DB_VERSION: 3,
            STORE_NAME: "test",
            dbConstructor: EditableDB,
        });

        const newObject: StoreObjectInterfaceExample = {
            key: "testKey1"
        }

        let newObjectAddedToStore = await storeInstance.addObj(newObject);

        // await FlushPromises();

        expect(newObjectAddedToStore).toMatchObject({ ...newObject, id: 1})
    });

    it("getObjectByIndexColumn - get object by column index that exists", async () => {
        let storeInstance = await buildDBLayer({
            DATABASE: "test",
            DB_VERSION: 3,
            STORE_NAME: "test",
            dbConstructor: EditableDB,
            startingData: [
                {key: "testKey"}
            ]
        });

        let expectedResult: StoreObjectInterfaceExample = {
            id: 1, key: "testKey"
        }

        let objectWithIndexColumnValue = await storeInstance.getObjByIndexColumn(
            KEY_NAME, "testKey"
        );

        console.log("hello" + objectWithIndexColumnValue)
        expect(objectWithIndexColumnValue.key).toBe(expectedResult.key)
    })

    it("getAllObjs", async () => {
        let storeInstance = await buildDBLayer({
            DATABASE: "test",
            DB_VERSION: 3,
            STORE_NAME: "test",
            dbConstructor: EditableDB,
            startingData: [
                {key: "testKey1"},
                {key: "testKey2"},
                {key: "testKey3"}
            ]
        });

        let allObjectsFromStore = await storeInstance.getAllObjs()

        // assert(allObjectsFromStore.length == 3)
        console.log("results\n")
        console.log(allObjectsFromStore)
        expect(allObjectsFromStore.length).toBe(3)
    })

    it("deleteObjById", async () => {
        let storeInstance = await buildDBLayer({
            DATABASE: "test",
            DB_VERSION: 3,
            STORE_NAME: "test",
            dbConstructor: EditableDB,
            startingData: [
                {key: "testKey1"}
            ]
        });

        storeInstance.deleteObjById(1)

        let allObjectsFromStore = await storeInstance.getAllObjs()

        expect(allObjectsFromStore.length).toBe(0)
    })

    it("updateObject", async () => {
        let storeInstance = await buildDBLayer({
            DATABASE: "test",
            DB_VERSION: 3,
            STORE_NAME: "test",
            dbConstructor: EditableDB,
            startingData: [
                {key: "testKey1"}
            ]
        });

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
