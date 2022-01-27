import {Webpage} from "../../layer2_webpage_state_management/entities/Webpage";
import {WebpageStateContainer} from "../../layer2_webpage_state_management/WebpageStateManagement";
import {TabId} from "../values/Types";

export type Tabs = Map<TabId, WebpageStateContainer>

export default abstract class WindowTabsState {
    tabs: Tabs = new Map<TabId, WebpageStateContainer>()

    currentFocusedTabId: TabId = null
    currentFocusedWebpage: WebpageStateContainer

    constructor(
        tabs: Map<TabId, WebpageStateContainer> = new Map<TabId, WebpageStateContainer>(),
        currentFocusedTabId: TabId = null, currentFocusedWebpage: WebpageStateContainer = null
    ) {
        this.tabs = tabs
        this.currentFocusedTabId = currentFocusedTabId
        this.currentFocusedWebpage = currentFocusedWebpage
    }
}

