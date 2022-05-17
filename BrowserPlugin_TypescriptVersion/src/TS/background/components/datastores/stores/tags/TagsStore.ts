import {KEY_NAME} from "../../parts/abstract_object_store_parts/layers/layer0_db/store_object/StoreObject_Constants";
import {StoreController} from "../../parts/abstract_object_store_parts/layers/Types";
import TagObject from "./TagObject";
import {GetCreateDBStoreHandler} from "../../parts/abstract_object_store_parts/factory/BuildDBConstructionActions";
import {builder} from "../../parts/abstract_object_store_parts/layers/layer1_cache/DBCache";
import BuildingSetupCheckInterface from "../../management/StoreConstructionSetupCheckerInteface";

interface TagsStoreInterface {
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

class TagsStore extends DBCache<TagObject, TagObject>
                        implements TagsStoreInterface {

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

export let tagsStore: TagsStoreInterface = null;

class TagsStoreBuildingManager
    implements BuildingSetupCheckInterface {

    request: Promise<null>
    constructor() {
        this.request = this.constructionProcedure()
    }

    collectionDatabaseAndTableSetup = GetCreateDBStoreHandler(
        "TagsStore",
        {
            indexName: KEY_NAME, indexKeyPath: "tag",
            options: {unique: true}
        }
    )

    constructionProcedure = (): Promise<null> => builder<TagObject, TagObject, TagsStore>(
        "WebpageTags", 1, "TagsStore",
        this.collectionDatabaseAndTableSetup,
        TagsStore
    ).then(tagsCollectionInstance => {
        tagsStore = tagsCollectionInstance
        return null
    })

    checkBuildIsSetUp(): boolean {
        return (tagsStore != null);
    }

    deleteBuildingManager(): void {
        buildingManager_TagsStore = null
    }
}

export var buildingManager_TagsStore = new TagsStoreBuildingManager()
