import {
    BookmarkDataChangedInfo
} from "../../../browser_state_management/handlers/bookmarks_state_management/dtos/BookmarkStateChanges";
import {GetCreateDBStoreHandler} from "../../abstract_object_store_parts/factory/BuildDB";
import BuildingSetupCheckInterface from "../../abstract_object_store_parts/factory/BuildingSetupCheckerInteface";
import {
    builder,
    DBWithCacheWithOptionalReportingOfInsertedObjects
} from "../../abstract_object_store_parts/layers/reporting/DBWithCacheWithReporting";
import {ID_TYPE} from "../../store_objects_interfaces/types/Types";
import {KEY_NAME} from "../utils/Utils";
import {BookmarkFolderObject, BookmarkObject, BookmarkObjectUpdateReport} from "./BookmarkObject";
import {BookmarkFolderId, BookmarkId, BookmarkKey} from "./Types";
import {BookmarkType} from "./values/BookmarkType";


// TODO: complete next !!!!!! 

export interface StoreController_BookmarkManager {

    addBookmark(newBookmark: BookmarkObject | BookmarkFolderObject): Promise<BookmarkId>

    getBookmarkByKey(bookmarkKey: BookmarkKey): Promise<BookmarkObject>
    getBookmarkFolderIdByKey(bookmarkKey: BookmarkKey): Promise<BookmarkFolderId>
    // getBookmarkIds(bookmarkKeys: string[]): number[]    TODO: looked not great. Maybe make

    bookmarkDataChanged(bookmarkKey: string, changeInfo: BookmarkDataChangedInfo): void  // TODO: complete

    // moveBookmarkWithKey(bookmarkId: number, newParentId: number): void
    moveBookmark(bookmarkId: BookmarkId, newParentId: BookmarkId): void

    deleteBookmark(bookmarkId: BookmarkId): void
}

const BOOKMARKS_COLLECTION_RECORDS_ALL_OPERATIONS = true

class BookmarksStore extends DBWithCacheWithOptionalReportingOfInsertedObjects<
    BookmarkObject, BookmarkObjectUpdateReport
>
        implements StoreController_BookmarkManager{

    constructor(storeName: string, db: IDBDatabase) {
        super(storeName, db, BOOKMARKS_COLLECTION_RECORDS_ALL_OPERATIONS);
    }

    getBookmarkByKey(bookmarkKey: string): Promise<BookmarkObject> {
        return super.getObjectByKey(bookmarkKey)
    }

    protected checkIfStoreObjectShouldBeReported(storeObject: BookmarkObject): boolean {
        return (storeObject.bookmarkType === BookmarkType.BookmarkWebpage)
    }

    getStoreObjectKey(bookmarkObj: BookmarkObject): IDBValidKey {
        return bookmarkObj.key;
    }

    addBookmark(newBookmark: BookmarkObject): Promise<ID_TYPE> {
        return super.addObject(newBookmark)
    }

    getBookmarkFolderIdByKey(bookmarkKey: BookmarkKey): Promise<BookmarkId> {
        return super.getObjectByKey(bookmarkKey).then(
            (bookmarkObject): number =>  {
                return bookmarkObject.id
        })
    }

    moveBookmark(bookmarkId: BookmarkId, newParentId: BookmarkId): void {
        super.updateObject({
            id: bookmarkId,
            parentId: newParentId
        })
    }

    bookmarkDataChanged(bookmarkKey: string, changeInfo: BookmarkDataChangedInfo): void {

    }

    deleteBookmark(bookmarkId: BookmarkId): void {
        super.deleteObjectById(bookmarkId)
    }

}

let bookmarksCollection: StoreController_BookmarkManager = null;

class BookmarksCollectionBuildingManager implements BuildingSetupCheckInterface{

    request: Promise<null>
    constructor() {
        this.request = BookmarksCollectionBuildingManager.collectionBuilder()
    }

    static collectionDatabaseAndTableSetup = GetCreateDBStoreHandler(
        "BookmarksStore",
        {
            indexName: KEY_NAME, indexKeyPath: "key",
            options: {unique: true}
        },
    )

    static collectionBuilder = (): Promise<null> => builder<
        BookmarkObject, string, BookmarkObjectUpdateReport, BookmarksStore
    >(
        "WebpageTags", 1, "TagsCollection",
        BookmarksCollectionBuildingManager.collectionDatabaseAndTableSetup,
        BookmarksStore
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
