import NewWebpageOpenedDetails from "../layer/windows_state_management/layer/webpage_state_management/dtos/NewWebpageOpenedDetails";
import {TabChange} from "../layer/windows_state_management/dtos/TabStateChanges";

export interface WindowTabStateManagementInterface {
    tabCreated(tab: any): void  // TODO: specific type
    tabChanged(tabChangeDetails: TabChange): void
    tabRemoved(tabId: number): void
}

// TODO: complete hook up
export default interface WebpageStateManagementInterface {
    // recordWebpageVisit(webPageUrl: string, tabId: number, timeStamp: number): void
    newWebpageOpened(newWebpageOpenedDetails: NewWebpageOpenedDetails): void

    updateWebpageBookmark(webpageLoggingId: number, parentBookmarkId: number): void
    // updateWebpagesTags(webpageLoggingId: number, )   TODO: complete
}
