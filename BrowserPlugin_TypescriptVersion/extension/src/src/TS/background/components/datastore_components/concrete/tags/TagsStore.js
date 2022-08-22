"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DBCache_Implementations_1 = require("../../abstract/parts/layers/layer1_cache/DBCache_Implementations");
class TagsStoreImpl extends DBCache_Implementations_1.DBCache {
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
// export let tagsStore: TagsStoreI = null;
//
// class TagsStoreBuildingManager
//     implements BuildingSetupCheckInterface {
//
//     request: Promise<null>
//     constructor() {
//         this.request = this.constructionProcedure()
//     }
//
//     collectionDatabaseAndTableSetup = GetCreateDBStoreHandler(
//         "TagsStore",
//         {
//             indexName: KEY_NAME, indexKeyPath: "tag",
//             options: {unique: true}
//         }
//     )
//
//     constructionProcedure = (): Promise<null> => builder<TagObject, TagObject, TagsStoreImpl>(
//         "WebpageTags", 1, "TagsStore",
//         this.collectionDatabaseAndTableSetup,
//         TagsStoreImpl
//     ).then(tagsCollectionInstance => {
//         tagsStore = tagsCollectionInstance
//         return null
//     })
//
//     checkBuildIsSetUp(): boolean {
//         return (tagsStore != null);
//     }
//
//     deleteBuildingManager(): void {
//         buildingManager_TagsStore = null
//     }
// }
//
// export var buildingManager_TagsStore = new TagsStoreBuildingManager()
//# sourceMappingURL=TagsStore.js.map