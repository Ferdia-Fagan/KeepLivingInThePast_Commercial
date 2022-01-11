import {getBrowserStateManager} from "../layers/layer0_browser_state_management/BrowserStateManager";

export interface BrowserController_FocusCheckUser_Trade {
    focusOnCurrentTab(): void

    unfocusOnCurrentTab(): void
}

export type BrowserController_FocusCheckUser = BrowserController_FocusCheckUser_Trade

export function get_BrowserController_FocusCheckUser(): BrowserController_FocusCheckUser {
    return getBrowserStateManager()
}