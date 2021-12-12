import assert from "assert";
import DB from "../../src/background/datastores/abstract_object_store_parts/layers/db/DB";
import IndexObject from "../../src/background/datastores/store_objects_interfaces/base_store_objects/IndexObject";


const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

interface XInterface {
    testFunction(): string
}

interface XSetup {
    returnWhenSetUp(): void
}

class X{
    a: string = null

    constructor(a: string) {
            this.doAction(a)
    }

    async returnWhenSetUp(){
        while (this.a == null){
            await delay(10)
        }
        return
    }

    async doAction(a: string) {
        await delay(100)
        this.a = a
    }

    testFunction(): string {
        return this.a + " world";
    }

}

describe("test", function() {

    it("test", async() => {

        var instance = new X("hello")

        await instance.returnWhenSetUp()

        console.log()

        delete instance.returnWhenSetUp

        let y = <XInterface> instance

        console.log()

    });

})