"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBCache = void 0;
const MapCache_1 = __importDefault(require("../../../../../../../utils/MapCache"));
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
     * @param persistedObjId
     * @param newObj
     */
    cacheObjectWithId(persistedObjId, newObj) {
        this.cache.set(this.getStoreObjectKey(newObj), persistedObjId);
    }
    cacheObjectsWithIds(newObjs) {
        newObjs.forEach(newObj => {
            this.cache.set(this.getStoreObjectKey(newObj), newObj.id);
        });
    }
    getObjectIdByKey(key) {
        return this.cache.get(key);
    }
    getObjectIdsByKeys(objKeys) {
        return objKeys.reduce((result, objKey) => {
            if (this.cache.has(objKey)) {
                result.ids.push(this.cache.get(objKey));
            }
            else {
                result.keysNotCached.push(objKey);
            }
            return result;
        }, {
            ids: [],
            keysNotCached: []
        });
    }
}
exports.DBCache = DBCache;
function createDbCache(storeObjectKeyGetter, cacheInitData = []) {
    return new DBCache(storeObjectKeyGetter, new MapCache_1.default(new Map(cacheInitData.map(testDataToAdd => [
        storeObjectKeyGetter(testDataToAdd), testDataToAdd.id
    ])), 100, 10));
}
// export interface DBBuilderInterface<
//     STORE_T extends StoreObjectInterface,
//     STORE_T_UPDATE_INTERFACE extends UpdatedStoreObjectInterface,
//     T extends DB<STORE_T, STORE_T_UPDATE_INTERFACE>
// > {
//     new (storeName: string, db: IDBDatabase): T
// }
//
// export async function builder<
//     STORE_T extends StoreObjectInterface,
//     STORE_T_UPDATE_INTERFACE extends UpdatedStoreObjectInterface,
//     T extends DB<STORE_T, STORE_T_UPDATE_INTERFACE>
// >(
//     DATABASE: string, DB_VERSION: number,STORE_NAME: string,
//     createDBStore: CreateDBStoreHandler,
//     objectToBuild: DBBuilderInterface<STORE_T, STORE_T_UPDATE_INTERFACE, T>
// ): Promise<T> {
//     var createDB: IDBDatabase = await CreateDBStore(DATABASE, DB_VERSION, createDBStore)
//
//     return new objectToBuild(STORE_NAME, createDB);
// }
//# sourceMappingURL=DBCache.js.map