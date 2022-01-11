import BuildingSetupCheckInterface from "../../../abstract_object_store_parts/factory/BuildingSetupCheckerInteface";
import {GetCreateDBStoreHandler} from "../../../abstract_object_store_parts/factory/BuildDB";
import DB from "../../../abstract_object_store_parts/layers/db/DB";
import {builder} from "../../../abstract_object_store_parts/layers/cache/DBWithCache";
import AutoAnnotatorSetupObject, {AutoAnnotatorSetupObjectUpdateInterface} from "./AutoAnnotatorSetupObject";

interface AutoAnnotatorsCreatedStoreInterface {
    addNewAutoAnnotator(newAutoAnnotator: AutoAnnotatorSetupObject): Promise<number>
    updateAutoAnnotator(updatedAutoAnnotator: AutoAnnotatorSetupObjectUpdateInterface): void
    getAllAutoAnnotators(): Promise<AutoAnnotatorSetupObject[]>
    getAutoAnnotator(id: number): Promise<AutoAnnotatorSetupObject>
    deleteAutoAnnotator(id: number): void
}

class AutoAnnotatorSetupsStore extends DB<
    AutoAnnotatorSetupObject, AutoAnnotatorSetupObjectUpdateInterface
>
    implements AutoAnnotatorsCreatedStoreInterface {

    addNewAutoAnnotator(newAutoAnnotator: AutoAnnotatorSetupObject): Promise<number> {
        return super.addObject(newAutoAnnotator);
    }

    getAllAutoAnnotators(): Promise<AutoAnnotatorSetupObject[]> {
        return super.getAllObjects();
    }

    getAutoAnnotator(id: number): Promise<AutoAnnotatorSetupObject> {
        return super.getObjectById(id);
    }

    updateAutoAnnotator(updatedAutoAnnotator: AutoAnnotatorSetupObjectUpdateInterface): void {
        super.updateObject(updatedAutoAnnotator)
    }

    deleteAutoAnnotator(id: number): void {
        super.deleteObjectById(id)
    }

}

export let autoAnnotatorSetupsStore: AutoAnnotatorsCreatedStoreInterface = null;

// export function get_AutoAnnotatorSetupsStore(): AutoAnnotatorsCreatedStoreInterface {
//     return autoAnnotatorSetupsStore
// }

class AutoAnnotatorSetupsStoreBuildingManager implements BuildingSetupCheckInterface{

    request: Promise<null>
    constructor() {
        this.request = this.constructionProcedure()
    }

    collectionDatabaseAndTableSetup = GetCreateDBStoreHandler(
        "AutoAnnotatorSetupsCollection"
    )

    constructionProcedure = (): Promise<null> => builder<
        AutoAnnotatorSetupObject, AutoAnnotatorSetupObjectUpdateInterface,
        AutoAnnotatorSetupsStore
    >(
        "WebpageTags", 1, "TagsCollection",
        this.collectionDatabaseAndTableSetup,
        AutoAnnotatorSetupsStore
    ).then(tagsCollectionInstance => {
        autoAnnotatorSetupsStore = tagsCollectionInstance
        return null
    })

    checkBuildIsSetUp(): boolean {
        return (autoAnnotatorSetupsStore != null);
    }

    deleteBuildingManager(): void {
        buildingManager_AutoAnnotatorSetupsStore = null
    }
}


export var buildingManager_AutoAnnotatorSetupsStore = new AutoAnnotatorSetupsStoreBuildingManager()


