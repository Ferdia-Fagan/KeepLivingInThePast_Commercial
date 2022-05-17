import browser, {Bookmarks} from "webextension-polyfill";

import {DEFAULT_SETTINGS, UpdateSettingsForm, Settings, UpdateSettings, DEFAULT_BOOKMARK_FOLDER_NAME} from "../../../settings/Settings"
import WebpageVisitDetails from "../layers/layer2_webpage_state_management/dtos/WebpageVisitDetails";
import {Runtime} from "inspector";
import {BookmarkType} from "../../datastores/concrete_store_implementations/bookmarks/values/BookmarkType";
import BookmarkTreeNode = Bookmarks.BookmarkTreeNode;

interface WebpageDataStateManagerInterface {
    updateWebpageBookmark(webpageLoggingId: number, parentBookmarkId: number): void
}

var flags = {
    SIDEBAR_WANTS_2B_NOTIFIED_OF_WEBPAGE_CHANGE: false
}
// TODO: Complete and test
/**
 *  model of whole browser.
 */
export default class BrowserStateManager_Settings {

    private settings: Settings;

    constructor(){  // TODO: CONSTRUCTOR OF BROWSER STATE MANAGER
        let theSettings = browser.storage.local.get("Settings");
        
        theSettings.then((results: any) => {
            console.log()
            if(Object.keys(results).length === 0){
                // Set up for the first time
                let createBookMarksRootFolder = browser.bookmarks.create({title: DEFAULT_BOOKMARK_FOLDER_NAME})
                createBookMarksRootFolder.then((results: any) => {
                    this.settings = DEFAULT_SETTINGS
                    this.settings.bookmarksFolderId = results.id;
    
                    // browser.storage.local.set({Settings:{toIndexAllPages: true, minimumTotalTime: 2, minimumTotalVisits: 2, conditions: null, bookMarksFolderId: results.id}})
                    browser.storage.local.set(this.settings)
                    // TODO: bookmarksCollectionSetRootFolder(results.id);
                });
            }else{
                // Load up previous settings
                this.settings = results.Settings;
            }
        });
        console.log("")
    }

    updateIndexingSettings(updatedSettings: UpdateSettingsForm) {   // TODO: move this
        this.settings = UpdateSettings(this.settings, updatedSettings);
    }

    // ------------------------------------------------------------------

    recordWebpageVisit(webpageVisitDetails: WebpageVisitDetails){
        if(webpageVisitDetails.frameId == 0){

        }
    }

}



