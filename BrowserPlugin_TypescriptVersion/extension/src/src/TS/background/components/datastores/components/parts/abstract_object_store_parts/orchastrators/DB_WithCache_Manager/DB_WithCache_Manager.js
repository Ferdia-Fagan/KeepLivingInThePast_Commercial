"use strict";
// TODO: complete
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_DB_WithCache_Manager = exports.EditableDB_WithCache_Manager = void 0;
const DB_Manager_1 = require("../DB_Manager/DB_Manager");
class EditableDB_WithCache_Manager {
    constructor(db, cache) {
        this.addObj = (newElementToStore) => this.db.addObj(newElementToStore).then(persistedObjectId => {
            this.cache.cacheObjectWithId(persistedObjectId, newElementToStore);
            return persistedObjectId;
        });
        this.addObjs = (newObjectsToAdd) => this.db.addObjs(newObjectsToAdd).then((persistedNewObjs) => {
            this.cache.cacheObjectsWithIds(persistedNewObjs);
            return persistedNewObjs;
        });
        this.getObjByKey = (objKey) => {
            const objId = this.cache.getObjectIdByKey(objKey);
            if (objId) {
                return this.db.getObjById(objId);
            }
            else {
                return this.db.getObjByKey(objKey);
            }
        };
        this.getObjByKeys = (objKeys) => {
            const cacheResponse = this.cache.getObjectIdsByKeys(objKeys);
            const cachedIds = (!cacheResponse.ids.length) ?
                null : this.db.getObjsByIds(cacheResponse.ids);
            const nonCachedKeys = (!cacheResponse.keysNotCached) ?
                null : this.db.getObjByKeys(cacheResponse.keysNotCached);
            nonCachedKeys.then();
            return Promise.all([
                (!cacheResponse.ids.length) ?
                    null : this.db.getObjsByIds(cacheResponse.ids),
                (!cacheResponse.keysNotCached) ?
                    null : this.db.getObjByKeys(cacheResponse.keysNotCached)
            ].filter(v => v != null)).then(result => result.flat());
        };
        this.db = db;
        this.cache = cache;
    }
    deleteObj(objId, objKey) {
        this.db.deleteObjById(objId);
        this.cache.deleteObjByKey(objKey);
    }
}
exports.EditableDB_WithCache_Manager = EditableDB_WithCache_Manager;
function create_DB_WithCache_Manager(db, cache) {
    return (0, DB_Manager_1.stitchObjects)(new EditableDB_WithCache_Manager(db, cache), db);
}
exports.create_DB_WithCache_Manager = create_DB_WithCache_Manager;
//# sourceMappingURL=DB_WithCache_Manager.js.map