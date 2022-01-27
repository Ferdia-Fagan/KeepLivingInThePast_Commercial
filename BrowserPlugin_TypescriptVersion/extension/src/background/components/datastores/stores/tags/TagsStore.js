"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildingManager_TagsStore = exports.tagsStore = void 0;
const BuildDB_1 = require("../../abstract_object_store_parts/factory/BuildDB");
const DBWithCache_1 = require("../../abstract_object_store_parts/layers/cache/DBWithCache");
const Utils_1 = require("../utils/Utils");
class TagsStore extends DBWithCache_1.DBWithCache {
    constructor(storeName, db) {
        super(storeName, db);
    }
    getStoreObjectKey(object) {
        return object.tag;
    }
    addNewTagsAndReturnTagIds(webpageId, newTags) {
        return super.addObjects(newTags);
        // TODO: use webpage logging id and new tags with ids to add tags for webpage to message applicatiion
    }
    getAllTags() {
        return super.getAllObjects();
    }
    getTagsByIds(tagIds) {
        return super.getObjectsWithIds(tagIds);
    }
}
exports.tagsStore = null;
class TagsStoreBuildingManager {
    constructor() {
        this.collectionDatabaseAndTableSetup = BuildDB_1.GetCreateDBStoreHandler("TagsStore", {
            indexName: Utils_1.KEY_NAME, indexKeyPath: "tag",
            options: { unique: true }
        });
        this.constructionProcedure = () => DBWithCache_1.builder("WebpageTags", 1, "TagsStore", this.collectionDatabaseAndTableSetup, TagsStore).then(tagsCollectionInstance => {
            exports.tagsStore = tagsCollectionInstance;
            return null;
        });
        this.request = this.constructionProcedure();
    }
    checkBuildIsSetUp() {
        return (exports.tagsStore != null);
    }
    deleteBuildingManager() {
        exports.buildingManager_TagsStore = null;
    }
}
exports.buildingManager_TagsStore = new TagsStoreBuildingManager();
//# sourceMappingURL=TagsStore.js.map