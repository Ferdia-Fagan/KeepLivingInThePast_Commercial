import {TagId} from "../../../../datastores/stores/tags/Types";
import {WebpageStateContainer} from "../../layer2_webpage_state_management/WebpageStateManagement";
import {TabId} from "../values/Types";


export interface UserActions {
    openNewTab(tabId: number): void // addNewBlankTab
    closeTab(tabId: number): void

    changeFocusedTab(prevFocusedTabId: number, newFocusedTabId: number,
                     timeStamp: number): void
    setCurrentTab(tabId: number): void

    // checkIfTabIdIsCurrentActiveTab(tabId: number): boolean   TODO: not yet seemed to be implemented
    // checkIfCurrentTabIsOnNullPage(): boolean

    openWebpageOnTab(tabId: number, newWebpageOnTab: WebpageStateContainer, visitTime: number): void
    getWebpageAtTab(tabId: TabId): WebpageStateContainer
    getCurrentWebpage(): WebpageStateContainer
    // getCurrentWebpageId(): number    TODO:   not yet seemed to be implemented

    getCurrentTabWebpageTags(): Set<TagId>
}

export interface OperationActions
        extends FocusCheckUserBrowserControllerInterface{
}
