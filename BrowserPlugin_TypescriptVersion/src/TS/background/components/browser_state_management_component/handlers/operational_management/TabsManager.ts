import browser from "webextension-polyfill";
import {WebpageDto} from "../../../native_application_communication_component/messages/message/webpage/Command_LogWebpageVisit";
import {WindowId} from "../../layers/layer0_browser_state_management/values/Types";
import {TabId} from "../../layers/layer1_windows_state_management/values/Types";
import {WebpageUrl} from "../../layers/layer2_webpage_state_management/entities/Types";

interface BrowserTabsStateControllerInterface {
    changeActiveTab(windowId: WindowId, previousTabId: TabId, currentTabId: TabId): void

    createNewTab(windowId: WindowId, tabId: TabId, webpage: WebpageDto): void
    removeTab(windowId: WindowId, tabId: TabId): void

    getWebpageForUrl(webpageUrl: WebpageUrl): Promise<WebpageDto>
}

class TabsManager {

    browserController: BrowserTabsStateControllerInterface

    constructor() {

        browser.tabs.onActivated.addListener(this.onChangeActiveTab.bind(this))

        browser.tabs.onCreated.addListener(this.onCreateNewTab.bind(this))
        browser.tabs.onRemoved.addListener(this.onRemoveTab.bind(this))

    }

    onChangeActiveTab(newCurrentTab: browser.Tabs.OnActivatedActiveInfoType) {
        this.browserController.changeActiveTab(
            newCurrentTab.windowId,
            newCurrentTab.previousTabId, newCurrentTab.tabId
        )
    }

    onCreateNewTab(newTabCreated: browser.Tabs.Tab) {
        this.browserController.getWebpageForUrl(newTabCreated.url).then((webpage: WebpageDto) => {
            this.browserController.createNewTab(
                newTabCreated.windowId,
                newTabCreated.id, webpage
            )
        })
    }

    onRemoveTab(tabId: number, removeInfo: browser.Tabs.OnRemovedRemoveInfoType) {
        this.browserController.removeTab(
            removeInfo.windowId,
            tabId
        )
    }

}

