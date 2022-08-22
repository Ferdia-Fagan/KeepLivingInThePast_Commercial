"use strict";
// TODO: complete
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
exports.create_DB_WithCache_Manager = exports.EditableDB_WithCache_Manager = void 0;
const Stitching_1 = require("../../../../../utils/Stitching");
class EditableDB_WithCache_Manager {
    constructor(db, methodsToNotStitch = new Set([
        "addObj",
        "addObjs",
        "getObjByKey",
        "getObjByIndexColumn",
        "getObjByKeys",
        "db",
        "cache",
        "deleteObjById"
    ]), cache) {
        this.addObj = (newElementToStore) => this.db.addObj(newElementToStore).then(newPersObj => {
            this.cache.cacheObject(newPersObj);
            return newPersObj;
        });
        this.addObjs = (newObjectsToAdd) => this.db.addObjs(newObjectsToAdd).then((persistedNewObjs) => {
            this.cache.cacheObjects(persistedNewObjs);
            return persistedNewObjs;
        });
        this.getObjByKey = (objKey) => {
            const objId = this.cache.getObjIdByKey(objKey);
            if (objId) {
                return this.db.getObjById(objId);
            }
            else {
                return this.db.getObjByKey(objKey).then(obj => {
                    this.cache.cacheObject(obj);
                    return obj;
                });
            }
        };
        this.getObjByIndexColumn = (indexName, value) => {
            return this.db.getObjByIndexColumn(indexName, value).then(obj => {
                this.cache.cacheObject(obj);
                return obj;
            });
        };
        this.getObjsByKeys = (objKeys) => {
            const cacheResponse = this.cache.getObjIdsByKeys(objKeys);
            const cachedIds = (!cacheResponse.cachedIds.length) ?
                null : this.db.getObjsByIds(cacheResponse.cachedIds);
            const nonCachedKeys = (!cacheResponse.keysNotCached) ?
                null : this.db.getObjsByKeys(cacheResponse.keysNotCached);
            nonCachedKeys.then();
            return Promise.all([
                (!cacheResponse.cachedIds.length) ?
                    null : this.db.getObjsByIds(cacheResponse.cachedIds),
                (!cacheResponse.keysNotCached) ?
                    null : this.db.getObjsByKeys(cacheResponse.keysNotCached)
            ].filter(v => v != null)).then(result => result.flat());
        };
        this.db = db;
        this.cache = cache;
        (0, Stitching_1.stitch)({
            _this: this,
            methodsToNotStitch: methodsToNotStitch,
            keyToObjectToSwitch: "db"
        });
    }
    deleteObjById(objId) {
        return __awaiter(this, void 0, void 0, function* () {
            const obj = yield this.db.getObjById(objId);
            yield this.db.deleteObjById(objId);
            this.cache.deleteObjByKey(obj.key);
        });
    }
}
exports.EditableDB_WithCache_Manager = EditableDB_WithCache_Manager;
function create_DB_WithCache_Manager({ db, methodsToNotStitch, cache, cachePrePopulateData }) {
    const manager = new EditableDB_WithCache_Manager(db, methodsToNotStitch, cache);
    cachePrePopulateData.forEach(obj => {
        manager.cache.cacheObject(obj);
    });
    return manager;
}
exports.create_DB_WithCache_Manager = create_DB_WithCache_Manager;
//# sourceMappingURL=DB_WithCache_Manager.js.map