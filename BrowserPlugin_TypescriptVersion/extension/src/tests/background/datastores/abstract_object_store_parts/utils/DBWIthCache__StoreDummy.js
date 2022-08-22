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
exports.DBWithCache_StoreDummy = exports.DEFAULT_STORE_OBJECT_KEY_GETTER = void 0;
const DBCache_Implementations_1 = require("../../../../../src/TS/background/components/datastore_components/abstract/parts/layers/layer1_cache/DBCache_Implementations");
const MapCache_1 = __importDefault(require("../../../../../src/TS/background/utils/MapCache"));
const THE_KEY_NAME = "theKey";
const DEFAULT_STORE_OBJECT_KEY_GETTER = (obj) => obj.key;
exports.DEFAULT_STORE_OBJECT_KEY_GETTER = DEFAULT_STORE_OBJECT_KEY_GETTER;
class DBWithCache_StoreDummy extends DBCache_Implementations_1.DBCache {
    static builder(storeObjectKeyGetter = exports.DEFAULT_STORE_OBJECT_KEY_GETTER, testDataForCache = []) {
        return __awaiter(this, void 0, void 0, function* () {
            const cacheInit = new Map(testDataForCache.map(testDataToAdd => [
                storeObjectKeyGetter(testDataToAdd), testDataToAdd.id
            ]));
            return new DBWithCache_StoreDummy(storeObjectKeyGetter, new MapCache_1.default(cacheInit));
        });
    }
}
exports.DBWithCache_StoreDummy = DBWithCache_StoreDummy;
// export class DBWithCache_StoreDummy
//     extends DBCache<StoreObjectInterfaceExample, StoreObjectUpdateInterfaceExample>
//         implements  NonEditableStoreDBInterface<StoreObjectInterfaceExample, StoreObjectUpdateInterfaceExample>,
//                     DBWithCacheInterface<StoreObjectInterfaceExample>{
//
//     private constructor(STORE_NAME: string, DB: IDBDatabase){
//         super(STORE_NAME, DB)
//     }
//
//     getStoreObjectKey(storeObj: StoreObjectInterfaceExample): IDBValidKey {
//         return storeObj.theKey;
//     }
//
//     addObject = (newElementToStore: StoreObjectInterfaceExample): Promise<number> =>
//         super.addObject(newElementToStore)
//
//     getObjectByIndexColumn = (indexName: string, value: IDBValidKey): Promise<StoreObjectInterfaceExample> =>
//         super.getObjectByIndexColumn(indexName, value)
//
//     getAllObjects = (): Promise<Array<StoreObjectInterfaceExample>> =>
//         super.getAllObjects()
//
//     getObjectByKey = (key: string): Promise<StoreObjectInterfaceExample> =>
//         super.getObjectByKey(key)
//
//     updateObject = (storeObject: StoreObjectUpdateInterfaceExample): void =>
//         super.updateObject(storeObject)
//
//     deleteObjectById = (objectId: number): void =>
//         super.deleteObjectById(objectId)
// }
//# sourceMappingURL=DBWIthCache__StoreDummy.js.map