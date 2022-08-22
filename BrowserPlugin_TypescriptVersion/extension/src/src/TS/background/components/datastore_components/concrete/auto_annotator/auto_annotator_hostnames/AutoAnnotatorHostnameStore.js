"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildingManager_AutoAnnotatorHostnameStore = exports.autoAnnotatorHostnameStore = void 0;
const StoreObject_Constants_1 = require("../../../abstract/parts/layers/layer0_db/store_object/StoreObject_Constants");
const DBCache_Types_1 = require("../../../abstract/parts/layers/layer1_cache/DBCache_Types");
const BuildDBConstructionActions_1 = require("../../../abstract/parts/abstract_object_store_parts/factory/junk/BuildDBConstructionActions");
class AutoAnnotatorHostnameStore extends DBCache {
    getStoreObjectKey(object) {
        return object.hostname;
    }
    addHostname(hostname) {
        return super.cacheObjectWithId({
            hostname: hostname
        });
    }
    checkIfHostnameHasBeenLogged(hostname) {
        return super.getObjectIdByKey(hostname).then((hostnameObject) => {
            return hostnameObject.id;
        });
    }
    getAllHostnames() {
        return super.getAllObjects();
    }
    getHostnamesFromIds(hostnameIds) {
        return super.getObjectsWithIds(hostnameIds);
    }
}
exports.autoAnnotatorHostnameStore = null;
class AutoAnnotatorHostnameStoreBuildingManager {
    constructor() {
        this.collectionDatabaseAndTableSetup = (0, BuildDBConstructionActions_1.GetCreateDBStoreHandler)("AutoAnnotatorHostnameCollection", {
            indexName: StoreObject_Constants_1.KEY_NAME, indexKeyPath: "hostname",
            options: { unique: true }
        });
        this.constructionProcedure = () => (0, DBCache_Types_1.builder)("WebpageTags", 1, "TagsCollection", this.collectionDatabaseAndTableSetup, AutoAnnotatorHostnameStore).then(autoAnnotatorHostnameCollectionInstance => {
            exports.autoAnnotatorHostnameStore = autoAnnotatorHostnameCollectionInstance;
            return null;
        });
        this.request = this.constructionProcedure();
    }
    checkBuildIsSetUp() {
        return (exports.autoAnnotatorHostnameStore != null);
    }
    deleteBuildingManager() {
        exports.buildingManager_AutoAnnotatorHostnameStore = null;
    }
}
exports.buildingManager_AutoAnnotatorHostnameStore = new AutoAnnotatorHostnameStoreBuildingManager();
//# sourceMappingURL=AutoAnnotatorHostnameStore.js.map