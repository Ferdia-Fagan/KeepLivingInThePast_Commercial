import browser from "webextension-polyfill"
import {WebpageM} from "./WebpageM";

export interface TabMData {
    id: number
    windowId: number,
    currentWebpage: WebpageM | undefined
}

export class TabM implements TabMData{

    constructor(
        public id: number,
        public windowId: number,
        public currentWebpage: WebpageM
    ) {}

    changeCurrentWebpage(webpage: WebpageM) {
        // this.currentWebpage = webpage
    }

    toString(): String {
        return `{
            tabId: ${this.id},\n
            currentWebpage: ${this.currentWebpage}\n
        }`
    }

}


export function createTabEntity(
    tab:  browser.Tabs.Tab
): TabM {
    const window = new WebpageM(-1, tab.url, tab.title)
    return new TabM(tab.id!!, tab.windowId!!, window)
}








