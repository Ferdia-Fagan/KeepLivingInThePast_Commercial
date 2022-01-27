"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildingManager_AutoAnnotatorHostnameStore = exports.autoAnnotatorHostnameStore = void 0;
const DBWithCache_1 = require("../../../abstract_object_store_parts/layers/cache/DBWithCache");
const BuildDB_1 = require("../../../abstract_object_store_parts/factory/BuildDB");
const Utils_1 = require("../../utils/Utils");
class AutoAnnotatorHostnameStore extends DBWithCache_1.DBWithCache {
    getStoreObjectKey(object) {
        return object.hostname;
    }
    addHostname(hostname) {
        return super.addObject({
            hostname: hostname
        });
    }
    checkIfHostnameHasBeenLogged(hostname) {
        return super.getObjectByKey(hostname).then((hostnameObject) => {
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
        this.collectionDatabaseAndTableSetup = BuildDB_1.GetCreateDBStoreHandler("AutoAnnotatorHostnameCollection", {
            indexName: Utils_1.KEY_NAME, indexKeyPath: "hostname",
            options: { unique: true }
        });
        this.constructionProcedure = () => DBWithCache_1.builder("WebpageTags", 1, "TagsCollection", this.collectionDatabaseAndTableSetup, AutoAnnotatorHostnameStore).then(autoAnnotatorHostnameCollectionInstance => {
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