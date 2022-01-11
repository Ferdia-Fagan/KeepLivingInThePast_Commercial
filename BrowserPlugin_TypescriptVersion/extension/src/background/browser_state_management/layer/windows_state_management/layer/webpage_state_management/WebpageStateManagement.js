"use strict";
// TODO: this will be were factories for dtos
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Webpage_1 = __importDefault(require("./entities/webpage/Webpage"));
// TODO: unit test
class WebpageStateManagementImpl extends Webpage_1.default {
    constructor(webpageLoggingId, metaData, metaData_UpdateTrackers, webpageFlags) {
        super(webpageLoggingId, metaData, metaData_UpdateTrackers, webpageFlags);
    }
    //  ------------------------------------------------
    focus(currentTimeStamp) {
        this.webpageFlags.isPaused = false;
        this.logVisitTime(currentTimeStamp);
    }
    unFocus(currentTimeStamp) {
        this.webpageFlags.isPaused = true;
        this.logVisitTime(currentTimeStamp);
    }
    //  ------------------------------------------------
    logWebpageVisitTime(currentTimeStamp) {
        //TODO: current functionality has log visit time as default behavior
        if (!this.webpageFlags.isPaused) {
            this.logVisitTime(currentTimeStamp);
        }
    }
    logWebpageLeaveTime(currentTimeStamp) {
        if (!this.webpageFlags.isPaused) {
            this.logLeaveTime(currentTimeStamp);
        }
    }
    //  ------------------------------------------------
    addWebpageBookmark(parentBookmarkId) {
        this.metaData.bookmarks.add(parentBookmarkId);
    }
    removeWebpageBookmark(parentBookmarkId) {
        this.metaData.bookmarks.delete(parentBookmarkId);
    }
    getWebpageBookmarks() {
        return this.metaData.bookmarks;
    }
    //  ------------------------------------------------
    getTags() {
        return this.metaData.tags;
    }
    addTags(tagIds) {
        tagIds.forEach(tagId => this.metaData.tags.add(tagId));
    }
    removeTags(tagIds) {
        tagIds.forEach(tagId => this.metaData.tags.delete(tagId));
    }
    //  ------------------------------------------------
    markAsIndexed() {
        this.webpageFlags.isIndexed = true;
    }
    // helpers:
    logVisitTime(visitTime) {
        this.metaData_UpdateTrackers.lastLogTime = visitTime;
    }
    logLeaveTime(leaveTime) {
        let leaveTimeElapsed = leaveTime - this.metaData_UpdateTrackers.lastLogTime;
        this.metaData_UpdateTrackers.totalVisitTime += leaveTimeElapsed;
        this.webpageFlags.totalVisitTime_updated = true;
    }
}
//# sourceMappingURL=WebpageStateManagement.js.map