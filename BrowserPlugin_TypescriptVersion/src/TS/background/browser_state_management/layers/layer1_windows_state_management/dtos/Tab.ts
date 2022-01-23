import {Webpage} from "../../layer2_webpage_state_management/entities/Webpage";

export interface TabTemp {
    tabId: number,
    webpageUrl: String
}

export default interface Tab {
    tabId: number,
    webpage:Webpage
}

