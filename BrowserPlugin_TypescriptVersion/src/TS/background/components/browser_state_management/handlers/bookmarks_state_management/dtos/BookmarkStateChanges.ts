import {Bookmarks} from "webextension-polyfill";
import BookmarkTreeNode = Bookmarks.BookmarkTreeNode;

export interface BookmarkRemovedInfo {
    parentId: string,
    node: BookmarkTreeNode
}

export interface BookmarkDataChangedInfo {
    url?: string
}

export interface BookmarkMovedInfo {
    parentId: string,
    index: number,
    oldParentId: string,
    oldIndex: number
}