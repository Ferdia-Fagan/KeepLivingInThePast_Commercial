"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MapCache {
    constructor(initialCache = new Map(), maxSize = 150, clearSize = 100) {
        this.cache = initialCache;
        this._MAX_SIZE = maxSize;
        this._CLEAR_SIZE = clearSize;
    }
    get(key) {
        return this.cache.get(key);
    }
    set(key, value) {
        this.cache.set(key, value);
        if (this.cache.size == this._MAX_SIZE) {
            this.clearSpace();
        }
    }
    deleteKey(key) {
        this.cache.delete(key);
    }
    has(key) {
        return this.cache.has(key);
    }
    clearSpace() {
        let keysToRemove = Array.from(this.cache.keys()).slice(0, this._CLEAR_SIZE); // drop 10% of layer1_cache (KeyValues added first)
        keysToRemove.forEach(keyToRemove => this.cache.delete(keyToRemove));
    }
}
exports.default = MapCache;
//# sourceMappingURL=MapCache.js.map