"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.builder = exports.DBWithCache = void 0;
const MapCache_1 = __importDefault(require("../../../../../utils/MapCache"));
const DB_1 = __importDefault(require("../db/DB"));
const Utils_1 = require("../../../stores/utils/Utils");
const BuildDB_1 = require("../../factory/BuildDB");
// TODO: make DBSTore, DBCache and DBReport and compoenents so are composable, rather than extendable.
// interface DBWithCacheInterface<STORE_T extends Interfaces, KEY_T extends IDBValidKey> extends
//     DBInterface<STORE_T>{
//     layer1_cache: MapCache<IDBValidKey, number>;
//
//     getObjectByKey(key_value: KEY_T): Promise<STORE_T>
// }
/**
 * description:
 * by using this,
 * store is assumed to have atleast:
 * {id, key,...}
 */
class DBWithCache extends DB_1.default {
    constructor() {
        super(...arguments);
        this.cache = new MapCache_1.default(100, 10);
    }
    // TODO: remove
    // static async builder(DATABASE: string, DB_VERSION: number,STORE_NAME: string){
    //     function onUpgradeNeededHandler(event: any){    // TODO: correct any
    //         var objectStore = event.currentTarget.result.createObjectStore(
    //             STORE_NAME, { keyPath: ID, autoIncrement: true });
    //
    //         objectStore.createIndex(
    //             "KEY",
    //             "KEY",
    //             {unique: true}
    //         )
    //
    //     }
    // }
    /**
     * Add new element (must not exist with key already) for system to indexdb and layer1_cache
     * (does not check layer1_cache)
     * @param object
     */
    addObject(object) {
        return super.addObject(object).then(objectId => {
            this.cache.set(this.getStoreObjectKey(object), objectId);
            return objectId;
        });
    }
    addObjects(newObjectsToAdd) {
        return super.addObjects(newObjectsToAdd).then(newObjectsHaveAdded => {
            return newObjectsHaveAdded.map((newObjectHaveAdded) => {
                this.cache.set(this.getStoreObjectKey(newObjectHaveAdded), newObjectHaveAdded.id);
                return newObjectHaveAdded;
            });
        });
    }
    getObjectByKey(key) {
        if (this.cache.has(key)) {
            let cachedIdValue = this.cache.get(key);
            return super.getObjectById(cachedIdValue);
        }
        else {
            return super.getObjectByIndexColumn(Utils_1.KEY_NAME, key);
        }
    }
}
exports.DBWithCache = DBWithCache;
function builder(DATABASE, DB_VERSION, STORE_NAME, createDBStore, objectToBuild) {
    return __awaiter(this, void 0, void 0, function* () {
        var createDB = yield BuildDB_1.CreateDBStore(DATABASE, DB_VERSION, createDBStore);
        return new objectToBuild(STORE_NAME, createDB);
    });
}
exports.builder = builder;
//# sourceMappingURL=DBWithCache.js.map