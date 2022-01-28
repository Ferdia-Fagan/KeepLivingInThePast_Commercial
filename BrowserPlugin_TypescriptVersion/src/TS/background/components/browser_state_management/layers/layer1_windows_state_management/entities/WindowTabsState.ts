import {WindowId} from "../../layer0_browser_state_management/values/Types";
import {Webpage} from "../../layer2_webpage_state_management/entities/Webpage";
import {WebpageStateContainer} from "../../layer2_webpage_state_management/WebpageStateManagement";
import {TabId} from "../values/Types";

export type WindowTabs = Map<TabId, WebpageStateContainer>

export interface WindowTabsData {
    windowId: WindowId
    tabs: WindowTabs

    currentFocusedTabId: TabId
    currentFocusedWebpage: WebpageStateContainer
}

export default abstract class WindowTabsState
    implements WindowTabsData {
    windowId: WindowId
    tabs: WindowTabs = new Map<TabId, WebpageStateContainer>()

    currentFocusedTabId: TabId = null
    currentFocusedWebpage: WebpageStateContainer

    constructor(
        x: WindowTabsData
        // windowId: WindowId,
        // tabs: Map<TabId, WebpageStateContainer> = new Map<TabId, WebpageStateContainer>(),
        // currentFocusedTabId: TabId = null,
        // currentFocusedWebpage: WebpageStateContainer = null
    ) {
        Object.assign(this, x)
        // this.windowId = windowId
        // this.tabs = tabs
        // this.currentFocusedTabId = currentFocusedTabId
        // this.currentFocusedWebpage = currentFocusedWebpage
    }
}

