
// TODO: this will be were factories for dtos

import {BookmarkId} from "../../../../../datastores/stores/bookmarks/values/Types";
import {TagId} from "../../../../../datastores/stores/tags/Types";
import UserAddedWebpageMetadata from "./entities/webpage/metadata/UserAddedWebpageMetadata";
import {WebpageFlags} from "./entities/webpage/metadata/WebpageFlags";
import {WebpageOptionalMeasurements} from "./entities/webpage/metadata/WebpageOptionalMeasurements";
import Webpage from "./entities/webpage/Webpage";
import WebpageFocusStateManagementInterface from "./management/WebpageFocusStateManagement";
import WebpageTotalVisitTimeStateManagementInterface from "./management/WebpageMetaDataStateManagement";
import WebpageMetaDataStateManagementInterface from "./management/WebpageTotalVisitTimeStateManagement";
import {UnaryReport} from "../../../../handlers/reporting/UnaryReport";

export interface WebpageStateManagement
    extends WebpageFocusStateManagementInterface,
        WebpageTotalVisitTimeStateManagementInterface,
        WebpageMetaDataStateManagementInterface {

}

// TODO: unit test
class WebpageStateManagementImpl
    extends Webpage
    implements WebpageStateManagement {

    constructor(
        webpageLoggingId: number,

        metaData: UserAddedWebpageMetadata,

        metaData_UpdateTrackers: WebpageOptionalMeasurements, webpageFlags: WebpageFlags
    ) {
        super(
            webpageLoggingId,
            metaData,
            metaData_UpdateTrackers, webpageFlags
        )
    }

    //  ------------------------------------------------

    focus(currentTimeStamp: number): void {
        this.webpageFlags.isPaused = false
        this.logVisitTime(currentTimeStamp)
    }

    unFocus(currentTimeStamp: number): void {
        this.webpageFlags.isPaused = true
        this.logVisitTime(currentTimeStamp)
    }

    //  ------------------------------------------------

    logWebpageVisitTime(currentTimeStamp: number): void {
        //TODO: current functionality has log visit time as default behavior
        if(!this.webpageFlags.isPaused){
            this.logVisitTime(currentTimeStamp)
        }
    }

    logWebpageLeaveTime(currentTimeStamp: number): void {
        if(!this.webpageFlags.isPaused){
            this.logLeaveTime(currentTimeStamp)
        }
    }

    //  ------------------------------------------------

    addWebpageBookmark(parentBookmarkId: BookmarkId): void {
        this.metaData.bookmarks.add(parentBookmarkId)
    }

    removeWebpageBookmark(parentBookmarkId: BookmarkId): void {
        this.metaData.bookmarks.delete(parentBookmarkId)
    }

    getWebpageBookmarks(): Set<BookmarkId> {
        return this.metaData.bookmarks
    }

    //  ------------------------------------------------

    getTags(): Set<TagId> {
        return this.metaData.tags;
    }

    addTags(tagIds: Set<TagId>): void {
        tagIds.forEach(tagId => this.metaData.tags.add(tagId))
    }

    removeTags(tagIds: Set<TagId>): void {
        tagIds.forEach(tagId => this.metaData.tags.delete(tagId))
    }

    //  ------------------------------------------------

    markAsIndexed(): void {
        this.webpageFlags.isIndexed = true
    }

    // helpers:

    private logVisitTime(visitTime: number){
        this.metaData_UpdateTrackers.lastLogTime = visitTime;
    }

    private logLeaveTime(leaveTime: number){
        let leaveTimeElapsed = leaveTime - this.metaData_UpdateTrackers.lastLogTime;
        this.metaData_UpdateTrackers.totalVisitTime += leaveTimeElapsed;
        this.webpageFlags.totalVisitTime_updated = true;
    }

}


