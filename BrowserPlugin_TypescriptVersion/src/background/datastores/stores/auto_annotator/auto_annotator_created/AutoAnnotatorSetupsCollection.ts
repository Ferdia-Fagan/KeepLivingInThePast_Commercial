import BuildingSetupCheckInterface from "../../../abstract_object_store_parts/factory/BuildingSetupCheckerInteface";
import {GetCreateDBStoreHandler} from "../../../abstract_object_store_parts/factory/BuildDB";
import DB from "../../../abstract_object_store_parts/layers/db/DB";
import {builder} from "../../../abstract_object_store_parts/layers/cache/DBWithCache";
import AutoAnnotatorSetupObject, {AutoAnnotatorSetupObjectUpdateInterface} from "./AutoAnnotatorSetupObject";

interface AutoAnnotatorsCreatedCollectionInterface {
    addNewAutoAnnotator(newAutoAnnotator: AutoAnnotatorSetupObject): Promise<number>
    updateAutoAnnotator(updatedAutoAnnotator: AutoAnnotatorSetupObjectUpdateInterface): void
    getAllAutoAnnotators(): Promise<AutoAnnotatorSetupObject[]>
    getAutoAnnotator(id: number): Promise<AutoAnnotatorSetupObject>
    deleteAutoAnnotator(id: number): void

}

class AutoAnnotatorSetupsCollection extends DB<
    AutoAnnotatorSetupObject, AutoAnnotatorSetupObjectUpdateInterface
>
    implements AutoAnnotatorsCreatedCollectionInterface {

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

let autoAnnotatorSetupsCollection: AutoAnnotatorsCreatedCollectionInterface = null;
export default autoAnnotatorSetupsCollection

class AutoAnnotatorSetupsCollectionBuildingManager implements BuildingSetupCheckInterface{

    request: Promise<null>
    constructor() {
        this.request = AutoAnnotatorSetupsCollectionBuildingManager.collectionBuilder()
    }

    static collectionDatabaseAndTableSetup = GetCreateDBStoreHandler(
        "AutoAnnotatorSetupsCollection"
    )

    static collectionBuilder = (): Promise<null> => builder<
        AutoAnnotatorSetupObject, AutoAnnotatorSetupObjectUpdateInterface,
        AutoAnnotatorSetupsCollection
    >(
        "WebpageTags", 1, "TagsCollection",
        AutoAnnotatorSetupsCollectionBuildingManager.collectionDatabaseAndTableSetup,
        AutoAnnotatorSetupsCollection
    ).then(tagsCollectionInstance => {
        autoAnnotatorSetupsCollection = tagsCollectionInstance
        return null
    })

    checkIsSetUp(): boolean {
        return (autoAnnotatorSetupsCollection != null);
    }

    deleteSelf(): void {
        autoAnnotatorsCreatedCollectionBuildingManager = null
    }
}


export var autoAnnotatorsCreatedCollectionBuildingManager = new AutoAnnotatorSetupsCollectionBuildingManager()


