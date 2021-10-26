import DBStore from "../../../../src/background/datastores/abstract_object_store_parts/DBStore";

import "mockzilla-webextension";
require("fake-indexeddb/auto");

import { ID, KEY } from "../../../../src/background/datastores/stores/Utils";

interface StoreObjectInterfaceExample {
    ID: number,
    KEY: IDBValidKey
}

var HAS_BEEN__CREATED: boolean = false;

var script_self = this;

// function handlerForCreationOfStore(self: ExampleObjectDBStore){
//     var HAS_BEEN__CREATED2 = HAS_BEEN__CREATED;
//     return function(evt: any): any{    // TODO: correct any
//         // This will set up the DS
//         console.log("handlerForCreationOfStore");
//         HAS_BEEN__CREATED2 = true;
//         self["DB"] = evt.result;
//     }
// }

// function getHAS_BEEN__CREATED() {
//     return HAS_BEEN__CREATED;
// }


class ExampleObjectDBStore extends DBStore<StoreObjectInterfaceExample> {


    constructor(DATABASE: string, DB_VERSION: number,STORE_NAME: string){
        // const self = this;
        function onUpgradeNeededHandler(event: any){    // TODO: correct any
            event.currentTarget.result.createObjectStore(
                STORE_NAME, { keyPath: ID, autoIncrement: true });
        }

        super(DATABASE, DB_VERSION, STORE_NAME, onUpgradeNeededHandler);

        // this._tagsUpdateReport = new Map();
    }

    static async builder(){
        
    }

    // handlerForCreationOfStore(self: ExampleObjectDBStore){
    //     var HAS_BEEN__CREATED2 = HAS_BEEN__CREATED;
    //     return function(evt: any): any{    // TODO: correct any
    //         // This will set up the DS
    //         console.log("handlerForCreationOfStore");
    //         HAS_BEEN__CREATED2 = true;
    //         self["DB"] = evt.result;
    //     }
    // }
    
    // getHAS_BEEN__CREATED() {
    //     return HAS_BEEN__CREATED;
    // }

    // authoriseIfDBStoreIsCreated(): boolean {
    //     return HAS_BEEN__CREATED;
    // }
}

var storeInstance: ExampleObjectDBStore = new ExampleObjectDBStore("testDatabaseName", 1, "testStoreName");

console.log("hello there")
// while(!getHAS_BEEN__CREATED()){
//     console.log();
// }
console.log("hello there")


describe("addElement", function(){

    beforeEach(async() => {
        console.log("")

        // const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

        // await delay(5000);
    })

    it("add object with key that does not exist - successfully added object", async() => {

        let newObject: StoreObjectInterfaceExample = {
            ID: 10,
            KEY: "testKey"
        }

        let handlerAfterObjectHasBeenSuccessfullyAdded = (evt: any) => console.log("added object to store");

        storeInstance.addElement(newObject, handlerAfterObjectHasBeenSuccessfullyAdded);
    });

    it("add object with key that does exist - unsuccessfully add object", function(){

    });


});

