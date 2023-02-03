import browser from "webextension-polyfill"

import {createWindowEntity, WindowM} from "./WindowM";

export type WindowsMapT = Map<number, WindowM>

export type WindowsList = WindowM[]

export interface BrowserMData {
    windows: WindowsMapT
    currentFocusedWindow: WindowM
}

export class BrowserM implements BrowserMData{

    constructor(
        public windows: Map<number, WindowM> = new Map<number, WindowM>(),
        public currentFocusedWindow: WindowM = null
    ) {}

    openWindow(newWindow: browser.Windows.Window) {
        this.windows.set(
            newWindow.id!!,
            createWindowEntity(newWindow)
        )
    }

    closeWindow(windowId: number) {
        this.windows.delete(windowId)
    }

    changeCurrentFocusedWindow(currentFocusedWindowId: number) {
        this.currentFocusedWindow = this.windows.get(currentFocusedWindowId)!!
    }

    toString(): String {
        return `{
            windows: { \n ${
                [...this.windows.entries()].join(", \n")
            }\n},\n
            currentFocusedWindow: ${this.currentFocusedWindow}\n
        }`
    }

}





