import {Bookmarks} from "webextension-polyfill";
import {bookmarksStore, StoreController_BookmarkManager} from "../../../datastores/stores/bookmarks/BookmarksStore";
import {
    BookmarkFolderTypeCheck,
    BookmarkId,
    BookmarkKey,
    BookmarkTypeCheck
} from "../../../datastores/stores/bookmarks/Types";
import {BookmarkType} from "../../../datastores/stores/bookmarks/values/BookmarkType";
import {WebpageId} from "../../layers/layer2_webpage_state_management/entities/Types";
import {
    browserController_Bookmarks,
    BrowserController_Bookmarks,
} from "../../layers/layer0_browser_state_management/trades/BrowserController_Bookmarks_Trade";
import {BookmarkDataChangedInfo, BookmarkMovedInfo, BookmarkRemovedInfo} from "./dtos/BookmarkStateChanges";
import BookmarkTreeNode = Bookmarks.BookmarkTreeNode;

import browser from "webextension-polyfill";

interface BookmarksControllerInterface {
    bookmarkCreated(bookmarkKey: BookmarkKey, bookmarkInfo: Bookmarks.BookmarkTreeNode): void
    bookmarkDataChanged(bookmarkKey: BookmarkKey, changeInfo: Bookmarks.OnChangedChangeInfoType): void
    bookmarkMoved(bookmarkKey: string, moveInfo: Bookmarks.OnMovedMoveInfoType): void
    bookmarkRemoved(bookmarkKey: string, bookmarkInfo: Bookmarks.OnRemovedRemoveInfoType): void
}

class BookmarkStateManager
    implements BookmarksControllerInterface {

    browserController_Bookmarks: BrowserController_Bookmarks
    storeController_Bookmarks: StoreController_BookmarkManager

    // TODO: Complete
    // nativeApplicationController_Bookmarks: NativeApplicationCommunicationContract = getNativeApplicationCommunicationLink()

    constructor(
        browserController_Bookmarks: BrowserController_Bookmarks,
        storeController_Bookmarks: StoreController_BookmarkManager
    ) {
        this.browserController_Bookmarks = browserController_Bookmarks
        this.storeController_Bookmarks = storeController_Bookmarks

        browser.bookmarks.onCreated.addListener(this.bookmarkCreated.bind(this))
        browser.bookmarks.onChanged.addListener(this.bookmarkDataChanged.bind(this))
        browser.bookmarks.onMoved.addListener(this.bookmarkMoved.bind(this))
        browser.bookmarks.onRemoved.addListener(this.bookmarkRemoved.bind(this))
    }

    bookmarkCreated(bookmarkKey: string, bookmarkInfo: Bookmarks.BookmarkTreeNode): void {
        this.storeController_Bookmarks.getBookmarkFolderIdByKey(bookmarkInfo.parentId).then(bookmarkParentFolderId => {
            if(bookmarkParentFolderId) {
                if(bookmarkInfo.type === BookmarkTypeCheck){
                    this.browserController_Bookmarks.getWebpageIdFromUrl(bookmarkInfo.url).then(
                        (bookmarkWebpageId: WebpageId) => {
                            this.storeController_Bookmarks.addBookmark({
                                key: bookmarkKey,
                                bookmarkType: BookmarkType.BookmarkFolder,
                                parentId: bookmarkParentFolderId,
                                webpageId: bookmarkWebpageId
                            }).then((bookmarkId: BookmarkId) => {
                                // add bookmark to webpage state
                                this.browserController_Bookmarks.addWebpageBookmark(
                                    bookmarkWebpageId,
                                    bookmarkId
                                )
                                // TODO: need to add bookmark id to native application
                            })
                        }
                    )
                } else if(bookmarkInfo.type === BookmarkFolderTypeCheck){
                    this.storeController_Bookmarks.addBookmark({
                        key: bookmarkKey,
                        bookmarkType: BookmarkType.BookmarkFolder,
                        parentId: bookmarkParentFolderId
                    }).then(bookmarkId => {
                        // TODO: need to add bookmark folder id to native application
                    })
                }
            }
        })
    }

    bookmarkDataChanged(bookmarkKey: string, changeInfo: BookmarkDataChangedInfo): void {
        this.storeController_Bookmarks.getBookmarkFolderIdByKey(bookmarkKey).then(bookmarkId => {
            if(bookmarkId) {
                this.storeController_Bookmarks.bookmarkDataChanged(bookmarkKey, changeInfo)
            }
        })
    }

    bookmarkMoved(bookmarkKey: string, moveInfo: BookmarkMovedInfo): void {
        Promise.all([
            this.storeController_Bookmarks.getBookmarkFolderIdByKey(bookmarkKey),
            this.storeController_Bookmarks.getBookmarkFolderIdByKey(moveInfo.parentId),
        ]).then(([bookmarkId, newBookmarkParentFolderId]) => {
            if(bookmarkId) {
                if(newBookmarkParentFolderId) {
                    // then still care about bookmark
                    this.storeController_Bookmarks.moveBookmark(bookmarkId, newBookmarkParentFolderId)
                } else {
                    // then dont care about bookmark, and so delete it from store
                    this.bookmarkRemoved(bookmarkKey)
                }
            } else {
                // then was not being tracked by bookmarks
                if(newBookmarkParentFolderId) {
                    // then is being moved into a folder that is tracked by bookmarks
                    browser.bookmarks.get(bookmarkKey).then((bookmarks: BookmarkTreeNode[]) => {
                        this.bookmarkCreated(bookmarkKey, bookmarks[0])
                    })
                }
            }
        })
    }

    bookmarkRemoved(bookmarkKey: string, bookmarkInfo: BookmarkRemovedInfo = null): void {
        this.storeController_Bookmarks.getBookmarkByKey(bookmarkKey).then(bookmarkObj => {
            if(bookmarkObj) {
                this.storeController_Bookmarks.deleteBookmark(bookmarkObj.id)
                if(bookmarkObj.webpageId){
                    this.browserController_Bookmarks.removeWebpageBookmark(
                        bookmarkObj.webpageId, bookmarkObj.id
                    )
                }
            }
        })
    }

}

const bookmarkStateManager = new BookmarkStateManager(
    browserController_Bookmarks,
    bookmarksStore
)

