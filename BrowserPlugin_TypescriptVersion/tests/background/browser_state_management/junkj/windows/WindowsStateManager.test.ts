// import { assert } from "console";
// import WindowTabsStateManager from "../../../../../src/background/browser_state_management/layers/layer1_windows_state_management/WindowTabsStateManager";
// import BrowserStateManager from "../../../../../src/background/browser_state_management/BrowserStateManager";
//
//
// describe('constructor', function () {
//     it('constructor', function() {
//         let sampleWindowTabsStateManager = new WindowTabsStateManager();
//
//         let aWindowsStateManager = new BrowserStateManager(1,sampleWindowTabsStateManager);
//
//         expect(aWindowsStateManager.getActiveWindowOpened()).toEqual(sampleWindowTabsStateManager);
//
//         let currentWindowsOpenFromWindowsStateManager = aWindowsStateManager['currentWindowsOpen'];
//         expect(currentWindowsOpenFromWindowsStateManager.size).toEqual(1);
//         expect(currentWindowsOpenFromWindowsStateManager.get(1)).toEqual(sampleWindowTabsStateManager);
//     })
//
//     it('addNewWindowOpened', function(){
//         let aWindowsStateManager = new BrowserStateManager(1,new WindowTabsStateManager());
//
//         let sampleWindowTabsStateManager = new WindowTabsStateManager();
//         aWindowsStateManager.addNewWindowOpened(2,sampleWindowTabsStateManager);
//
//         let currentWindowsOpenFromWindowsStateManager = aWindowsStateManager['currentWindowsOpen'];
//         expect(currentWindowsOpenFromWindowsStateManager.get(1)).toEqual(sampleWindowTabsStateManager);
//     });
//
//     it('changeActiveWindowOpened', function(){
//         let aWindowsStateManager = new BrowserStateManager(1,new WindowTabsStateManager());
//
//         let sampleWindowTabsStateManager = new WindowTabsStateManager();
//         aWindowsStateManager.addNewWindowOpened(2,sampleWindowTabsStateManager);
//
//         aWindowsStateManager.changeActiveWindowOpened(2);
//
//         let actualCurrentActiveWindowOpened = aWindowsStateManager.getActiveWindowOpened();
//
//         expect(actualCurrentActiveWindowOpened).toEqual(sampleWindowTabsStateManager);
//     });
//
//     it('removeWindow', function(){
//         let aWindowsStateManager = new BrowserStateManager(1,new WindowTabsStateManager());
//
//         let expectedWindowTabsStateManager = new WindowTabsStateManager();
//         aWindowsStateManager.addNewWindowOpened(2, expectedWindowTabsStateManager);
//
//         let currentWindowsOpenFromWindowsStateManager = aWindowsStateManager['currentWindowsOpen'];
//         expect(currentWindowsOpenFromWindowsStateManager.has(1)).toEqual(true);
//         aWindowsStateManager.removeWindow(1);
//
//         expect(currentWindowsOpenFromWindowsStateManager.has(1)).toEqual(false);
//         expect(currentWindowsOpenFromWindowsStateManager.get(2)).toEqual(expectedWindowTabsStateManager);
//     });
// });
//
//
//
