"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.autoAnnotatorHostnameCollectionBuildingManager = void 0;
const DBWithCache_1 = require("../../../abstract_object_store_parts/layers/cache/DBWithCache");
const BuildDB_1 = require("../../../abstract_object_store_parts/factory/BuildDB");
const Utils_1 = require("../../utils/Utils");
class AutoAnnotatorHostnameCollection extends DBWithCache_1.DBWithCache {
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
let autoAnnotatorHostnameCollection = null;
exports.default = autoAnnotatorHostnameCollection;
class AutoAnnotatorHostnameCollectionBuildingManager {
    constructor() {
        this.request = AutoAnnotatorHostnameCollectionBuildingManager.collectionBuilder();
    }
    checkIsSetUp() {
        return (exports.autoAnnotatorHostnameCollectionBuildingManager != null);
    }
    deleteSelf() {
        exports.autoAnnotatorHostnameCollectionBuildingManager = null;
    }
}
AutoAnnotatorHostnameCollectionBuildingManager.collectionDatabaseAndTableSetup = BuildDB_1.GetCreateDBStoreHandler("AutoAnnotatorHostnameCollection", {
    indexName: Utils_1.KEY_NAME, indexKeyPath: "hostname",
    options: { unique: true }
});
AutoAnnotatorHostnameCollectionBuildingManager.collectionBuilder = () => DBWithCache_1.builder("WebpageTags", 1, "TagsCollection", AutoAnnotatorHostnameCollectionBuildingManager.collectionDatabaseAndTableSetup, AutoAnnotatorHostnameCollection).then(autoAnnotatorHostnameCollectionInstance => {
    autoAnnotatorHostnameCollection = autoAnnotatorHostnameCollectionInstance;
    return null;
});
exports.autoAnnotatorHostnameCollectionBuildingManager = new AutoAnnotatorHostnameCollectionBuildingManager();
//# sourceMappingURL=AutoAnnotatorHostnameCollection.js.map