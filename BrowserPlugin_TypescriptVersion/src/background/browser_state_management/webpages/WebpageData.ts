import MetaData from "./MetaData";


export default class WebpageData{

    metaData: MetaData;

    readonly webpageLoggingId: number;

    /**
     * 
     * @param {*} webpageLoggingId -> Long
     * @param {*} isIndexed -> Boolean 
     * @param {*} isTagged -> Boolean
     * @param {*} timeStamp -> int
     * @param {*} metaData -> {metaDataProperty:Value...}
     */
    constructor(webpageLoggingId: number, isIndexed: boolean, 
                isTagged: boolean, timeStamp: number, metaData: MetaData){
        
        this.metaDataUpdatesSinceLastReport = new Set();
        
        this.metaDataLocalUpdatesSinceLastReport = new Set();

        // this.otherUpdatesSinceLastReport = new Set();

        this.webpageLoggingId = webpageLoggingId;

        this.isPaused = false;

        this.metaData = {
            isIndexed: isIndexed,
            isTagged: isTagged
        }

        if(metaData !== {}){
            this.metaData = Object.assign(this.metaData,metaData);
            if("tags" in metaData){

                this.metaData.tags = new Set(this.metaData.tags)
            }
            
        }



        this.lastLogTime = timeStamp;

        // this.waitingForWebpageInfoChange = false;
    }

    // SETTERS:

    /**
     * 
     * @param {*} indexingCheckpointData -> totalVisitCount, totalVisitTime
     */
    setIndexingCheckpointMarkers(indexingCheckpointData){

        this.metaData.totalVisitCount = indexingCheckpointData.totalVisitCount
        this.metaData.totalVisitTime = indexingCheckpointData.totalVisitTime

        this.totalVisitCount_updated = false
        this.totalVisitTime_updated = false
    }

    logVisitTime(currentTimeStamp, isBeingPaused = false){
        if(!this.isPaused && !this.isIndexed){

            this.isPaused = isBeingPaused;
            // TODO: here
            let visitTimeElapsed = currentTimeStamp - this.lastLogTime;



            this.metaData.totalVisitTime += visitTimeElapsed;

            
            this.lastLogTime = currentTimeStamp;

            // this.metaDataLocalUpdatesSinceLastReport.add(metaDataUpdateType.TOTAL_VISIT_TIME);
            this.totalVisitTime_updated = true;
            webpageMetadataLocalUpdates.add(this.webpageLoggingId);
        }
    }

    logVisitStartTime(currentTimeStamp){
        if(!this.isIndexed){

            // if(!this.isIndexed){
            this.lastLogTime = currentTimeStamp;  
        }        
    }

    unpauseLoggingVisitTime(currentTimeStamp){
        if(!this.isIndexed){

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

    logVisit(){
        if(!this.isIndexed){

            this.metaData.totalVisitCount += 1;

            this.totalVisitCount_updated = true;
    
            this.metaDataLocalUpdatesSinceLastReport.add(metaDataUpdateType.TOTAL_VISIT_COUNT);
            webpageMetadataLocalUpdates.add(this.webpageLoggingId);
        }
    }

    bookmarkWebpage(parentBookmarkId){

        this.metaData.parentBookmarkId = parentBookmarkId;

        // this.otherUpdatesSinceLastReport.add(OtherUpdateTypes.Bookmark)
        // this.updatesSinceLastReport.set(metaDataUpdateType.BOOKMARK_CHANGED)
        // webpagesHaveUpdated.add(this.webpageLoggingId);
    }

    markAsIndexed(){

        this.metaData.isIndexed = true;

        // this.tags = true;
        this.metaDataUpdatesSinceLastReport.add(metaDataUpdateType.IS_INDEXED)
        webpagesHaveUpdated.add(this.webpageLoggingId);
    }

    updateTagsWithReport(updateReport){


        // && JSON.stringify(this.metaData.tags) !== '{}'
        if(!("tags" in this.metaData)){

            this.metaData.tags = new Set();
            this.metaData.isTagged = true;
            this.metaDataUpdatesSinceLastReport.add(metaDataUpdateType.IS_TAGGED)
            webpagesHaveUpdated.add(this.webpageLoggingId);
        }
        // this.metaData.tags.add(1)
        for(let [tagId,isAdded] of updateReport){

            if(isAdded){
                // Then are adding this tag
                this.metaData.tags.add(tagId)

            }else{
                // Then are deleting this tag
                this.metaData.tags.delete(tagId)

            }
        }




        if(this.metaData.tags.length == 0 && this.metaData.isTagged){


            this.metaData.isTagged = false;
            this.metaDataUpdatesSinceLastReport.add(metaDataUpdateType.IS_TAGGED)
            webpagesHaveUpdated.add(this.webpageLoggingId);
        }
    }

    addTags(updateReport){

        if(!("tags" in this.metaData)){

            this.metaData.tags = new Set();

            this.metaData.isTagged = true;
            this.metaDataUpdatesSinceLastReport.add(metaDataUpdateType.IS_TAGGED)
            webpagesHaveUpdated.add(this.webpageLoggingId);
        }
        
        for(const tagUpdate of updateReport){

            this.metaData.tags.add(tagUpdate)
        }


        if(this.metaData.tags.length == 0 && this.metaData.isTagged){

            this.metaData.isTagged = false;
            this.metaDataUpdatesSinceLastReport.add(metaDataUpdateType.IS_TAGGED)
            webpagesHaveUpdated.add(this.webpageLoggingId);
        }
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

    getTags(){
        if(this.metaData.tags != null){

            return Array.from(this.metaData.tags)
        }else{
            return []
        }
    }


    // UPDATE REPORT:

    getLocalUpdatesForWebpage(clearUpdates = true){


        // const localWebpageMetadataUpdates = this.metaDataLocalUpdatesSinceLastReport

        // if(clearUpdates){
        //     this.metaDataLocalUpdatesSinceLastReport = new Set();
        // }

        // var webpageLocalUpdateReport = [];
        // for(let metadataParamToBeUpdated of localWebpageMetadataUpdates.values()){
        //
        //     webpageLocalUpdateReport.push([metadataParamToBeUpdated, this.metaData[metadataParamToBeUpdated]]);
        // }
        var webpageToBeIndexedUpdateReport = {}
        if(!this.isIndexed){
            if(this.totalVisitCount_updated){
                webpageToBeIndexedUpdateReport["totalVisitCount"] = this.metaData.totalVisitCount 
            }
            if(this.totalVisitTime_updated){
                webpageToBeIndexedUpdateReport["totalVisitTime"] = this.metaData.totalVisitTime
            }
        }

        //
        // return webpageLocalUpdateReport;
        return {webpageToBeIndexedUpdateReport}
    }

    getUpdatesForReport(clearUpdates = true){


        let metaDataUpdatesSinceLastReport = this.metaDataUpdatesSinceLastReport
        // let otherUpdatesSinceLastReport = this.otherUpdatesSinceLastReport

        if(clearUpdates){
            this.metaDataUpdatesSinceLastReport = new Set();
            // this.otherUpdatesSinceLastReport = new Set();
        }


        var webpageUpdateReport = [];
        for(let metadataParamToBeUpdated of metaDataUpdatesSinceLastReport.values()){

            // wpUpdateMDReport[metaDataParamToBeUpdated] = WebPageLoggingIdsMap[webPageLoggingId].metaData[metaDataParamToBeUpdated];
            webpageUpdateReport.push([metadataParamToBeUpdated, this.metaData[metadataParamToBeUpdated]]);
        }

/*         var otherUpdates = {}
        for(let otherUpdateType of otherUpdatesSinceLastReport.values()){
            if(otherUpdateType === OtherUpdateTypes.Bookmark){
                if(this.metaData[otherUpdateType] !== null){
                    // have changed bookmark


                    otherUpdates[otherUpdateType] = [UpdateTypes.changeIndividual,this.metaData[otherUpdateType], this.webpageLoggingId]
                }else{
                    // Have deleted bookmark
                    otherUpdates[otherUpdateType] = [UpdateTypes.deleteIndividual,this.webpageLoggingId]
                }
            }
            else if(otherUpdateType === OtherUpdateTypes.Tags){

            }
        }


         */

        return webpageUpdateReport;
    }

    toJSON(){
        return {
            // metaDataUpdatesSinceLastReport: this.metaDataUpdatesSinceLastReport,
            // otherUpdatesSinceLastReport:this.otherUpdatesSinceLastReport,
            webpageLoggingId: this.webpageLoggingId,
            isPaused: this.isPaused,
            metaData: this.metaData ,
            lastLogTime: this.lastLogTime,
        }
    }

}


