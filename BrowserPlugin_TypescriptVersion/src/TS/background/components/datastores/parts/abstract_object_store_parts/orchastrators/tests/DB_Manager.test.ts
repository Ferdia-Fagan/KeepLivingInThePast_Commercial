/**
 * This is a sample of code. Dont need to unit test Indexdb
 */

import "mockzilla-webextension";
import {
    DB_StoreDummy, PersistedStoreObjectInterfaceExample, StoreObjectInterfaceExample
} from "../../../../../../../../../tests/background/datastores/abstract_object_store_parts/utils/DB/DB_StoreDummy";
import {EditableStoreDB_I} from "../../layers/layer0_db/implementations/EditableDB";
import {KEY_NAME} from "../../layers/layer0_db/store_object/StoreObject_Constants";
import {
    NonPersistedStoreObjectStub,
    UpdatedStoreObjectStub
} from "../../layers/layer0_db/store_object/StoreObject_Dtos";
import {createDBManager} from "../DB_Manager";

require("fake-indexeddb/auto");

function createDb<
    STORE_T extends NonPersistedStoreObjectStub,
    STORE_T_UPDATE_INTERFACE extends UpdatedStoreObjectStub
>(
    DATABASE: string, DB_VERSION: number,
    STORE_NAME: string,
    testData?: StoreObjectInterfaceExample[]
) {
    return DB_StoreDummy.builder(
        DATABASE, DB_VERSION, STORE_NAME, testData
    ).then(db => {
        return createDBManager<
            EditableStoreDB_I<StoreObjectInterfaceExample, PersistedStoreObjectInterfaceExample>
        >(db)
    })
}

describe("DBStore", function(){

    beforeAll(async() => {
        await DB_StoreDummy.builder(
            "test", 3, "test")
    })

    it("addObject(...) - add object with key that does not exist - successfully added object", async() => {
        let storeInstance = await createDb(
            "test", 3, "test"
        )

        const newObject: StoreObjectInterfaceExample = {
            key: "testKey1"
        }

        let newObjectAddedToStore = await storeInstance.addObj(newObject);

        // await FlushPromises();

        expect(newObjectAddedToStore).toMatchObject({ ...newObjectAddedToStore, id: 1})
    });

    it("getObjectByIndexColumn(...) - get object by column index that exists", async () => {
        let storeInstance = await createDb(
            "test", 3, "test",
            [
                {key: "testKey"}
            ]
        )

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
        let storeInstance = await createDb(
            "test", 3, "test",
            [
                {key: "testKey1"},
                {key: "testKey2"},
                {key: "testKey3"}
            ]
        )

        let allObjectsFromStore = await storeInstance.getAllObjs()

        // assert(allObjectsFromStore.length == 3)
        console.log("results\n")
        console.log(allObjectsFromStore)
        expect(allObjectsFromStore.length).toBe(3)
    })

    it("deleteObjectById", async () => {
        let storeInstance = await createDb(
            "test", 3, "test",
            [
                {key: "testKey1"}
            ]
        )

        storeInstance.deleteObjById(1)

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
            id: 1, theKey: "testKey10"
        }

        storeInstance.updateObject(expectedTestKeyUpdated)

        let allObjects = await storeInstance.getAllObjs()

        expect(allObjects.length).toBe(1)
        expect(allObjects[0].id).toBe(expectedTestKeyUpdated.id)
        expect(allObjects[0].theKey).toBe(expectedTestKeyUpdated.theKey)
    })

});
