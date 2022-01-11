import {builder, DBWithCache} from "../../../abstract_object_store_parts/layers/cache/DBWithCache";
import HostnameObject from "./HostnameObject";
import BuildingSetupCheckInterface from "../../../abstract_object_store_parts/factory/BuildingSetupCheckerInteface";
import {GetCreateDBStoreHandler} from "../../../abstract_object_store_parts/factory/BuildDB";
import {KEY_NAME} from "../../utils/Utils";

interface AutoAnnotatorHostnameCollectionInterface {

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

class AutoAnnotatorHostnameCollection extends DBWithCache<HostnameObject, HostnameObject>
    implements AutoAnnotatorHostnameCollectionInterface {

    getStoreObjectKey(object: HostnameObject): IDBValidKey {
        return object.hostname;
    }

    addHostname(hostname: string): Promise<number> {
        return super.addObject({
            hostname: hostname
        });
    }

    checkIfHostnameHasBeenLogged(hostname: string): Promise<number> {
        return super.getObjectByKey(hostname).then((hostnameObject): number => {
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

let autoAnnotatorHostnameCollection: AutoAnnotatorHostnameCollectionInterface = null;
export default autoAnnotatorHostnameCollection

class AutoAnnotatorHostnameCollectionBuildingManager implements BuildingSetupCheckInterface{

    request: Promise<null>
    constructor() {
        this.request = AutoAnnotatorHostnameCollectionBuildingManager.collectionBuilder()
    }

    static collectionDatabaseAndTableSetup = GetCreateDBStoreHandler(
        "AutoAnnotatorHostnameCollection",
        {
            indexName: KEY_NAME, indexKeyPath: "hostname",
            options: {unique: true}
        }
    )

    static collectionBuilder = (): Promise<null> => builder<
        HostnameObject, HostnameObject, AutoAnnotatorHostnameCollection
    >(
        "WebpageTags", 1, "TagsCollection",
        AutoAnnotatorHostnameCollectionBuildingManager.collectionDatabaseAndTableSetup,
        AutoAnnotatorHostnameCollection
    ).then(autoAnnotatorHostnameCollectionInstance => {
        autoAnnotatorHostnameCollection = autoAnnotatorHostnameCollectionInstance
        return null
    })

    checkIsSetUp(): boolean {
        return (autoAnnotatorHostnameCollectionBuildingManager != null);
    }

    deleteSelf(): void {
        autoAnnotatorHostnameCollectionBuildingManager = null
    }
}

export var autoAnnotatorHostnameCollectionBuildingManager = new AutoAnnotatorHostnameCollectionBuildingManager()


