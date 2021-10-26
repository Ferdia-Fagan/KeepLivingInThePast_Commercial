// settings:

interface IndexingConditions{

}

export const DEFAULT_SETTINGS: any = {
    toIndexAllPages: true, 
    minimumTotalTime: 2,
    minimumTotalVisits: 2, 
    conditions: null
}

export const DEFAULT_BOOKMARK_FOLDER_NAME = "KeepLivingInThePast_OrganisationFolder";

export interface Settings {
    toIndexAllPages: boolean;
    minimumTotalTime?: number;
    minimumTotalVisits?: number;
    conditions?: IndexingConditions;
    bookmarksFolderId: string;
}

export interface UpdateSettingsForm {
    toIndexAllPages?: boolean;
    minimumTotalTime?: number;
    minimumTotalVisits?: number;
    conditions?: IndexingConditions;
    bookmarksFolderId?: string;
}

// TODO: updateSettingds function for browserStateManager
export function UpdateSettings(currentSettings: Settings, updatedSettings: UpdateSettingsForm): Settings{
    if('toIndexAllPages' in updatedSettings){
        currentSettings.toIndexAllPages = updatedSettings.toIndexAllPages;
        if(!updatedSettings.toIndexAllPages){
            currentSettings.minimumTotalTime = updatedSettings.minimumTotalTime;
            currentSettings.minimumTotalVisits = updatedSettings.minimumTotalVisits;
            currentSettings.conditions = updatedSettings.conditions;
        }
    }

    return currentSettings;
}

// class SystemSettings {
//     readonly currentSettings: Settings

//     constructor(currentSettings: Settings){
//         this.currentSettings = currentSettings;
//     }
// }

export var CurrentSettings: Settings ;

export function SetSettings(currentSettings: Settings){
    CurrentSettings = currentSettings;
}