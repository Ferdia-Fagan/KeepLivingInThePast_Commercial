import {TagId} from "../../../../datastores/stores/tags/Types";
import WebpageData from "../layer/webpage_state_management/components.webpages/WebpageData";
import {WebpageContracts} from "../layer/webpage_state_management/entities/Webpage";
import {TabId} from "../values/Types";


export interface UserActions {
    openNewTab(tabId: number): void // addNewBlankTab
    closeTab(tabId: number): void

    changeFocusedTab(prevFocusedTabId: number, newFocusedTabId: number,
                     timeStamp: number): void
    setCurrentTab(tabId: number): void

    // checkIfTabIdIsCurrentActiveTab(tabId: number): boolean   TODO: not yet seemed to be implemented
    // checkIfCurrentTabIsOnNullPage(): boolean

    openWebpageOnTab(tabId: TabId, newWebpageOnTab: WebpageData, visitTime: number): void
    getWebpageAtTab(tabId: TabId): WebpageContracts
    getCurrentWebpage(): WebpageContracts
    // getCurrentWebpageId(): number    TODO:   not yet seemed to be implemented

    getCurrentTabWebpageTags(): TagId[]
}

export interface OperationActions {
    focusOnCurrentTab(timeStamp: number): void
    unFocusCurrentTab(timeStamp: number): void
}
