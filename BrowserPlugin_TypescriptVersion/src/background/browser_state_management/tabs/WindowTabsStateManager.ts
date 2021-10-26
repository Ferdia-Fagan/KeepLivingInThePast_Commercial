import WebpageData from "../webpages/WebpageData";

import {CurrentSettings} from "../../settings/Settings"

// TODO: need to split this into : sections. (1) webpage action handlers (for users actions with browser, (2) Browser PLUGIN system actions. This is to request something directly from browser plugin)

/**
 *  Description:
 *  Model of browser window
 */
export default class WindowTabsStateManager {

    tabs = new Map<number, WebpageData>();

    currentFocusedTabId: number = null; 
    // TODO: add to logic currentFocusedTabWebpage: WebpageData = null; 

    /**
     * description:
     * This is used when open a blank new tab.
     * @param tabId ]
     */
    addNewBlankTab(tabId: number){
        this.tabs.set(tabId,null)
    }

    /**
     *  description:
     *  set the tab webpage at an id.
     * @param tabId 
     * @param newWebpageOnTab 
     * @param visitTime 
     */
    setTabWebpage(tabId: number, newWebpageOnTab: WebpageData, visitTime: number){
        if(this.tabs.has(tabId)){
            if(!CurrentSettings.toIndexAllPages && tabId == this.currentFocusedTabId){
                // are setting current tab, so must adjust some measurements specific to current tab
                const currentTabWebpage = this.tabs.get(tabId);

                if(currentTabWebpage !== null){
                    currentTabWebpage.logVisitTime(visitTime);
                }

                newWebpageOnTab.logVisitStartTime(visitTime);
            }
            this.tabs.set(tabId, newWebpageOnTab);
        }
    }

    setCurrentTab(tabId: number){
        this.currentFocusedTabId = tabId;
    }

    getWebpageAtTab(tabId: number){
        return this.tabs.get(tabId);
    }

    checkIfTabIdIsCurrentActiveTab(tabId: number){
        return this.currentFocusedTabId  === tabId;
    }

    checkIfCurrentTabIsOnNullPage(){
        return this.tabs.get(this.currentFocusedTabId) === null;
    }
    
    // TODO: mark tab as waiting for webpage info change
    // markTabAsWaitingForWebpageInfoChange(tabId: number) {
    //     this.tabs.set(tabId,false);
    // }

    // TODO: check if current tab is not marked as waiting for webpage info change
    // checkIfCurrentTabIs_NOT_MarkedAsWaitingForWebpageInfoChange(){
    //     return this.tabs.get(this.currentFocusedTabId);
    // }



    // addTab(tabId,webpageLoggingId,isIndexed,metaData){
    //     tabs
    // }

    //TODO: complete and test
    deleteTab(tabId: number, timeStamp: number){
        if(this.tabs.has(tabId)){
            // TODO: log webpage visit time since leaving the page
            // if(tabId == this.currentFocusedTabId && !ToIndexAllPages){
            //     this.tabs.get(tabId).logVisitTime(timeStamp);
            // }
            this.tabs.delete(tabId);
        }
    }

    /**
     * description:
     * called when user switches tab in window.
     * 
     * @param prevFocusedTabId 
     * @param newFocusedTabId 
     * @param timeStamp 
     */
    changeFocusedTab(prevFocusedTabId: number, newFocusedTabId: number, 
                        timeStamp: number){
        this.currentFocusedTabId = newFocusedTabId;
        
        if(this.tabs.has(prevFocusedTabId)){
            const previousTabWebpage = this.tabs.get(prevFocusedTabId)
            if(previousTabWebpage !== null && !CurrentSettings.toIndexAllPages){
                // then the tab was not removed and so should log time

                previousTabWebpage.logVisitTime(timeStamp)
                // logWebPageVisitTime(activeInfo.previousTabId,time);
            }
        }

        if(this.tabs.has(newFocusedTabId)){
            const newFocusedTabWebpage = this.tabs.get(newFocusedTabId)

            if(newFocusedTabWebpage !== null){
                if(!CurrentSettings.toIndexAllPages){
                    // logWebPageStartTime(currentTabId, time);

                    newFocusedTabWebpage.logVisitStartTime(timeStamp)
                }

            }
        }
    }

    /**
     * description:
     * used for editing of webpage metadata.
     * 
     * @returns 
     */
    getCurrentTabWebpageTags(){
        if(this.tabs.get(this.currentFocusedTabId)){   //TODO: this is a hack for beta
            return this.tabs.get(this.currentFocusedTabId).getTags();
        }
    }

    getCurrentWebpageId(){
        return this.tabs.get(this.currentFocusedTabId).webpageLoggingId
    }

    getCurrentWebpage(){
        return this.tabs.get(this.currentFocusedTabId)
    }

    /**
     * Focus on current tab
     * 
     * @param timeStamp
     */
    focusOnCurrentTab(timeStamp: number){
        const currentTabWebpage = this.tabs.get(this.currentFocusedTabId)
        if(currentTabWebpage !== null){
            currentTabWebpage.unpauseLoggingVisitTime(timeStamp)
        }
    }

    unfocusCurrentTab(timeStamp: number){

        const currentTabWebpage = this.tabs.get(this.currentFocusedTabId)
        if(!CurrentSettings.toIndexAllPages && currentTabWebpage !== null){
            currentTabWebpage.logVisitTime(timeStamp,true)
        }
    }

}



