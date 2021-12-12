import BuildingSetupCheckInterface from "../../../abstract_object_store_parts/factory/BuildingSetupCheckerInteface";
import {GetCreateDBStoreHandler} from "../../../abstract_object_store_parts/factory/BuildDB";
import DB from "../../../abstract_object_store_parts/layers/db/DB";
import {builder} from "../../../abstract_object_store_parts/layers/cache/DBWithCache";
import AutoAnnotatorSetupsObject, {AutoAnnotatorSetupsObjectUpdateInterface} from "./AutoAnnotatorSetupsObject";

interface AutoAnnotatorsCreatedCollectionInterface {
    addNewAutoAnnotator(newAutoAnnotator: AutoAnnotatorSetupsObject): Promise<number>
    updateAutoAnnotator(updatedAutoAnnotator: AutoAnnotatorSetupsObjectUpdateInterface): void
    getAllAutoAnnotators(): Promise<AutoAnnotatorSetupsObject[]>
    getAutoAnnotator(id: number): Promise<AutoAnnotatorSetupsObject>
    deleteAutoAnnotator(id: number): void

}

class AutoAnnotatorSetupsCollection extends DB<
    AutoAnnotatorSetupsObject, AutoAnnotatorSetupsObjectUpdateInterface
>
    implements AutoAnnotatorsCreatedCollectionInterface {

    addNewAutoAnnotator(newAutoAnnotator: AutoAnnotatorSetupsObject): Promise<number> {
        return super.addObject(newAutoAnnotator);
    }

    getAllAutoAnnotators(): Promise<AutoAnnotatorSetupsObject[]> {
        return super.getAllObjects();
    }

    getAutoAnnotator(id: number): Promise<AutoAnnotatorSetupsObject> {
        return super.getObjectById(id);
    }

    updateAutoAnnotator(updatedAutoAnnotator: AutoAnnotatorSetupsObjectUpdateInterface): void {
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
        AutoAnnotatorSetupsObject, AutoAnnotatorSetupsObjectUpdateInterface,
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


