"use strict";
// TODO: this will be were factories for dtos
Object.defineProperty(exports, "__esModule", { value: true });
const Webpage_1 = require("./entities/Webpage");
// TODO: unit test
class WebpageStateManager extends Webpage_1.WebpageState {
    constructor(webpageLoggingId, metaData, metaData_UpdateTrackers, webpageFlags) {
        super(webpageLoggingId, metaData, metaData_UpdateTrackers, webpageFlags);
    }
    //  ------------------------------------------------
    focusOnCurrentTab(timeStamp) {
        this.webpageFlags.isPaused = true;
        this.logVisitTime(timeStamp);
    }
    unfocusOnCurrentTab(timeStamp) {
        this.webpageFlags.isPaused = false;
        this.logLeaveTime(timeStamp);
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
function createWebpage(webpageLoggingId, metaData, metaData_UpdateTrackers, webpageFlags) {
    return new WebpageStateManager(webpageLoggingId, metaData, metaData_UpdateTrackers, webpageFlags);
}
//# sourceMappingURL=WebpageStateManagement.js.map