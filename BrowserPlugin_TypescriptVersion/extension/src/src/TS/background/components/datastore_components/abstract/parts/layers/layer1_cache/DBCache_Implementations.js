"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBCache = void 0;
const MapCache_1 = __importDefault(require("../../../../../../utils/MapCache"));
/**
 * description:
 * by using this,
 * store is assumed to have atleast:
 * {id, key,...}
 */
class DBCache {
    // TODO: tunable (change cache size etc)
    constructor(storeObjectKeyGetter, cache = new MapCache_1.default()) {
        this.deleteObjByKey = (key) => this.cache.deleteKey(key);
        this.cache = cache;
        this.getStoreObjectKey = storeObjectKeyGetter;
    }
    /**
     * Add new element (must not exist with key already) for system to indexdb and layer1_cache
     * (does not check layer1_cache)
     * @param persistedObj
     */
    cacheObject(persistedObj) {
        this.cache.set(this.getStoreObjectKey(persistedObj), persistedObj.id);
    }
    cacheObjects(newObjs) {
        newObjs.forEach(newObj => {
            this.cache.set(this.getStoreObjectKey(newObj), newObj.id);
        });
    }
    getObjIdByKey(key) {
        return this.cache.get(key);
    }
    getObjIdsByKeys(objKeys) {
        return objKeys.reduce((result, objKey) => {
            if (this.cache.has(objKey)) {
                result.cachedIds.push(this.cache.get(objKey));
            }
            else {
                result.keysNotCached.push(objKey);
            }
            return result;
        }, {
            cachedIds: [],
            keysNotCached: []
        });
    }
}
exports.DBCache = DBCache;
//# sourceMappingURL=DBCache_Implementations.js.map