"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagsCollectionBuildingManager = void 0;
const BuildDB_1 = require("../../abstract_object_store_parts/factory/BuildDB");
const DBWithCache_1 = require("../../abstract_object_store_parts/layers/cache/DBWithCache");
const Utils_1 = require("../utils/Utils");
class TagsCollection extends DBWithCache_1.DBWithCache {
    constructor(storeName, db) {
        super(storeName, db);
    }
    getStoreObjectKey(object) {
        return object.tag;
    }
    addNewTagsAndReturnTagIds(webpageLoggingId, newTags) {
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
let tagsCollection = null;
exports.default = tagsCollection;
class TagsCollectionBuildingManager {
    constructor() {
        this.request = TagsCollectionBuildingManager.collectionBuilder();
    }
    checkIsSetUp() {
        return (tagsCollection != null);
    }
    deleteSelf() {
        exports.tagsCollectionBuildingManager = null;
    }
}
TagsCollectionBuildingManager.collectionDatabaseAndTableSetup = BuildDB_1.GetCreateDBStoreHandler("TagsCollection", {
    indexName: Utils_1.KEY_NAME, indexKeyPath: "tag",
    options: { unique: true }
});
TagsCollectionBuildingManager.collectionBuilder = () => DBWithCache_1.builder("WebpageTags", 1, "TagsCollection", TagsCollectionBuildingManager.collectionDatabaseAndTableSetup, TagsCollection).then(tagsCollectionInstance => {
    tagsCollection = tagsCollectionInstance;
    return null;
});
exports.tagsCollectionBuildingManager = new TagsCollectionBuildingManager();
//# sourceMappingURL=TagsCollection.js.map