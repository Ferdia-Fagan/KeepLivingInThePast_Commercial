import WebpageData from "../webpages/WebpageData";

import {ToIndexAllPages} from "../../settings/Settings"

export default class TabsState {

    tabs = new Map<number, WebpageData>();
    currentFocusedTabId: number = null;

    setCurrentTab(tabId: number){
        this.currentFocusedTabId = tabId;
    }

    checkIfTabIdIsCurrentActiveTab(tabId: number){
        return this.currentFocusedTabId  === tabId;
    }

    getWebpageAtTab(tabId: number){
        return this.tabs.get(tabId);
    }

    createBlankTab(tabId: number){
        this.tabs.set(tabId,null)
    }

    // TODO: mark tab as waiting for webpage info change
    // markTabAsWaitingForWebpageInfoChange(tabId: number) {
    //     this.tabs.set(tabId,false);
    // }

    // TODO: check if current tab is not marked as waiting for webpage info change
    // checkIfCurrentTabIs_NOT_MarkedAsWaitingForWebpageInfoChange(){
    //     return this.tabs.get(this.currentFocusedTabId);
    // }

    checkIfCurrentTabIsOnNullPage(){
        return this.tabs.get(this.currentFocusedTabId) === null;
    }

    // addTab(tabId,webpageLoggingId,isIndexed,metaData){
    //     tabs
    // }

    deleteTab(tabId: number, timeStamp: number){
        if(this.tabs.has(tabId)){
            // TODO: log webpage visit time since leaving the page
            // if(tabId == this.currentFocusedTabId && !ToIndexAllPages){
            //     this.tabs.get(tabId).logVisitTime(timeStamp);
            // }
            this.tabs.delete(tabId);
        }
    }

    setTabWebpage(tabId: number, newWebpageOnTab: WebpageData, 
                    timeStamp: number){

        if(!ToIndexAllPages && this.tabs.has(tabId)){
            const currentTabWebpage = this.tabs.get(tabId)
            if(currentTabWebpage !== null){
                currentTabWebpage.logVisitTime(timeStamp);
            }

            newWebpageOnTab.logVisitStartTime(timeStamp);
        }
        
        this.tabs.set(tabId, newWebpageOnTab)
    }

    changeFocusedTab(prevFocusedTabId: number, newFocusedTabId: number, 
                        timeStamp: number){
        this.currentFocusedTabId = newFocusedTabId;
        
        if(this.tabs.has(prevFocusedTabId)){
            const previousTabWebpage = this.tabs.get(prevFocusedTabId)
            if(previousTabWebpage !== null && !ToIndexAllPages){
                // then the tab was not removed and so should log time

                previousTabWebpage.logVisitTime(timeStamp)
                // logWebPageVisitTime(activeInfo.previousTabId,time);
            }
        }

        if(this.tabs.has(newFocusedTabId)){
            const newFocusedTabWebpage = this.tabs.get(newFocusedTabId)

            if(newFocusedTabWebpage !== null){
                if(!ToIndexAllPages){
                    // logWebPageStartTime(currentTabId, time);

                    newFocusedTabWebpage.logVisitStartTime(timeStamp)
                }

            }
        }
    }

    focusOnCurrentTab(timeStamp: number){

        const currentTabWebpage = this.tabs.get(this.currentFocusedTabId)
        if(currentTabWebpage !== null){
            currentTabWebpage.unpauseLoggingVisitTime(timeStamp)
        }
    }

    unfocusCurrentTab(timeStamp: number){

        const currentTabWebpage = this.tabs.get(this.currentFocusedTabId)
        if(!ToIndexAllPages && currentTabWebpage !== null){
            currentTabWebpage.logVisitTime(timeStamp,true)
        }
    }

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

}



