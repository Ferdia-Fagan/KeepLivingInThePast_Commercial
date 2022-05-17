"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildingManager_AutoAnnotatorHostnameStore = exports.autoAnnotatorHostnameStore = void 0;
const Types_1 = require("../../../components/parts/abstract_object_store_parts/layers/layer0_db/store_object/Types");
const DBCache_1 = require("../../../components/parts/abstract_object_store_parts/layers/layer1_cache/DBCache");
const BuildDBConstructionActions_1 = require("../../../components/parts/abstract_object_store_parts/factory/BuildDBConstructionActions");
class AutoAnnotatorHostnameStore extends DBCache_1.DBCache {
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
            indexName: Types_1.KEY_NAME, indexKeyPath: "hostname",
            options: { unique: true }
        });
        this.constructionProcedure = () => (0, DBCache_1.builder)("WebpageTags", 1, "TagsCollection", this.collectionDatabaseAndTableSetup, AutoAnnotatorHostnameStore).then(autoAnnotatorHostnameCollectionInstance => {
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