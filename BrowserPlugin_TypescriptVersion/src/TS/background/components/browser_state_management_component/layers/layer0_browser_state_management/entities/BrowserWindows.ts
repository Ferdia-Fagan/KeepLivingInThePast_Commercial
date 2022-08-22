import {WindowTabsStateManager} from "../../layer1_windows_state_management/WindowTabsStateManager";
import {WindowId} from "../values/Types";

export type BrowserWindows = Map<WindowId, WindowTabsStateManager>

export abstract class BrowserState {

    protected windows: BrowserWindows = new Map<WindowId, WindowTabsStateManager>();

    protected currentWindowOpen: WindowTabsStateManager;

    constructor(
        currentWindowOpen: WindowTabsStateManager = new WindowTabsStateManager(),
        currentWindowsOpen: Map<number, WindowTabsStateManager> = new Map([[1, currentWindowOpen]])
    ) {
        this.currentWindowOpen = currentWindowOpen

        this.windows = currentWindowsOpen

    }

}