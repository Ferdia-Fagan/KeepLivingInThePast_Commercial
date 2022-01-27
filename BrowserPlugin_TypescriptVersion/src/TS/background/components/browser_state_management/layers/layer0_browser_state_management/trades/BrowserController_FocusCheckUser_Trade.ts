import {browserStateManager} from "../BrowserStateManager";

export interface BrowserController_FocusCheckUser_Trade {
    focusOnCurrentTab(): void

    unfocusOnCurrentTab(): void
}

export type BrowserController_FocusCheckUser = BrowserController_FocusCheckUser_Trade

export const browserController_FocusCheckUser: BrowserController_FocusCheckUser = browserStateManager

