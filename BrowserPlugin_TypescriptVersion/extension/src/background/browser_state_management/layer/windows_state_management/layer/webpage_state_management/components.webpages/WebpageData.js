"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WebpageData {
    /**
     *
     * @param {*} webpageLoggingId -> Long
     * @param {*} isIndexed -> Boolean
     * @param {*} isTagged -> Boolean
     * @param {*} timeStamp -> int
     * @param {*} metaData -> {metaDataProperty:Value...}
     */
    constructor(webpageLoggingId, isIndexed, isTagged, timeStamp, metaData) {
        this.webpageLoggingId = webpageLoggingId;
        this.isIndexed = isIndexed;
        this.isTagged = isTagged;
        this.metaData = metaData;
        this.lastLogTime = timeStamp;
        // this.metaData = {
        //     isIndexed: isIndexed,
        //     isTagged: isTagged
        // }
        // if(metaData !== {}){
        //     this.metaData = Object.assign(this.metaData,metaData);
        //     if("tags" in metaData){
        //         this.metaData.tags = new Set(this.metaData.tags)
        //     }
        // }
    }
    // SETTERS:
    /**
     *
     * @param {*} indexingCheckpointData -> totalVisitCount, totalVisitTime
     */
    // TODO: not put in interface
    setIndexingCheckpointMarkers(totalVisitCount, totalVisitTime) {
        this.metaData.totalVisitCount = totalVisitCount;
        this.metaData.totalVisitTime = totalVisitTime;
        this.metaData_UpdateTrackers = {
            totalVisitCount_updated: false,
            totalVisitTime_updated: false
        };
    }
    // TODO: not put in interface
    logVisitTime(currentTimeStamp, isBeingPaused = false) {
        if (!this.isPaused && !this.isIndexed) {
            this.isPaused = isBeingPaused;
            // TODO: here
            let visitTimeElapsed = currentTimeStamp - this.lastLogTime;
            this.metaData.totalVisitTime += visitTimeElapsed;
            this.lastLogTime = currentTimeStamp;
            // this.metaDataLocalUpdatesSinceLastReport.add(metaDataUpdateType.TOTAL_VISIT_TIME);
            this.metaData_UpdateTrackers.totalVisitTime_updated = true;
            // this.webpageMetadataLocalUpdates.add(this.webpageLoggingId);
        }
    }
    logLeavingTime() {
        // TODO: to complete logLeavingTime
    }
    logVisitStartTime(currentTimeStamp) {
        if (!this.isIndexed) {
            this.lastLogTime = currentTimeStamp;
        }
    }
    unpauseLoggingVisitTime(currentTimeStamp) {
        if (!this.isIndexed) {
            this.isPaused = false;
            this.lastLogTime = currentTimeStamp;
        }
    }
    // stopRecordingVisitTime(){
    //     logVisitTime()
    // }
    // startRecordingVisitTime(currentTimeStamp){
    //     // TODO: here
    //     this.lastLogTime = currentTimeStamp;
    //     this.metaDataUpdatesSinceLastReport.set(metaDataUpdateType.TOTAL_VISIT_TIME);
    //     updateReport.set(webpageLoggingId);
    // }
    logVisit() {
        if (!this.isIndexed) {
            this.metaData.totalVisitCount += 1;
            this.metaData_UpdateTrackers.totalVisitCount_updated = true;
            // this.metaDataLocalUpdatesSinceLastReport.add(metaDataUpdateType.TOTAL_VISIT_COUNT);
            // webpageMetadataLocalUpdates.add(this.webpageLoggingId);
        }
    }
    bookmarkWebpage(parentBookmarkId) {
        this.metaData.parentBookmarkId = parentBookmarkId;
    }
    markAsIndexed() {
        this.isIndexed = true;
        // this.metaDataUpdatesSinceLastReport.add(metaDataUpdateType.IS_INDEXED)
        // webpagesHaveUpdated.add(this.webpageLoggingId);
    }
    // TODO: COMPLETE
    updateTagsWithReport() {
        // updateTagsWithReport(updateReport){
        // && JSON.stringify(this.metaData.tags) !== '{}'
        // if(!("tags" in this.metaData)){
        //     this.metaData.tags = new Set();
        //     this.metaData.isTagged = true;
        //     // this.metaDataUpdatesSinceLastReport.add(metaDataUpdateType.IS_TAGGED)
        //     // webpagesHaveUpdated.add(this.webpageLoggingId);
        // }
        // for(let [tagId,isAdded] of updateReport){
        //     if(isAdded){
        //         // Then are adding this tag
        //         this.metaData.tags.add(tagId)
        //     }else{
        //         // Then are deleting this tag
        //         this.metaData.tags.delete(tagId)
        //     }
        // }
        // if(this.metaData.tags.size == 0 && this.metaData.isTagged){
        //     this.metaData.isTagged = false;
        //     // this.metaDataUpdatesSinceLastReport.add(metaDataUpdateType.IS_TAGGED)
        //     // webpagesHaveUpdated.add(this.webpageLoggingId);
        // }
    }
    // TODO: COMPLETE
    addTags() {
        // addTags(updateReport){
        // if(!("tags" in this.metaData)){
        //     this.metaData.tags = new Set();
        //     this.metaData.isTagged = true;
        //     // this.metaDataUpdatesSinceLastReport.add(metaDataUpdateType.IS_TAGGED)
        //     // webpagesHaveUpdated.add(this.webpageLoggingId);
        // }
        // for(const tagUpdate of updateReport){
        //     this.metaData.tags.add(tagUpdate)
        // }
        // if(this.metaData.tags.size == 0 && this.metaData.isTagged){
        //     this.metaData.isTagged = false;
        //     // this.metaDataUpdatesSinceLastReport.add(metaDataUpdateType.IS_TAGGED)
        //     // webpagesHaveUpdated.add(this.webpageLoggingId);
        // }
    }
    /*     addTagToWebpage(tag,tagId){
    
            if(tag in this.metaData){
                this.metaData.tag.set(tagId,tag)
            }else{
                this.metaData.tag = new Map([[tagId,tag]])
            }
        } */
    /*     removeTheTagOnWebpage(tagId){
            if(tag in this.metaData){
                this.metaData.tag.delete(tagId)
            }
        } */
    getTags() {
        if (this.metaData.tags != null) {
            return Array.from(this.metaData.tags);
        }
        else {
            return [];
        }
    }
    // UPDATE REPORT:
    // TODO: Complete + Write test
    getLocalUpdatesForWebpage(clearUpdates = true) {
        var webpageToBeIndexedUpdateReport = {};
        if (!this.isIndexed) {
            if (this.metaData_UpdateTrackers.totalVisitCount_updated) {
                // webpageToBeIndexedUpdateReport["totalVisitCount"] = this.metaData.totalVisitCount 
            }
            if (this.metaData_UpdateTrackers.totalVisitTime_updated) {
                // webpageToBeIndexedUpdateReport["totalVisitTime"] = this.metaData.totalVisitTime
            }
        }
        return { webpageToBeIndexedUpdateReport };
    }
    // TODO: Complete + write test
    getUpdatesForReport(clearUpdates = true) {
        // let metaDataUpdatesSinceLastReport = this.metaDataUpdatesSinceLastReport
        // if(clearUpdates){
        //     this.metaDataUpdatesSinceLastReport = new Set();
        // }
        // var webpageUpdateReport = [];
        // for(let metadataParamToBeUpdated of metaDataUpdatesSinceLastReport.dtos()){
        //     // webpageUpdateReport.push([metadataParamToBeUpdated, this.metaData[metadataParamToBeUpdated]]);
        // }
        // return webpageUpdateReport;
    }
    toJSON() {
        return {
            // metaDataUpdatesSinceLastReport: this.metaDataUpdatesSinceLastReport,
            // otherUpdatesSinceLastReport:this.otherUpdatesSinceLastReport,
            webpageLoggingId: this.webpageLoggingId,
            isPaused: this.isPaused,
            metaData: this.metaData,
            lastLogTime: this.lastLogTime,
        };
    }
}
exports.default = WebpageData;
//# sourceMappingURL=WebpageData.js.map