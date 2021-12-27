import {WebpageContracts} from "../../layer/webpage_state_management/entities/webpage/Webpage";
import {TabId} from "../../values/Types";

export default abstract class WindowTabs {
    tabs = new Map<TabId, WebpageContracts>();

    currentFocusedTabId: TabId = null;

    constructor(tabs: Map<TabId, WebpageContracts>, currentFocusedTabId: TabId) {
        this.tabs = tabs
        this.currentFocusedTabId = currentFocusedTabId
    }
}

