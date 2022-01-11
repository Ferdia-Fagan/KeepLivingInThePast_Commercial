
class X {
    value: number;
    constructor(v: number) {
        this.value = v
    }

}

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

async function createX(): Promise<X> {
    await delay(20)
    return new X(10)
}

describe("test", () => {
    it("test", async () => {
        var x = null

        createX().then(xInstance => {
            x = xInstance
        })

        let i = 0
        while(true){
            console.log(i++)
            await delay(2)
            if(x){
                break
            }
        }
        console.log("done")
    })
})
