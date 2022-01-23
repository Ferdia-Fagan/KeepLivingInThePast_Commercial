import "mockzilla-webextension";
import {mockEvent, MockzillaEventOf} from "mockzilla-webextension";
import {Idle, Tabs} from "webextension-polyfill-ts";
import {
    BrowserController_FocusCheckUser
} from "../../../layers/layer0_browser_state_management/trades/BrowserController_FocusCheckUser_Trade";

import {
    DETECTION_INTERVAL,
    FocusCheckUserManager
} from "../FocusCheckUserManager";
import IdleState = Idle.IdleState;

let idleStateActive = "active"
let idleStateIdle: IdleState = "idle"

describe("FocusCheckUserManager", () => {

    let onStateChanged: MockzillaEventOf<typeof mockBrowser.idle.onStateChanged>
    let browserController: BrowserController_FocusCheckUser

    beforeEach(() => {
        onStateChanged  = mockEvent(mockBrowser.idle.onStateChanged)

        browserController = {
            focusOnCurrentTab: jest.fn(),
            unfocusOnCurrentTab: jest.fn(),
        }

        mockBrowser.idle.setDetectionInterval.expect(DETECTION_INTERVAL)
    })

    describe("constructor", () => {

        it("check listeners", () => {
            const focusCheckUserManager = new FocusCheckUserManager(browserController)

            // @ts-ignore
            const x = focusCheckUserManager!["handleBrowserStateChange"]
            // @ts-ignore
            expect(onStateChanged.hasListeners(x)).toBe(true);
        })
    })

    describe("handleBrowserStateChange", () => {

        // beforeEach(() => {
        //     mockBrowser.idle.setDetectionInterval.expect(DETECTION_INTERVAL)
        // })

        // it("if state changes, calls 'handleBrowserStateChange'", () => {
        //     const focusCheckUserManager = new FocusCheckUserManager(browserController)
        //
        //     onStateChanged.emit(idleStateActive)
        //
        // })

        it("if focus state has changed to active -> focus on current webpage", () => {
            // given
            const focusCheckUserManager = new FocusCheckUserManager(browserController)

            // when
            // @ts-ignore
            onStateChanged.emit(idleStateActive)
            // then
            expect(browserController.focusOnCurrentTab).toHaveBeenCalled()
        })

        it("if focus state has changed to idle -> unfocus on current webpage", () => {
            // given
            const focusCheckUserManager = new FocusCheckUserManager(browserController)

            const tabInfo: Tabs.Tab[] = [
                {
                    active: true,
                    highlighted: false,
                    incognito: false,
                    index: 0,
                    pinned: false
                }
            ]
            mockBrowser.tabs.query.expect({currentWindow: true, active: true})
                .andResolve(tabInfo)

            // when
            focusCheckUserManager!["handleBrowserStateChange"](idleStateIdle)

            // then
            expect(focusCheckUserManager!["pauseLoggingTimeIfCurrentTabIsNotActive"](tabInfo))
        })

    })

    describe("pauseLoggingTimeIfCurrentTabIsNotActive", () => {
        it("give tab with audible set to false, then tell browser to unfocus on current tab", () => {
            // given
            const focusCheckUserManager = new FocusCheckUserManager(browserController)

            const tabInfo: Tabs.Tab[] = [
                {
                    active: true,
                    highlighted: false,
                    incognito: false,
                    index: 0,
                    pinned: false,

                    audible: false  // !! no audio playing on tab
                }
            ]

            // when
            focusCheckUserManager!["pauseLoggingTimeIfCurrentTabIsNotActive"](tabInfo)

            // then
            expect(browserController.unfocusOnCurrentTab).toHaveBeenCalled()
        })

    })

})






