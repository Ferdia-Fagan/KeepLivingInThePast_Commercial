import BookmarkObject, {BookmarkObjectUpdateReport} from "./BookmarkObject";
import BuildingSetupCheckInterface from "../../abstract_object_store_parts/factory/BuildingSetupCheckerInteface";
import {GetCreateDBStoreHandler} from "../../abstract_object_store_parts/factory/BuildDB";
import {ID_TYPE} from "../../store_objects_interfaces/types/Types";
import {
    builder,
    DBWithCacheWithReporting
} from "../../abstract_object_store_parts/layers/reporting/DBWithCacheWithReporting";
import {KEY_NAME} from "../utils/Utils";

interface BookmarksCollectionInterface {

    addBookmark(newBookmark: BookmarkObject): void
    getIdOfBookmarkKey(bookmarkKey: string): Promise<number>
    // getBookmarkIds(bookmarkKeys: string[]): number[]    TODO: looked not great. Maybe make
    moveBookmarkWithKey(bookmarkId: number, newParentId: number): void
    deleteBookmark(bookmarkId: number): void
}

const BOOKMARKS_COLLECTION_RECORDS_ALL_OPERATIONS = true

class BookmarksCollection extends DBWithCacheWithReporting<
    BookmarkObject, BookmarkObjectUpdateReport
>
        implements BookmarksCollectionInterface{

    constructor(storeName: string, db: IDBDatabase) {
        super(storeName, db, BOOKMARKS_COLLECTION_RECORDS_ALL_OPERATIONS);
    }

    getStoreObjectKey(object: BookmarkObject): IDBValidKey {
        return object.key;
    }

    addBookmark(newBookmark: BookmarkObject): void {
        super.addObject(newBookmark)
    }

    deleteBookmark(bookmarkId: number): void {
        super.deleteObjectById(bookmarkId)
    }

    getIdOfBookmarkKey(bookmarkKey: string): Promise<number> {
        return super.getObjectByKey(bookmarkKey).then(
            (bookmarkObject): number =>  {
                return bookmarkObject.id
        })
    }

    moveBookmarkWithKey(bookmarkId: number, newParentId: number): void {
        super.updateObject({
            id: bookmarkId,
            parentId: newParentId
        })
    }

}

let bookmarksCollection: BookmarksCollectionInterface = null;
export default bookmarksCollection

class BookmarksCollectionBuildingManager implements BuildingSetupCheckInterface{

    request: Promise<null>
    constructor() {
        this.request = BookmarksCollectionBuildingManager.collectionBuilder()
    }

    static collectionDatabaseAndTableSetup = GetCreateDBStoreHandler(
        "BookmarksCollection",
        {
            indexName: KEY_NAME, indexKeyPath: "key",
            options: {unique: true}
        },
    )

    static collectionBuilder = (): Promise<null> => builder<BookmarkObject, string, BookmarkObjectUpdateReport,
        BookmarksCollection>(
        "WebpageTags", 1, "TagsCollection",
        BookmarksCollectionBuildingManager.collectionDatabaseAndTableSetup,
        BookmarksCollection
    ).then(bookmarksCollectionInstance => {
        bookmarksCollection = bookmarksCollectionInstance
        return null
    })

    checkIsSetUp(): boolean {
        return (bookmarksCollection != null);
    }

    deleteSelf(): void {
        bookmarksCollectionBuildingManager = null
    }
}

export var bookmarksCollectionBuildingManager = new BookmarksCollectionBuildingManager()
