"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildingManager_TagsStore = exports.tagsStore = void 0;
const Types_1 = require("../../components/parts/abstract_object_store_parts/layers/layer0_db/store_object/Types");
const BuildDBConstructionActions_1 = require("../../components/parts/abstract_object_store_parts/factory/BuildDBConstructionActions");
const DBCache_1 = require("../../components/parts/abstract_object_store_parts/layers/layer1_cache/DBCache");
class TagsStore extends DBCache_1.DBCache {
    constructor(storeName, db) {
        super(storeName, db);
    }
    getStoreObjectKey(object) {
        return object.tag;
    }
    addNewTagsAndReturnTagIds(webpageId, newTags) {
        return super.cacheObjectsWithIds(newTags);
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
        this.collectionDatabaseAndTableSetup = (0, BuildDBConstructionActions_1.GetCreateDBStoreHandler)("TagsStore", {
            indexName: Types_1.KEY_NAME, indexKeyPath: "tag",
            options: { unique: true }
        });
        this.constructionProcedure = () => (0, DBCache_1.builder)("WebpageTags", 1, "TagsStore", this.collectionDatabaseAndTableSetup, TagsStore).then(tagsCollectionInstance => {
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