import browser from "webextension-polyfill";
import {WebpageDto} from "../../../native_application_communication_component/messages/message/webpage/Command_LogWebpageVisit";
import {WindowId} from "../../layers/layer0_browser_state_management/values/Types";
import {WindowDto} from "../../layers/layer1_windows_state_management/dtos/WindowDto";
import {WebpageUrl} from "../../layers/layer2_webpage_state_management/entities/Types";

interface BrowserWindowsStateControllerInterface {
    windowOpened(windowId: WindowId, window: WindowDto): void
    windowClosed(windowIdAreClosing: WindowId): void
    changeFocusedWindow(newFocusedWindowId: WindowId): void

    getWebpageIdsForUrls(webpageUrls: String[]): Promise<Map<WebpageUrl, WebpageDto>>
}

class WindowsManager {

    browserController: BrowserWindowsStateControllerInterface

    constructor() {
        browser.windows.onCreated.addListener(this.onWindowOpened.bind(this))
        browser.windows.onRemoved.addListener(this.onWindowRemoved.bind(this))

        browser.windows.onFocusChanged.addListener(this.onChangedFocusedWindow.bind(this))
    }

    onWindowOpened(newWindowOpened: browser.Windows.Window) {
        this.browserController.getWebpageIdsForUrls(newWindowOpened.tabs.map((tab) => tab.url)).then((webpageIds: Map<WebpageUrl, WebpageDto>) => {
            this.browserController.windowOpened(
                newWindowOpened.id,
                {
                    tabs: new Map(newWindowOpened.tabs.map((tab) => [tab.id, webpageIds.get(tab.url)]))
                }
            )
        })
    }

    onWindowRemoved(windowIdAreClosing: WindowId) {
        this.browserController.windowClosed(windowIdAreClosing)
    }

    onChangedFocusedWindow(newFocusedWindowId: WindowId) {
        this.browserController.changeFocusedWindow(newFocusedWindowId)
    }

}

