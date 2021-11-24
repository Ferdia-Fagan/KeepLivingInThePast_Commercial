/**
 * This is a sample of code. Dont need to unit test Indexdb
 */


import DB from "../../../../src/background/datastores/abstract_object_store_parts/DB";

import "mockzilla-webextension";
// import "fake-indexeddb/auto"
require("fake-indexeddb/auto");

import { ID, KEY } from "../../../../src/background/datastores/stores/Utils";
import StoreObjectInterface
    from "../../../../src/background/datastores/abstract_store_object_parts/StoreObjectInterface";
import assert, {equal} from "assert";
import {FlushPromises} from "../../../utils/AsyncUtils";

interface StoreObjectInterfaceExample extends StoreObjectInterface{
    ID?: number,
    KEY: IDBValidKey
}

var HAS_BEEN__CREATED: boolean = false;

var script_self = this;

const flushPromises = () => new Promise(setImmediate);

class ExampleObjectDBStore extends DB<StoreObjectInterfaceExample> {

    private constructor(STORE_NAME: string, DB: IDBDatabase){
        super(STORE_NAME, DB)
    }

    static async builder(DATABASE: string, DB_VERSION: number,STORE_NAME: string,
                         testData?: StoreObjectInterfaceExample[]){

        function onUpgradeNeededHandler(event: any){    // TODO: correct any
            var objectStore = event.currentTarget.result.createObjectStore(
                STORE_NAME, { keyPath: ID, autoIncrement: true });

            objectStore.createIndex(
                "KEY",
                "KEY",
                {unique: true}
            )

        }

        var DB: IDBDatabase = await new Promise<IDBDatabase>((resolve,reject) => {
            var openDBReq = indexedDB.open(DATABASE, DB_VERSION);
            
            openDBReq.onsuccess = function (evt: any & Event) {
                // DB = evt.result;
                if(testData){
                    let transaction = openDBReq.result.transaction("test",'readwrite')
                    let store: any & IDBObjectStore = transaction.objectStore("test")

                    let clearStore = store.clear()

                    store._rawObjectStore.keyGenerator.num = 0

                    clearStore.onsuccess = function(){
                        let testDataInsertRequests: IDBRequest<IDBValidKey>[] = []

                        testData.forEach(testDataToInsert => {
                            testDataInsertRequests.push(store.add(testDataToInsert))
                        })
                        Promise.all(testDataInsertRequests).then(e => {
                            resolve(evt.target.result)
                        })
                    }

                } else {
                    resolve(openDBReq.result)
                }
            }

            openDBReq.onerror = function (evt) {
                console.error("openDb:", "db request fail");
            };

            openDBReq.onupgradeneeded = onUpgradeNeededHandler

        })
        return new ExampleObjectDBStore(STORE_NAME, DB);
    }
}

describe("DBStore", function(){

    beforeAll(async() => {
        await ExampleObjectDBStore.builder(
            "test", 3, "test");
    })

    it("addObject(...) - add object with key that does not exist - successfully added object", async() => {
        let storeInstance = await ExampleObjectDBStore.builder(
            "test", 3, "test");

        const newObject: StoreObjectInterfaceExample = {
            KEY: "testKey1"
        }

        let newObjectAddedToStore = await storeInstance.addObject(
            newObject
        );

        // await FlushPromises();

        expect(newObjectAddedToStore).toBe(1)
    });

    it("getObjectByIndexColumn(...) - get object by column index that exists", async () => {
        let storeInstance = await ExampleObjectDBStore.builder(
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
        let storeInstance = await ExampleObjectDBStore.builder(
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
        let storeInstance = await ExampleObjectDBStore.builder(
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
        let storeInstance = await ExampleObjectDBStore.builder(
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
