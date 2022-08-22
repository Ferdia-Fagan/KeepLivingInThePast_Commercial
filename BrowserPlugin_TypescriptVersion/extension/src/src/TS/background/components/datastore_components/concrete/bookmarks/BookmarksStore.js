"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildingManager_BookmarksStore = exports.BookmarksCollectionBuildingManager = exports.bookmarksStore = void 0;
const BuildDBConstructionActions_1 = require("../../abstract/parts/abstract_object_store_parts/factory/junk/BuildDBConstructionActions");
const StoreObject_Constants_1 = require("../../abstract/parts/layers/layer0_db/store_object/StoreObject_Constants");
const DBReportingManager_1 = require("../../abstract/parts/layers/layer2_reporting/DBReportingManager");
const BookmarkType_1 = require("./values/BookmarkType");
const BOOKMARKS_COLLECTION_RECORDS_ALL_OPERATIONS = true;
class BookmarksStore extends DBReportingManager_1.DBWithCacheWithOptionalReportingOfInsertedObjects {
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
        this.collectionDatabaseAndTableSetup = (0, BuildDBConstructionActions_1.GetCreateDBStoreHandler)("BookmarksStore", {
            indexName: StoreObject_Constants_1.KEY_NAME, indexKeyPath: "key",
            options: { unique: true }
        });
        this.constructionProcedure = () => (0, DBReportingManager_1.builder)("WebpageTags", 1, "TagsCollection", this.collectionDatabaseAndTableSetup, BookmarksStore).then(bookmarksCollectionInstance => {
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