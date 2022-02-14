
type IO<INPUT extends any, OUTPUT extends any> = ((input: INPUT) => OUTPUT)

interface ThenChain<INPUT extends any> {
    currentVal: INPUT,
    then<OUTPUT extends INPUT>(input: INPUT, fn: IO<INPUT, OUTPUT>): ThenChain<OUTPUT>
}

const ThenChainManager = <INPUT extends any>(initialVal: INPUT) => ({
    currentVal: initialVal,
    then<OUTPUT extends INPUT>(fn: IO<INPUT, OUTPUT>): ThenChain<OUTPUT> {
        this.currentVal = fn(this.currentVal)
        return this
    }
})

