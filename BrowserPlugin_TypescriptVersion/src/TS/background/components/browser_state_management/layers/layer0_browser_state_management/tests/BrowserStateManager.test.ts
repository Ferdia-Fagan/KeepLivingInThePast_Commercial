import {
    createWindow,
    WindowTabsStateManager
} from "../../layer1_windows_state_management/WindowTabsStateManager";

beforeAll(function () {
    createBrowserStateManager()
})

describe('constructor', function () {

    it('addNewWindowOpened', function(){
        const windowToAdd: WindowTabsStateManager = createWindow()
        let sampleBrowserStateManager: BrowserStateManager = getBrowserStateManager()
        sampleBrowserStateManager.addNewWindowOpened(1,windowToAdd)

        let currentWindowsOpenFromWindowsStateManager = sampleBrowserStateManager['windowsOpen']
        expect(currentWindowsOpenFromWindowsStateManager.get(1)).toEqual(windowToAdd)
    });

    it('changeActiveWindowOpenedById', function(){
        // Given
        const window1: WindowTabsStateManager = createWindow()
        const window2: WindowTabsStateManager = createWindow()
        createBrowserStateManager(
            new Map([
                [1, window1],
                [2, window2]
            ]),
            window1
        )
        let sampleBrowserStateManager = getBrowserStateManager()
        expect(sampleBrowserStateManager.getActiveWindowOpened()).toBe(window1)

        // When
        sampleBrowserStateManager.changeActiveWindowOpenedById(2);

        // Then
        let actualCurrentActiveWindowOpened = sampleBrowserStateManager.getActiveWindowOpened();

        expect(sampleBrowserStateManager.getActiveWindowOpened())
            .toEqual(window2);
    });

    it('changeActiveWindowOpened', function(){
        // Given
        const window1: WindowTabsStateManager = createWindow()
        const window2: WindowTabsStateManager = createWindow()
        createBrowserStateManager(
            new Map([
                [1, window1],
                [2, window2]
            ]),
            window1
        )
        let sampleBrowserStateManager = getBrowserStateManager()
        expect(sampleBrowserStateManager.getActiveWindowOpened()).toBe(window1)

        // When
        sampleBrowserStateManager.changeActiveWindowOpened(window2);

        // Then
        let actualCurrentActiveWindowOpened = sampleBrowserStateManager.getActiveWindowOpened();

        expect(sampleBrowserStateManager.getActiveWindowOpened())
            .toEqual(window2);
    });

    it('removeWindow', function(){
        // Given
        const window1: WindowTabsStateManager = createWindow()
        const window2: WindowTabsStateManager = createWindow()
        createBrowserStateManager(
            new Map([
                [1, window1],
                [2, window2]
            ]),
            window1
        )
        let sampleBrowserStateManager = getBrowserStateManager()

        // when
        sampleBrowserStateManager.removeWindow(1);

        // then
        let currentWindowsOpenFromWindowsStateManager = sampleBrowserStateManager['windowsOpen'];
        expect(currentWindowsOpenFromWindowsStateManager.has(1)).toEqual(false);
        expect(currentWindowsOpenFromWindowsStateManager.size).toEqual(1);
        expect(currentWindowsOpenFromWindowsStateManager.get(2)).toEqual(window2);
    });
});


/**
 * What did not test:
 * 1) Did not test factory construction
 */
