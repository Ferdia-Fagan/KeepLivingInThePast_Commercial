import {Bookmarks} from "webextension-polyfill";
import BookmarkTreeNode = Bookmarks.BookmarkTreeNode;
import {BookmarkDataChangedInfo, BookmarkMovedInfo, BookmarkRemovedInfo} from "./dtos/BookmarkStateChanges";

interface BookmarkStateManagerInterface {
    bookmarkCreated(bookmarkKey: string, bookmarkInfo: BookmarkTreeNode): void
    bookmarkDataChanged(bookmarkKey: string, changeInfo: BookmarkDataChangedInfo): void
    bookmarkMoved(bookmarkKey: string, moveInfo: BookmarkMovedInfo): void
    bookmarkRemoved(bookmarkKey: string, bookmarkInfo: BookmarkRemovedInfo): void
}