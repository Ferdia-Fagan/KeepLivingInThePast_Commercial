"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BookmarksStore_1 = require("../../../datastores/stores/bookmarks/BookmarksStore");
const Types_1 = require("../../../datastores/stores/bookmarks/Types");
const BookmarkType_1 = require("../../../datastores/stores/bookmarks/values/BookmarkType");
const BrowserController_Bookmarks_Trade_1 = require("../../layers/layer0_browser_state_management/trades/BrowserController_Bookmarks_Trade");
const webextension_polyfill_1 = __importDefault(require("webextension-polyfill"));
class BookmarkStateManager {
    // TODO: Complete
    // nativeApplicationController_Bookmarks: NativeApplicationCommunicationContract = getNativeApplicationCommunicationLink()
    constructor(browserController_Bookmarks, storeController_Bookmarks) {
        this.browserController_Bookmarks = browserController_Bookmarks;
        this.storeController_Bookmarks = storeController_Bookmarks;
        webextension_polyfill_1.default.bookmarks.onCreated.addListener(this.bookmarkCreated.bind(this));
        webextension_polyfill_1.default.bookmarks.onChanged.addListener(this.bookmarkDataChanged.bind(this));
        webextension_polyfill_1.default.bookmarks.onMoved.addListener(this.bookmarkMoved.bind(this));
        webextension_polyfill_1.default.bookmarks.onRemoved.addListener(this.bookmarkRemoved.bind(this));
    }
    bookmarkCreated(bookmarkKey, bookmarkInfo) {
        this.storeController_Bookmarks.getBookmarkFolderIdByKey(bookmarkInfo.parentId).then(bookmarkParentFolderId => {
            if (bookmarkParentFolderId) {
                if (bookmarkInfo.type === Types_1.BookmarkTypeCheck) {
                    this.browserController_Bookmarks.getWebpageIdFromUrl(bookmarkInfo.url).then((bookmarkWebpageId) => {
                        this.storeController_Bookmarks.addBookmark({
                            key: bookmarkKey,
                            bookmarkType: BookmarkType_1.BookmarkType.BookmarkFolder,
                            parentId: bookmarkParentFolderId,
                            webpageId: bookmarkWebpageId
                        }).then((bookmarkId) => {
                            // add bookmark to webpage state
                            this.browserController_Bookmarks.addWebpageBookmark(bookmarkWebpageId, bookmarkId);
                            // TODO: need to add bookmark id to native application
                        });
                    });
                }
                else if (bookmarkInfo.type === Types_1.BookmarkFolderTypeCheck) {
                    this.storeController_Bookmarks.addBookmark({
                        key: bookmarkKey,
                        bookmarkType: BookmarkType_1.BookmarkType.BookmarkFolder,
                        parentId: bookmarkParentFolderId
                    }).then(bookmarkId => {
                        // TODO: need to add bookmark folder id to native application
                    });
                }
            }
        });
    }
    bookmarkDataChanged(bookmarkKey, changeInfo) {
        this.storeController_Bookmarks.getBookmarkFolderIdByKey(bookmarkKey).then(bookmarkId => {
            if (bookmarkId) {
                this.storeController_Bookmarks.bookmarkDataChanged(bookmarkKey, changeInfo);
            }
        });
    }
    bookmarkMoved(bookmarkKey, moveInfo) {
        Promise.all([
            this.storeController_Bookmarks.getBookmarkFolderIdByKey(bookmarkKey),
            this.storeController_Bookmarks.getBookmarkFolderIdByKey(moveInfo.parentId),
        ]).then(([bookmarkId, newBookmarkParentFolderId]) => {
            if (bookmarkId) {
                if (newBookmarkParentFolderId) {
                    // then still care about bookmark
                    this.storeController_Bookmarks.moveBookmark(bookmarkId, newBookmarkParentFolderId);
                }
                else {
                    // then dont care about bookmark, and so delete it from store
                    this.bookmarkRemoved(bookmarkKey);
                }
            }
            else {
                // then was not being tracked by bookmarks
                if (newBookmarkParentFolderId) {
                    // then is being moved into a folder that is tracked by bookmarks
                    webextension_polyfill_1.default.bookmarks.get(bookmarkKey).then((bookmarks) => {
                        this.bookmarkCreated(bookmarkKey, bookmarks[0]);
                    });
                }
            }
        });
    }
    bookmarkRemoved(bookmarkKey, bookmarkInfo = null) {
        this.storeController_Bookmarks.getBookmarkByKey(bookmarkKey).then(bookmarkObj => {
            if (bookmarkObj) {
                this.storeController_Bookmarks.deleteBookmark(bookmarkObj.id);
                if (bookmarkObj.webpageId) {
                    this.browserController_Bookmarks.removeWebpageBookmark(bookmarkObj.webpageId, bookmarkObj.id);
                }
            }
        });
    }
}
const bookmarkStateManager = new BookmarkStateManager(BrowserController_Bookmarks_Trade_1.browserController_Bookmarks, BookmarksStore_1.bookmarksStore);
//# sourceMappingURL=BookmarkStateManager.js.map