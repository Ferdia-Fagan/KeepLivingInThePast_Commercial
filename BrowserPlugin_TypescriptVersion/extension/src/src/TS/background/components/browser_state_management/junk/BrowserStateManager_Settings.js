"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const webextension_polyfill_1 = __importDefault(require("webextension-polyfill"));
const Settings_1 = require("../../../settings/Settings");
var flags = {
    SIDEBAR_WANTS_2B_NOTIFIED_OF_WEBPAGE_CHANGE: false
};
// TODO: Complete and test
/**
 *  model of whole browser.
 */
class BrowserStateManager_Settings {
    constructor() {
        let theSettings = webextension_polyfill_1.default.storage.local.get("Settings");
        theSettings.then((results) => {
            console.log();
            if (Object.keys(results).length === 0) {
                // Set up for the first time
                let createBookMarksRootFolder = webextension_polyfill_1.default.bookmarks.create({ title: Settings_1.DEFAULT_BOOKMARK_FOLDER_NAME });
                createBookMarksRootFolder.then((results) => {
                    this.settings = Settings_1.DEFAULT_SETTINGS;
                    this.settings.bookmarksFolderId = results.id;
                    // browser.storage.local.set({Settings:{toIndexAllPages: true, minimumTotalTime: 2, minimumTotalVisits: 2, conditions: null, bookMarksFolderId: results.id}})
                    webextension_polyfill_1.default.storage.local.set(this.settings);
                    // TODO: bookmarksCollectionSetRootFolder(results.id);
                });
            }
            else {
                // Load up previous settings
                this.settings = results.Settings;
            }
        });
        console.log("");
    }
    updateIndexingSettings(updatedSettings) {
        this.settings = (0, Settings_1.UpdateSettings)(this.settings, updatedSettings);
    }
    // ------------------------------------------------------------------
    recordWebpageVisit(webpageVisitDetails) {
        if (webpageVisitDetails.frameId == 0) {
        }
    }
}
exports.default = BrowserStateManager_Settings;
//# sourceMappingURL=BrowserStateManager_Settings.js.map