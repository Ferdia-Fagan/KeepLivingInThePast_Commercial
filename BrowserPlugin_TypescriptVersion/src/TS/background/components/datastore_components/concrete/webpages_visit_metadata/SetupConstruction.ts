// TODO: complete store  WebpagesToBeIndexedCOllection


import {sleep} from "../../../../utils/AsyncUtils";
import BuildingSetupCheckInterface from "../../abstract/utils/management/StoreConstructionSetupCheckerInteface";
import {
    buildingManager_AutoAnnotatorSetupsStore
} from "../auto_annotator/auto_annotator_created/AutoAnnotatorStore";
import {
    buildingManager_AutoAnnotatorHostnameStore
} from "../auto_annotator/auto_annotator_hostnames/AutoAnnotatorHostnameStore";
import {buildingManager_BookmarksStore} from "../bookmarks/BookmarksStore";
import {buildingManager_TagsStore} from "../tags/TagsStore";

/**
 *
 * @param storesToCheckConstruction
 */
function checkStoresConstruction(storesToCheckConstruction: BuildingSetupCheckInterface[]): BuildingSetupCheckInterface[] {
    return storesToCheckConstruction.filter(storeInConstruction => {
        const isStoreFinishedConstr = storeInConstruction.checkBuildIsSetUp()
        if(isStoreFinishedConstr){
            storeInConstruction.deleteBuildingManager()
        }
        return isStoreFinishedConstr
    })
}

const isStoreBuildingManagersAllFinnishedConstruction = (storeBuildingManagers: BuildingSetupCheckInterface[]) => storeBuildingManagers.length === 0

export async function indexStoresConstructionAndSetupWatcher(): Promise<void> {
    let storeBuildingManagers: BuildingSetupCheckInterface[] = [
        buildingManager_AutoAnnotatorSetupsStore,
        buildingManager_AutoAnnotatorHostnameStore,

        buildingManager_BookmarksStore,

        buildingManager_TagsStore
    ]

    while(true) {
        storeBuildingManagers = checkStoresConstruction(storeBuildingManagers)
        if(isStoreBuildingManagersAllFinnishedConstruction(storeBuildingManagers)){
            break
        } else {
            await sleep(100)
        }
    }

    procedureAfterAllStoresHaveBeenConstructed()
}

function procedureAfterAllStoresHaveBeenConstructed(): void {
    // TODO: complete
}

indexStoresConstructionAndSetupWatcher()


