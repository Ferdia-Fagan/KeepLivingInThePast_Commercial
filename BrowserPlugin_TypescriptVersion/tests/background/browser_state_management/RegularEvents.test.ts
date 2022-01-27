import BrowserStateManager_Settings from "../../../src/TS/background/components/browser_state_management/junk/BrowserStateManager_Settings";

import "mockzilla-webextension";
import { DEFAULT_BOOKMARK_FOLDER_NAME, DEFAULT_SETTINGS } from "../../../src/TS/background/settings/Settings";



// // import BrowserStateManager_Settings from "../../../src/background/browser_state_management/BrowserStateManager_Settings";

// describe('BrowserStateManager_Settings constructor should change settings')

describe('constructor', function () {

    it('settings exist - expects saved settings', async () => {
        var sampleSettings: any = {
            "Settings": {
                "toIndexAllPages": "blah",
                "minimumTotalTime": "blah",
                "minimumTotalVisits": "blah",
                "conditions": "blah",
                "bookmarksFolderId": "blah"
            }
        }
        mockBrowser.storage.local.get.expect("Settings").andResolve(sampleSettings)

        let inst = new BrowserStateManager_Settings()

        await new Promise((r) => setTimeout(r, 1000));

        console.log("inst.settings: " + JSON.stringify(inst['settings']))
        expect(JSON.stringify(inst['settings'])).toMatch(JSON.stringify(sampleSettings['Settings']))
    });

    it('settings do not exist - expects default settings', async () => {
        mockBrowser.storage.local.get.expect("Settings").andResolve({});

        let defaultSettings = DEFAULT_SETTINGS
        defaultSettings.bookMarksFolderId = 1;

        mockBrowser.bookmarks.create.expect({title: DEFAULT_BOOKMARK_FOLDER_NAME}).andResolve({id: "1", title: DEFAULT_BOOKMARK_FOLDER_NAME});

        mockBrowser.storage.local.set.expect(defaultSettings);

        let inst = new BrowserStateManager_Settings();

        await new Promise((r) => setTimeout(r, 1000));

        console.log("inst.settings: " + JSON.stringify(inst['settings']));
        expect(JSON.stringify(inst['settings'])).toMatch(JSON.stringify(defaultSettings))
    });
});


