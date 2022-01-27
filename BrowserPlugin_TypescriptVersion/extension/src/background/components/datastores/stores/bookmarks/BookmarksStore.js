"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildingManager_BookmarksStore = exports.BookmarksCollectionBuildingManager = exports.bookmarksStore = void 0;
const BuildDB_1 = require("../../abstract_object_store_parts/factory/BuildDB");
const DBWithCacheWithReporting_1 = require("../../abstract_object_store_parts/layers/reporting/DBWithCacheWithReporting");
const Utils_1 = require("../utils/Utils");
const BookmarkType_1 = require("./values/BookmarkType");
const BOOKMARKS_COLLECTION_RECORDS_ALL_OPERATIONS = true;
class BookmarksStore extends DBWithCacheWithReporting_1.DBWithCacheWithOptionalReportingOfInsertedObjects {
    constructor(storeName, db) {
        super(storeName, db, BOOKMARKS_COLLECTION_RECORDS_ALL_OPERATIONS);
    }
    getBookmarkByKey(bookmarkKey) {
        return super.getObjectByKey(bookmarkKey);
    }
    checkIfStoreObjectShouldBeReported(storeObject) {
        return (storeObject.bookmarkType === BookmarkType_1.BookmarkType.BookmarkWebpage);
    }
    getStoreObjectKey(bookmarkObj) {
        return bookmarkObj.key;
    }
    addBookmark(newBookmark) {
        return super.addObject(newBookmark);
    }
    getBookmarkFolderIdByKey(bookmarkKey) {
        return super.getObjectByKey(bookmarkKey).then((bookmarkObject) => {
            return bookmarkObject.id;
        });
    }
    moveBookmark(bookmarkId, newParentId) {
        super.updateObject({
            id: bookmarkId,
            parentId: newParentId
        });
    }
    bookmarkDataChanged(bookmarkKey, changeInfo) {
    }
    deleteBookmark(bookmarkId) {
        super.deleteObjectById(bookmarkId);
    }
}
exports.bookmarksStore = null;
// export function get_StoreController_BookmarkManager(): StoreController_BookmarkManager {
//     return bookmarksStore
// }
class BookmarksCollectionBuildingManager {
    constructor() {
        this.collectionDatabaseAndTableSetup = BuildDB_1.GetCreateDBStoreHandler("BookmarksStore", {
            indexName: Utils_1.KEY_NAME, indexKeyPath: "key",
            options: { unique: true }
        });
        this.constructionProcedure = () => DBWithCacheWithReporting_1.builder("WebpageTags", 1, "TagsCollection", this.collectionDatabaseAndTableSetup, BookmarksStore).then(bookmarksCollectionInstance => {
            exports.bookmarksStore = bookmarksCollectionInstance;
            return null;
        });
        this.request = this.constructionProcedure();
    }
    checkBuildIsSetUp() {
        return (exports.bookmarksStore != null);
    }
    deleteBuildingManager() {
        exports.buildingManager_BookmarksStore = null;
    }
}
exports.BookmarksCollectionBuildingManager = BookmarksCollectionBuildingManager;
exports.buildingManager_BookmarksStore = new BookmarksCollectionBuildingManager();
//# sourceMappingURL=BookmarksStore.js.map