import WebpageData from "../../../../src/background/browser_state_management/webpages/WebpageData";


// TODO: properly test WebpageData


describe('constructor', function () {

    it('expects successful creation', function(){
        let aWebpageData = new WebpageData(1, false, false, 0, {});

        expect(aWebpageData['webpageLoggingId']).toEqual(1);

        expect(aWebpageData['isIndexed']).toEqual(false);
        expect(aWebpageData['isTagged']).toEqual(false);

        expect(JSON.stringify(aWebpageData['metaData'])).toMatch(JSON.stringify({}));

        expect(aWebpageData['lastLogTime']).toEqual(0);
    });

});


describe('setIndexingCheckpointMarkers', function () {

    it('expects correct assignment of property values from params', function(){
        let aWebpageData = new WebpageData(1, false, false, 0, {});

        aWebpageData.setIndexingCheckpointMarkers(10,20);

        let currentWebpageMetaData = aWebpageData['metaData'];
        let currentWebpageMetaData_UpdateTrackers = aWebpageData['metaData_UpdateTrackers'];

        expect(currentWebpageMetaData.totalVisitCount).toEqual(10);
        expect(currentWebpageMetaData.totalVisitTime).toEqual(20);

        expect(currentWebpageMetaData_UpdateTrackers.totalVisitCount_updated).toEqual(false);
        expect(currentWebpageMetaData_UpdateTrackers.totalVisitTime_updated).toEqual(false);
    });

});

describe('logVisitTime', function(){
    let aWebpageData = new WebpageData(1, false, false, 0, {});

    it('webpage is not paused or indexed, and want to pause webpage after log visit time', function(){
        let expectedWebpageTotalVisitTime = 10;
        let expectedWebpageIsPaused = true;
        let expectedWebpageLastLogTime = 10;
        let expectedWebpageMetaDataUpdateTrackersTotalVisitTimeUpdated = true;

        aWebpageData.setIndexingCheckpointMarkers(0,0);
        
        aWebpageData.logVisitTime(expectedWebpageLastLogTime, expectedWebpageIsPaused);

        expect(aWebpageData['isPaused']).toEqual(expectedWebpageIsPaused);
        expect(aWebpageData['metaData']['totalVisitTime']).toEqual(expectedWebpageTotalVisitTime);
        expect(aWebpageData['lastLogTime']).toEqual(expectedWebpageLastLogTime);
        expect(aWebpageData['metaData_UpdateTrackers']['totalVisitTime_updated']).toEqual(expectedWebpageMetaDataUpdateTrackersTotalVisitTimeUpdated);
    });

    it('webpage is paused - expect no change', function(){
        // TODO: test
    });

    it('webpage is indexed - expect no change', function(){
        // TODO: test
    });
});



// Have not tested:
/**
 *  logLeavingTime
 *  logVisitStartTime
 * unpauseLoggingVisitTime
 * logVisit
 * bookmarkWebpage
 * markAsIndexed
 * updateTagsWithReport
 * addTags
 * getTags
 * 
 */