import {builder, DBWithCache} from "../../../abstract_object_store_parts/layers/cache/DBWithCache";
import HostnameObject from "./HostnameObject";
import BuildingSetupCheckInterface from "../../../abstract_object_store_parts/factory/BuildingSetupCheckerInteface";
import {GetCreateDBStoreHandler} from "../../../abstract_object_store_parts/factory/BuildDB";
import TagObject from "../../tags/TagObject";

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

let autoAnnotatorHostnameCollectionInterface: AutoAnnotatorHostnameCollectionInterface = null;
export default autoAnnotatorHostnameCollection

class AutoAnnotatorHostnameCollectionBuildingManager implements BuildingSetupCheckInterface{

    static collectionDatabaseAndTableSetup = GetCreateDBStoreHandler(
        "TagsCollection",
        {
            indexName: "tag", indexKeyPath: "tag",
            options: {unique: true}
        }
    )

    static collectionBuilder = builder<
        HostnameObject, HostnameObject, AutoAnnotatorHostnameCollection
    >(
        "WebpageTags", 1, "TagsCollection",
        AutoAnnotatorHostnameCollectionBuildingManager.collectionDatabaseAndTableSetup,
        AutoAnnotatorHostnameCollection
    ).then(autoAnnotatorHostnameInstance =>
        autoAnnotatorHostnameCollectionInterface = autoAnnotatorHostnameInstance
    )

    checkIsSetUp(): boolean {
        return (autoAnnotatorHostnameCollectionBuildingManager != null);
    }

    deleteSelf(): void {
        autoAnnotatorHostnameCollectionBuildingManager = null
    }
}

export var autoAnnotatorHostnameCollectionBuildingManager = new AutoAnnotatorHostnameCollectionBuildingManager()


