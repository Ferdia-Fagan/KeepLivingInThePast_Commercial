"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDbCache = void 0;
const MapCache_1 = __importDefault(require("../../../../../../utils/MapCache"));
const DBCache_Implementations_1 = require("./DBCache_Implementations");
function createDbCache(storeObjectKeyGetter, cacheInitData = []) {
    return new DBCache_Implementations_1.DBCache(storeObjectKeyGetter, new MapCache_1.default(new Map(cacheInitData.map(testDataToAdd => [
        storeObjectKeyGetter(testDataToAdd), testDataToAdd.id
    ])), 100, 10));
}
exports.createDbCache = createDbCache;
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
//# sourceMappingURL=DBCache_Funcs.js.map