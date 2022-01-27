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
Object.defineProperty(exports, "__esModule", { value: true });
function builder(DATABASE, DB_VERSION, STORE_NAME, createDBStore, objectConstructor, objectToBuild) {
    return __awaiter(this, void 0, void 0, function* () {
        var createDB = yield new Promise((resolve, reject) => {
            var openDBReq = indexedDB.open(DATABASE, DB_VERSION);
            openDBReq.onsuccess = function (evt) {
                resolve(evt.target.result);
            };
            openDBReq.onerror = function (evt) {
                console.error("openDb:", "layer0_db request fail");
            };
            openDBReq.onupgradeneeded = createDBStore;
        });
        return new objectToBuild(STORE_NAME, createDB);
    });
}
// async function buildDBWithCach{
//
// }
//# sourceMappingURL=Builder.js.map