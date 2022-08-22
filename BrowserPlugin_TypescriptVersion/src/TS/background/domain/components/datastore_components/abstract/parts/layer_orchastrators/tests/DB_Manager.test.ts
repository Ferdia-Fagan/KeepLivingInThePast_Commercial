/**
 * This is a sample of code. Dont need to unit test Indexdb
 */

import "mockzilla-webextension";
import {
    DB_StoreDummy, PersistedStoreObjectInterfaceExample, StoreObjectInterfaceExample
} from "../../../../../../../../../../tests/background/datastores/abstract_object_store_parts/utils/DB/DB_StoreDummy";
import {createDataStoreFromParts} from "../../../factory/DataStoreFactory";
import {buildDBLayer, KeyIndexKeyAssignement} from "../../layers/layer0_db/construction/Builder";
import {EditableDB, EditableStoreDB_I} from "../../layers/layer0_db/implementations/EditableDB";
import {KEY_NAME} from "../../layers/layer0_db/store_object/StoreObject_Constants";
import {
    NonPersistedStoreObjectStub,
    UpdatedStoreObjectStub
} from "../../layers/layer0_db/store_object/StoreObject_Dtos";
import {PersistedStoreObject} from "../../layers/layer0_db/store_object/StoreObject_Types";
import {createDBManager, CreateDBManagerParams} from "../DB_Manager";

require("fake-indexeddb/auto");

function createDb<
    STORE_T extends NonPersistedStoreObjectStub,
    STORE_T_UPDATE_INTERFACE extends UpdatedStoreObjectStub,
    DATA_STORE_PARAMS extends CreateDBManagerParams<STORE_T, STORE_T_UPDATE_INTERFACE>,

    DATA_STORE_I extends EditableStoreDB_I<STORE_T, STORE_T_UPDATE_INTERFACE>,

    DATA_STORE_CONSTRUCTOR extends DatastoreConstructor<STORE_T, STORE_T_UPDATE_INTERFACE, DATA_STORE_I, DATA_STORE_PARAMS, R_STORE_REPORT_T>
>(
    DATABASE: string, DB_VERSION: number,
    STORE_NAME: string,
    testData?: STORE_T[]
) {
    return createDataStoreFromParts<
        STORE_T, STORE_T_UPDATE_INTERFACE, PersistedStoreObject,

        CreateDBManagerParams<STORE_T, STORE_T_UPDATE_INTERFACE>,

        EditableStoreDB_I<STORE_T, UPDATE_STORE_OBJECT_T>,

        DatastoreConstructor<STORE_T, STORE_T_UPDATE_INTERFACE, DATA_STORE_I, DATA_STORE_PARAMS, R_STORE_REPORT_T>
    >(

    )
    // return buildDBLayer<
    //     STORE_T,
    //     STORE_T_UPDATE_INTERFACE,
    //     EditableDB<STORE_T, STORE_T_UPDATE_INTERFACE>
    // >({
    //     DATABASE: "test",
    //     DB_VERSION: 3,
    //     STORE_NAME: "test",
    //     dbConstructor: EditableDB,
    //     startingData: testData,
    //     keyIndexAssignement: KeyIndexKeyAssignement,
    //     otherKeysIndexAssignements: []
    // }).then(db => {
    //     return createDBManager<
    //         StoreObjectInterfaceExample, PersistedStoreObjectInterfaceExample
    //     >({db : db})
    // })
}

describe("DBStore", function(){

    beforeAll(async() => {
        await buildDBLayer({
            DATABASE: "test",
            DB_VERSION: 3,
            STORE_NAME: "test",
            dbConstructor: EditableDB,
        })
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
            id: 1, key: "testKey10"
        }

        storeInstance.updateObject(expectedTestKeyUpdated)

        let allObjects = await storeInstance.getAllObjs()

        expect(allObjects.length).toBe(1)
        expect(allObjects[0].id).toBe(expectedTestKeyUpdated.id)
        expect(allObjects[0].key).toBe(expectedTestKeyUpdated.key)
    })

});
