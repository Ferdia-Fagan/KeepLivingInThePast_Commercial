import {KEY_NAME} from "../../abstract/parts/layers/layer0_db/store_object/StoreObject_Constants";
import {DBCache} from "../../abstract/parts/layers/layer1_cache/DBCache_Implementations";
import TagObject from "./objs/Tag";
import {GetCreateDBStoreHandler} from "../../abstract/parts/abstract_object_store_parts/factory/junk/BuildDBConstructionActions";
import BuildingSetupCheckInterface from "../../abstract/utils/management/StoreConstructionSetupCheckerInteface";

interface TagsStoreI {
    /**
     *
     * @description
     *
     * @param newTags
     * @returns new tag objects (with there ids)
     */
    addNewTagsAndReturnTagIds(webpageId: number, newTags: TagObject[]): Promise<TagObject[]>

    /**
     *
     * @returns all tag objects
     */
    getAllTags(): Promise<TagObject[]>

    /**
     * TODO: REMINDER: this was OG called getTagsNames
     * @param tagIds
     */
    getTagsByIds(tagIds: number[]): Promise<TagObject[]>


}

class TagsStoreImpl
    extends DBCache<TagObject, TagObject>
    implements TagsStoreI {

    constructor(storeName: string, db: IDBDatabase) {
        super(storeName, db);
    }

    getStoreObjectKey(object: TagObject): IDBValidKey {
        return object.tag;
    }

    addNewTagsAndReturnTagIds(webpageId: number, newTags: TagObject[]): Promise<TagObject[]> {
        return super.cacheObjectsWithIds(newTags)
        // TODO: use webpage logging id and new tags with ids to add tags for webpage to message applicatiion
    }

    getAllTags(): Promise<TagObject[]> {
        return super.getAllObjects();
    }

    getTagsByIds(tagIds: number[]): Promise<TagObject[]> {
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
