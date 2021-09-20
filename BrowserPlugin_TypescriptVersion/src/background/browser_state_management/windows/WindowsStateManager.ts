import TabsStateManager from "../tabs/TabsStateManager";

export default class WindowsStateManager {
    
    currentWindowsOpen = new Map<number, TabsStateManager>();

    currentWindowOpen_TabsStateManager = new TabsStateManager();

    addNewWindowOpened(windowId: number, 
        tabsStateManager: TabsStateManager = new TabsStateManager() ){
        this.currentWindowsOpen.set(windowId, tabsStateManager);
    }

    changeActiveWindowOpened(changedWindowId: number){
        this.currentWindowOpen_TabsStateManager = this.currentWindowsOpen.get(changedWindowId);
    }

    removeWindow(deletedWindowId: number){
        this.currentWindowsOpen.delete(deletedWindowId);
    }
    
}

