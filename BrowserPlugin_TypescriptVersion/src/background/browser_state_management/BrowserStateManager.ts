import {WindowTabsStateManager} from "./layer/windows_state_management/WindowTabsStateManager";
import BrowserStateManager from "./management/BrowserStateManager";

type WindowId = number

export abstract class Browser {
    protected currentWindowsOpen = new Map<WindowId, WindowTabsStateManager>();

    protected currentWindowOpen: WindowTabsStateManager;

    constructor(currentWindowsOpen: Map<number, WindowTabsStateManager>, currentWindowOpen: WindowTabsStateManager) {
        this.currentWindowsOpen = currentWindowsOpen
        this.currentWindowOpen = currentWindowOpen
    }

}

export class BrowserStateManagerImpl
    extends Browser
    implements BrowserStateManager{

    addNewWindowOpened(
        windowId: number,
        windowTabsStateManager: WindowTabsStateManager
    ): void {
        this.currentWindowsOpen.set(windowId, windowTabsStateManager);
    }

    changeActiveWindowOpenedById(changedWindowId: number){
        this.currentWindowOpen = this.currentWindowsOpen.get(changedWindowId);
    }

    changeActiveWindowOpened(windowTabsStateManager: WindowTabsStateManager){
        this.currentWindowOpen = windowTabsStateManager
    }

    getActiveWindowOpened(): WindowTabsStateManager{
        return this.currentWindowOpen;
    }

    removeWindow(deletedWindowId: number){
        this.currentWindowsOpen.delete(deletedWindowId);
    }
    
}

var browserStateManager: BrowserStateManager = null

export function browserStateManagerHasBeenSetUp(): boolean {
    return (browserStateManager == null)
}

export function getBrowserStateManager(): BrowserStateManager {
    return browserStateManager
}

export function createBrowserStateManager(
    currentWindowsOpen: Map<number, WindowTabsStateManager> = new Map<number, WindowTabsStateManager>(),
    currentWindowOpen: WindowTabsStateManager = null
): void{
    browserStateManager = new BrowserStateManagerImpl(currentWindowsOpen, currentWindowOpen)
    // newBrowserStateManager.addNewWindowOpened(windowId,currentWindowOpen)
    // newBrowserStateManager.changeActiveWindowOpened(currentWindowOpen)
}


