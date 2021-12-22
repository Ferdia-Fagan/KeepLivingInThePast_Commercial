import TagObject from "./TagObject";
import {GetCreateDBStoreHandler} from "../../abstract_object_store_parts/factory/BuildDB";
import {builder, DBWithCache} from "../../abstract_object_store_parts/layers/cache/DBWithCache";
import BuildingSetupCheckInterface from "../../abstract_object_store_parts/factory/BuildingSetupCheckerInteface";
import {KEY_NAME} from "../utils/Utils";

interface TagsCollectionInterface {
    /**
     *
     * @description
     *
     * @param newTags
     * @returns new tag objects (with there ids)
     */
    addNewTagsAndReturnTagIds(webpageLoggingId: number, newTags: TagObject[]): Promise<TagObject[]>

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

class TagsCollection extends DBWithCache<TagObject, TagObject>
                        implements TagsCollectionInterface{

    constructor(storeName: string, db: IDBDatabase) {
        super(storeName, db);
    }

    getStoreObjectKey(object: TagObject): IDBValidKey {
        return object.tag;
    }

    addNewTagsAndReturnTagIds(webpageLoggingId: number, newTags: TagObject[]): Promise<TagObject[]> {
        return super.addObjects(newTags)
        // TODO: use webpage logging id and new tags with ids to add tags for webpage to native applicatiion
    }

    getAllTags(): Promise<TagObject[]> {
        return super.getAllObjects();
    }

    getTagsByIds(tagIds: number[]): Promise<TagObject[]> {
        return super.getObjectsWithIds(tagIds);
    }
}

let tagsCollection: TagsCollectionInterface = null;
export default tagsCollection

class TagsCollectionBuildingManager implements BuildingSetupCheckInterface{

    request: Promise<null>
    constructor() {
        this.request = TagsCollectionBuildingManager.collectionBuilder()
    }

    static collectionDatabaseAndTableSetup = GetCreateDBStoreHandler(
        "TagsCollection",
        {
            indexName: KEY_NAME, indexKeyPath: "tag",
            options: {unique: true}
        }
    )

    static collectionBuilder = (): Promise<null> => builder<TagObject, TagObject, TagsCollection>(
        "WebpageTags", 1, "TagsCollection",
        TagsCollectionBuildingManager.collectionDatabaseAndTableSetup,
        TagsCollection
    ).then(tagsCollectionInstance => {
        tagsCollection = tagsCollectionInstance
        return null
    })

    checkIsSetUp(): boolean {
        return (tagsCollection != null);
    }

    deleteSelf(): void {
        tagsCollectionBuildingManager = null
    }
}

export var tagsCollectionBuildingManager = new TagsCollectionBuildingManager()
