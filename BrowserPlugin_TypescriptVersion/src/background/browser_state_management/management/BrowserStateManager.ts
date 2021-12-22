import {Browser} from "../BrowserStateManager";
import {WindowTabsStateManager} from "../layer/windows_state_management/WindowTabsStateManager";

export default interface BrowserStateManager
    extends Browser {

    addNewWindowOpened(windowId: number, windowTabsStateManager: WindowTabsStateManager): void

    changeActiveWindowOpenedById(changedWindowId: number): void
    changeActiveWindowOpened(tabsStateManager: WindowTabsStateManager): void

    getActiveWindowOpened(): WindowTabsStateManager

    removeWindow(deletedWindowId: number): void
}

