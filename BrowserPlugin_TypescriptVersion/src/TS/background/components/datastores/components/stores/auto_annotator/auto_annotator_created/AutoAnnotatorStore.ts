import BuildingSetupCheckInterface from "../../../../parts/abstract_object_store_parts/factory/BuildingSetupCheckerInteface";
import {GetCreateDBStoreHandler} from "../../../../parts/abstract_object_store_parts/factory/BuildDB";
import DB from "../../../../parts/abstract_object_store_parts/layers/layer0_db/DB";
import {builder} from "../../../../parts/abstract_object_store_parts/layers/layer1_cache/DBWithCache";
import {AutoAnnotatorObject, AutoAnnotatorSetupObjectUpdateInterface} from "./AutoAnnotatorObject";

interface AutoAnnotatorsCreatedStoreInterface {
    addNewAutoAnnotator(newAutoAnnotator: AutoAnnotatorObject): Promise<number>
    updateAutoAnnotator(updatedAutoAnnotator: AutoAnnotatorSetupObjectUpdateInterface): void
    getAllAutoAnnotators(): Promise<AutoAnnotatorObject[]>
    getAutoAnnotator(id: number): Promise<AutoAnnotatorObject>
    deleteAutoAnnotator(id: number): void
}

class AutoAnnotatorStore extends DB<
    AutoAnnotatorObject, AutoAnnotatorSetupObjectUpdateInterface
>
    implements AutoAnnotatorsCreatedStoreInterface {

    addNewAutoAnnotator(newAutoAnnotator: AutoAnnotatorObject): Promise<number> {
        return super.addObject(newAutoAnnotator);
    }

    getAllAutoAnnotators(): Promise<AutoAnnotatorObject[]> {
        return super.getAllObjects();
    }

    getAutoAnnotator(id: number): Promise<AutoAnnotatorObject> {
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

class AutoAnnotatorSetupsStoreBuildingManager implements BuildingSetupCheckInterface{

    request: Promise<null>
    constructor() {
        this.request = this.constructionProcedure()
    }

    collectionDatabaseAndTableSetup = GetCreateDBStoreHandler(
        "AutoAnnotatorSetupsCollection"
    )

    constructionProcedure = (): Promise<null> => builder<
        AutoAnnotatorObject, AutoAnnotatorSetupObjectUpdateInterface,
        AutoAnnotatorStore
    >(
        "WebpageTags", 1, "TagsCollection",
        this.collectionDatabaseAndTableSetup,
        AutoAnnotatorStore
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


