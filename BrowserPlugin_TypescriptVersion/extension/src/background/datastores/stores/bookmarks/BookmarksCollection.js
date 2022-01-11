"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookmarksCollectionBuildingManager = void 0;
const BuildDB_1 = require("../../abstract_object_store_parts/factory/BuildDB");
const DBWithCacheWithReporting_1 = require("../../abstract_object_store_parts/layers/reporting/DBWithCacheWithReporting");
const Utils_1 = require("../utils/Utils");
const BOOKMARKS_COLLECTION_RECORDS_ALL_OPERATIONS = true;
class BookmarksCollection extends DBWithCacheWithReporting_1.DBWithCacheWithReporting {
    constructor(storeName, db) {
        super(storeName, db, BOOKMARKS_COLLECTION_RECORDS_ALL_OPERATIONS);
    }
    getStoreObjectKey(object) {
        return object.key;
    }
    addBookmark(newBookmark) {
        super.addObject(newBookmark);
    }
    deleteBookmark(bookmarkId) {
        super.deleteObjectById(bookmarkId);
    }
    getIdOfBookmarkKey(bookmarkKey) {
        return super.getObjectByKey(bookmarkKey).then((bookmarkObject) => {
            return bookmarkObject.id;
        });
    }
    moveBookmarkWithKey(bookmarkId, newParentId) {
        super.updateObject({
            id: bookmarkId,
            parentId: newParentId
        });
    }
}
let bookmarksCollection = null;
exports.default = bookmarksCollection;
class BookmarksCollectionBuildingManager {
    constructor() {
        this.request = BookmarksCollectionBuildingManager.collectionBuilder();
    }
    checkIsSetUp() {
        return (bookmarksCollection != null);
    }
    deleteSelf() {
        exports.bookmarksCollectionBuildingManager = null;
    }
}
BookmarksCollectionBuildingManager.collectionDatabaseAndTableSetup = BuildDB_1.GetCreateDBStoreHandler("BookmarksCollection", {
    indexName: Utils_1.KEY_NAME, indexKeyPath: "key",
    options: { unique: true }
});
BookmarksCollectionBuildingManager.collectionBuilder = () => DBWithCacheWithReporting_1.builder("WebpageTags", 1, "TagsCollection", BookmarksCollectionBuildingManager.collectionDatabaseAndTableSetup, BookmarksCollection).then(bookmarksCollectionInstance => {
    bookmarksCollection = bookmarksCollectionInstance;
    return null;
});
exports.bookmarksCollectionBuildingManager = new BookmarksCollectionBuildingManager();
//# sourceMappingURL=BookmarksCollection.js.map