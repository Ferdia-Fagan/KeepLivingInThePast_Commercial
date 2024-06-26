import {
    KEY_NAME
} from "../../../abstract/parts/layers/layer0_db/store_object/StoreObject_Constants";
import {builder} from "../../../abstract/parts/layers/layer1_cache/DBCache_Types";
import HostnameObject from "./HostnameObject";
import BuildingSetupCheckInterface from "../../../abstract/utils/management/StoreConstructionSetupCheckerInteface";
import {GetCreateDBStoreHandler} from "../../../abstract/parts/abstract_object_store_parts/factory/junk/BuildDBConstructionActions";

interface AutoAnnotatorHostnameStoreInterface {

    addHostname(hostname: string): Promise<number>

    /**
     * used to get hostname id, so if get back you know that hostname is being used.
     * So can then attempt to auto tag the webpage.
     */
    checkIfHostnameHasBeenLogged(hostname: string): Promise<number>

    getAllHostnames(): Promise<HostnameObject[]>

    getHostnamesFromIds(hostnameIds: number[]): Promise<HostnameObject[]>

    // getHostnames(hostnames) TODO: not very interesting
}

class AutoAnnotatorHostnameStore extends DBCache<HostnameObject, HostnameObject>
    implements AutoAnnotatorHostnameStoreInterface {

    getStoreObjectKey(object: HostnameObject): IDBValidKey {
        return object.hostname;
    }

    addHostname(hostname: string): Promise<number> {
        return super.cacheObjectWithId({
            hostname: hostname
        });
    }

    checkIfHostnameHasBeenLogged(hostname: string): Promise<number> {
        return super.getObjectIdByKey(hostname).then((hostnameObject): number => {
            return hostnameObject.id
        });
    }

    getAllHostnames(): Promise<HostnameObject[]> {
        return super.getAllObjects()
    }

    getHostnamesFromIds(hostnameIds: number[]): Promise<HostnameObject[]> {
        return super.getObjectsWithIds(hostnameIds)
    }

}

export let autoAnnotatorHostnameStore: AutoAnnotatorHostnameStoreInterface = null;

class AutoAnnotatorHostnameStoreBuildingManager implements BuildingSetupCheckInterface{

    request: Promise<null>
    constructor() {
        this.request = this.constructionProcedure()
    }

    collectionDatabaseAndTableSetup = GetCreateDBStoreHandler(
        "AutoAnnotatorHostnameCollection",
        {
            indexName: KEY_NAME, indexKeyPath: "hostname",
            options: {unique: true}
        }
    )

    constructionProcedure = (): Promise<null> => builder<
        HostnameObject, HostnameObject, AutoAnnotatorHostnameStore
    >(
        "WebpageTags", 1, "TagsCollection",
        this.collectionDatabaseAndTableSetup,
        AutoAnnotatorHostnameStore
    ).then(autoAnnotatorHostnameCollectionInstance => {
        autoAnnotatorHostnameStore = autoAnnotatorHostnameCollectionInstance
        return null
    })

    checkBuildIsSetUp(): boolean {
        return (autoAnnotatorHostnameStore != null);
    }

    deleteBuildingManager(): void {
        buildingManager_AutoAnnotatorHostnameStore = null
    }
}

export var buildingManager_AutoAnnotatorHostnameStore = new AutoAnnotatorHostnameStoreBuildingManager()


