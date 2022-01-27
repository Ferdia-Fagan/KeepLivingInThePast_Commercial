import WebpageData
    from "../../../../../src/TS/background/components/browser_state_management/layers/layer2_webpage_state_management/components.webpages/WebpageData";
import {SetSettings} from "../../../../../src/TS/background/settings/Settings";

describe('basic functionality', function () {

    let aWindowTabsStateManager = new WindowTabsStateManager();

    it('addNewBlankTab', function(){
        aWindowTabsStateManager.addNewBlankTab(1);

        let actualBlankWebpageOfTab = aWindowTabsStateManager.getWebpageAtTab(1);

        expect(actualBlankWebpageOfTab).toEqual(null);
    });
});

describe('setTabWebpage', function () {

    SetSettings({toIndexAllPages: false, bookmarksFolderId: "1"});

    var aWindowTabsStateManager = new WindowTabsStateManager();

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('tab does not exist within window - expect no error thrown', function(){

        let sampleWebpageData = new WebpageData(1, false, false, 0, {});


        expect(() => aWindowTabsStateManager.setTabWebpage(10,sampleWebpageData, 10)).not.toThrow();
        // TODO: complete test for setTabWebpage
    });

    it('tab exists. But is not current tab - expect no logging visit time for previous tab webpage or new tab webpage',
        function(){

            let sampleCurrentWebpageOfNonCurrentTab = new WebpageData(1, false, false, 0, {});
            jest.spyOn(sampleCurrentWebpageOfNonCurrentTab, 'logVisitTime');
            sampleCurrentWebpageOfNonCurrentTab.setIndexingCheckpointMarkers(10,10);

            aWindowTabsStateManager['tabs'].set(1, sampleCurrentWebpageOfNonCurrentTab);
            expect(aWindowTabsStateManager['currentFocusedTabId']).not.toEqual(1);

            let sampleNewWebpageOfNonCurrentTab = new WebpageData(1, false, false, 0, {});
            jest.spyOn(sampleNewWebpageOfNonCurrentTab, 'logVisitStartTime');
            sampleNewWebpageOfNonCurrentTab.setIndexingCheckpointMarkers(10,10);
            aWindowTabsStateManager.setTabWebpage(1, sampleNewWebpageOfNonCurrentTab, 10);

            expect(sampleCurrentWebpageOfNonCurrentTab.logVisitTime).toHaveBeenCalledTimes(0);
            expect(sampleNewWebpageOfNonCurrentTab.logVisitStartTime).toHaveBeenCalledTimes(0);

            let actualWebpageOfTab = aWindowTabsStateManager.getWebpageAtTab(1);
            expect(actualWebpageOfTab).toEqual(sampleNewWebpageOfNonCurrentTab);
        });

    it('tab exists. Is on current tab. But current tab has blank webpage - so only logs time on current webpage', function(){

        jest.spyOn(WebpageData.prototype, 'logVisitTime');
        jest.spyOn(WebpageData.prototype, 'logVisitStartTime');

        aWindowTabsStateManager.addNewBlankTab(1);
        aWindowTabsStateManager['currentFocusedTabId'] = 1;

        let sampleWebpageData = new WebpageData(1, false, false, 0, {});
        sampleWebpageData.setIndexingCheckpointMarkers(100,100);
        let sampleVisitTime = 10;

        aWindowTabsStateManager.setTabWebpage(1, sampleWebpageData, sampleVisitTime);

        expect(WebpageData.prototype.logVisitTime).toHaveBeenCalledTimes(0);
        expect(WebpageData.prototype.logVisitStartTime).toHaveBeenCalledTimes(1);

        let actualWebpageOfTab = aWindowTabsStateManager.getWebpageAtTab(1);

        expect(actualWebpageOfTab['lastLogTime']).toEqual(10);
        expect(actualWebpageOfTab['metaData']['totalVisitTime']).toEqual(100);
    });

    it('tab exists. Is on current tab. Current tab has webpage - so logs time on both current and new webpage', function(){

        aWindowTabsStateManager.addNewBlankTab(1);
        aWindowTabsStateManager['currentFocusedTabId'] = 1;

        var sampleCurrentWebpageOfCurrentTab = new WebpageData(1, false, false, 0, {});
        const sampleCurrentWebpageLogVisitTimeFuncSpy = jest.spyOn(sampleCurrentWebpageOfCurrentTab, 'logVisitTime');

        sampleCurrentWebpageOfCurrentTab.setIndexingCheckpointMarkers(10,10);
        aWindowTabsStateManager['tabs'].set(1, sampleCurrentWebpageOfCurrentTab);

        var sampleNewWebpageOfCurrentTab = new WebpageData(1, false, false, 0, {});
        const sampleNewWebpageLogVisitStartTimeFuncSpy = jest.spyOn(sampleNewWebpageOfCurrentTab, 'logVisitStartTime');
        sampleNewWebpageOfCurrentTab.setIndexingCheckpointMarkers(20,20);


        aWindowTabsStateManager.setTabWebpage(1, sampleNewWebpageOfCurrentTab, 10); // old: 1, new: 1

        expect(sampleCurrentWebpageLogVisitTimeFuncSpy).toHaveBeenCalledTimes(1);
        expect(sampleNewWebpageLogVisitStartTimeFuncSpy).toHaveBeenCalledTimes(1);    // TODO: why?

        let actualWebpageOfTab = aWindowTabsStateManager.getWebpageAtTab(1);

        expect(actualWebpageOfTab['lastLogTime']).toEqual(10);
        expect(actualWebpageOfTab['metaData']['totalVisitTime']).toEqual(20);
    });

    // it('tab exists - expect tab webpage to be set', function(){
    //     aWindowTabsStateManager.addNewBlankTab(1);

    //     let sampleWebpageData = new WebpageData(1, false, false, 0, {});
    //     let sampleVisitTime = 10;

    //     aWindowTabsStateManager.setTabWebpage(1, sampleWebpageData, sampleVisitTime);

    //     let actualWebpageOfTab = aWindowTabsStateManager.getWebpageAtTab(1);

    //     expect(actualWebpageOfTab).toEqual(sampleWebpageData);
    // });
});

// Have not tested:
/**
 * setCurrentTab
 * getWebpageAtTab(tabId: number
 *  checkIfTabIdIsCurrentActiveTab
 *  checkIfCurrentTabIsOnNullPage
 * changeFocusedTab
 * getCurrentTabWebpageTags
 * getCurrentWebpageId
 * getCurrentWebpage
 * focusOnCurrentTab
 * unfocusCurrentTab
 */