
// TODO: this will be were factories for dtos

import {BookmarkId} from "../../../datastores/concrete_store_implementations/bookmarks/Types";
import {TagId} from "../../../datastores/concrete_store_implementations/tags/Types";
import UserAddedWebpageMetadata from "./entities/metadata/UserAddedWebpageMetadata";
import {WebpageFlags} from "./entities/metadata/WebpageFlags";
import {WebpageOptionalMeasurements} from "./entities/metadata/WebpageOptionalMeasurements";
import {Webpage, WebpageState} from "./entities/Webpage";
import {
    WebpageFocusStateManagementInterface, WebpageMetaDataStateManagementInterface,
    WebpageTotalVisitTimeStateManagementInterface
} from "./management/Actions";

export interface WebpageStateManagement
    extends WebpageState,
            WebpageFocusStateManagementInterface,
            WebpageTotalVisitTimeStateManagementInterface,
            WebpageMetaDataStateManagementInterface {

}

export interface WebpageStateContainer
    extends WebpageState,
            WebpageStateManagement, Webpage {

}

// TODO: unit test
class WebpageStateManager
    extends WebpageState
    implements WebpageStateContainer {

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

    focusOnCurrentTab(timeStamp: number): void {
        this.webpageFlags.isPaused = true
        this.logVisitTime(timeStamp)
    }

    unfocusOnCurrentTab(timeStamp: number): void {
        this.webpageFlags.isPaused = false
        this.logLeaveTime(timeStamp)
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

function createWebpage(
    webpageLoggingId: number,
    metaData: UserAddedWebpageMetadata, metaData_UpdateTrackers: WebpageOptionalMeasurements,
    webpageFlags: WebpageFlags
): WebpageStateContainer {
    return new WebpageStateManager(
        webpageLoggingId,
        metaData, metaData_UpdateTrackers,
        webpageFlags
    )
}


