"use strict";
// settings:
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetSettings = exports.CurrentSettings = exports.UpdateSettings = exports.DEFAULT_BOOKMARK_FOLDER_NAME = exports.DEFAULT_SETTINGS = void 0;
exports.DEFAULT_SETTINGS = {
    toIndexAllPages: true,
    minimumTotalTime: 2,
    minimumTotalVisits: 2,
    conditions: null
};
exports.DEFAULT_BOOKMARK_FOLDER_NAME = "KeepLivingInThePast_OrganisationFolder";
// TODO: updateSettingds function for browserStateManager
function UpdateSettings(currentSettings, updatedSettings) {
    if ('toIndexAllPages' in updatedSettings) {
        currentSettings.toIndexAllPages = updatedSettings.toIndexAllPages;
        if (!updatedSettings.toIndexAllPages) {
            currentSettings.minimumTotalTime = updatedSettings.minimumTotalTime;
            currentSettings.minimumTotalVisits = updatedSettings.minimumTotalVisits;
            currentSettings.conditions = updatedSettings.conditions;
        }
    }
    return currentSettings;
}
exports.UpdateSettings = UpdateSettings;
function SetSettings(currentSettings) {
    exports.CurrentSettings = currentSettings;
}
exports.SetSettings = SetSettings;
//# sourceMappingURL=Settings.js.map