const ThenChainManager = (initialVal) => ({
    currentVal: initialVal,
    then(fn) {
        this.currentVal = fn(this.currentVal);
        return this;
    }
});
function add(a) {
    return a + 10;
}
//# sourceMappingURL=Functional.js.map