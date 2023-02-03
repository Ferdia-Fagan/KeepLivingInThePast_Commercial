import browser from "webextension-polyfill"
import {tabIdToWindowIdDependency, TabIdToWindowIdT} from "../../../analysis/BrowserDataModelsSingleton";
import {createTabEntity, TabM} from "./TabM";

interface RemoveInfoDto {
    windowId: number
    isWindowClosing: Boolean
}

export interface WindowMData{
    windowId: number
    tabs: Map<number, TabM>
    currentFocusedTab: TabM
    tabIdToWindowId: TabIdToWindowIdT
}

export class WindowM implements WindowMData {

    constructor(
        public windowId: number,
        public tabs: Map<number, TabM>,
        public currentFocusedTab: TabM,
        public tabIdToWindowId: TabIdToWindowIdT = tabIdToWindowIdDependency(),
    ){}

    openTab(tab: browser.Tabs.Tab) {
        // this.tabs.set(tab.id!!, createTabEntity(tab))
        // this.tabIdToWindowId.set(tab.id!!, tab.windowId!!)
    }

    closeTab(tabId: number) {
        // this.tabs.delete(tabId)
        // this.tabIdToWindowId.delete(tabId)
    }

    detachTab(tabId: number) {
        // const tab = this.tabs.get(tabId)!!
        // this.tabs.delete(tabId)
        // return tab
    }

    attachTab(tab: browser.Tabs.Tab) {
        // this.tabs.set(tab.id!!, createTabEntity(tab))
        // this.tabIdToWindowId.set(tab.id!!, tab.windowId!!)
    }

    changeCurrentFocusedTab(currentFocusedTabId: number) {
        // this.currentFocusedTab = this.tabs.get(currentFocusedTabId)!!
    }

    toString(): String {
        return `{
            windowId: ${this.windowId},\n
            tabs: {\n${
                [...this.tabs.entries()].join(", ")
            }\n},\n
            currentFocusedTab: ${this.currentFocusedTab},\n
            tabIdToWindowId: ${this.tabIdToWindowId}
        }`
    }

}

export function createWindowEntity(
    newWindow: browser.Windows.Window
): WindowM {
    let tabs = new Map<number, TabM>(newWindow.tabs!!.map(tab => {
        return [tab.id!!, createTabEntity(tab)]
    }))

    let windowEntity = new WindowM(newWindow.id,tabs, tabs.values().next().value)

    return windowEntity

}
