import TabsStateManager from "../tabs/WindowTabsStateManager";

export default class WindowsStateManager {
    
    private currentWindowsOpen = new Map<number, TabsStateManager>();

    private currentWindowOpen: TabsStateManager;

    constructor(windowId: number, currentWindowOpen: TabsStateManager){
        this.currentWindowsOpen.set(windowId, currentWindowOpen);
        this.currentWindowOpen = currentWindowOpen;
    }

    addNewWindowOpened(windowId: number, 
        tabsStateManager: TabsStateManager = new TabsStateManager() ){
        this.currentWindowsOpen.set(windowId, tabsStateManager);
    }

    changeActiveWindowOpened(changedWindowId: number){
        this.currentWindowOpen = this.currentWindowsOpen.get(changedWindowId);
    }

    getActiveWindowOpened(): TabsStateManager{
        return this.currentWindowOpen;
    }

    removeWindow(deletedWindowId: number){
        this.currentWindowsOpen.delete(deletedWindowId);
    }
    
}

