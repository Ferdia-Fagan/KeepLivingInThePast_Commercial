/**
 * This is a sample of code. Dont need to unit test Indexdb
 */


import DBStore from "../../../../src/background/datastores/abstract_object_store_parts/DBStore";

import "mockzilla-webextension";
require("fake-indexeddb/auto");

import { ID, KEY } from "../../../../src/background/datastores/stores/Utils";
import { flushPromises } from "../../../utils/AsyncUtils";

interface StoreObjectInterfaceExample {
    ID: number,
    KEY: IDBValidKey
}

var HAS_BEEN__CREATED: boolean = false;

var script_self = this;

class ExampleObjectDBStore extends DBStore<StoreObjectInterfaceExample> {

    private constructor(STORE_NAME: string, DB: IDBDatabase){
        super(STORE_NAME, DB)
    }

    static async builder(DATABASE: string, DB_VERSION: number,STORE_NAME: string){
        
        function onUpgradeNeededHandler(event: any){    // TODO: correct any
            event.currentTarget.result.createObjectStore(
                STORE_NAME, { keyPath: ID, autoIncrement: true });
        }

        
        var DB: IDBDatabase = await new Promise<IDBDatabase>((resolve,reject) => {
            var openDBReq = indexedDB.open(DATABASE, DB_VERSION);
            
            openDBReq.onsuccess = function (evt: Event) {
                // DB = evt.result;
                resolve(openDBReq.result)
            }

            openDBReq.onerror = function (evt) {
                console.error("openDb:", "db request fail");
            };

            openDBReq.onupgradeneeded = onUpgradeNeededHandler;
        })

        return new ExampleObjectDBStore(STORE_NAME, DB);

    }

}

describe("DBStore", function(){
    var storeInstance: ExampleObjectDBStore

    beforeAll(async() => {
        console.log("")
    
        storeInstance = await ExampleObjectDBStore.builder("testDatabaseName", 1, "testStoreName");
    })

    describe("addElement", function(){

        it("add object with key that does not exist - successfully added object and then do something", async() => {

            const newObject: StoreObjectInterfaceExample = {
                ID: 10,
                KEY: "testKey"
            }

            class X {
                id: number

                constructor(){

                }
                
                testFun(evt: any & Event): number{
                    this.id = evt.target.result;
                    return evt.target.result;
                }
            }
            var xInst = new X()

            function handlerAfterObjectHasBeenSuccessfullyAdded(evt: Event){
                const copyOfObject = newObject
                console.log("added object to store");
                console.log(xInst.testFun(evt));
                console.log(copyOfObject);
                
            }

            jest.spyOn(xInst, 'testFun');

            storeInstance.addElementAndThenDoSomething(
                newObject, 
                handlerAfterObjectHasBeenSuccessfullyAdded
            );

            await flushPromises();

            expect(xInst.testFun).toHaveBeenCalledTimes(1);
            expect(xInst.id).toEqual(10);
        });


    });
});
