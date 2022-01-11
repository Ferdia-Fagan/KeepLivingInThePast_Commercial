"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.autoAnnotatorsCreatedCollectionBuildingManager = void 0;
const BuildDB_1 = require("../../../abstract_object_store_parts/factory/BuildDB");
const DB_1 = __importDefault(require("../../../abstract_object_store_parts/layers/db/DB"));
const DBWithCache_1 = require("../../../abstract_object_store_parts/layers/cache/DBWithCache");
class AutoAnnotatorSetupsCollection extends DB_1.default {
    addNewAutoAnnotator(newAutoAnnotator) {
        return super.addObject(newAutoAnnotator);
    }
    getAllAutoAnnotators() {
        return super.getAllObjects();
    }
    getAutoAnnotator(id) {
        return super.getObjectById(id);
    }
    updateAutoAnnotator(updatedAutoAnnotator) {
        super.updateObject(updatedAutoAnnotator);
    }
    deleteAutoAnnotator(id) {
        super.deleteObjectById(id);
    }
}
let autoAnnotatorSetupsCollection = null;
exports.default = autoAnnotatorSetupsCollection;
class AutoAnnotatorSetupsCollectionBuildingManager {
    constructor() {
        this.request = AutoAnnotatorSetupsCollectionBuildingManager.collectionBuilder();
    }
    checkIsSetUp() {
        return (autoAnnotatorSetupsCollection != null);
    }
    deleteSelf() {
        exports.autoAnnotatorsCreatedCollectionBuildingManager = null;
    }
}
AutoAnnotatorSetupsCollectionBuildingManager.collectionDatabaseAndTableSetup = BuildDB_1.GetCreateDBStoreHandler("AutoAnnotatorSetupsCollection");
AutoAnnotatorSetupsCollectionBuildingManager.collectionBuilder = () => DBWithCache_1.builder("WebpageTags", 1, "TagsCollection", AutoAnnotatorSetupsCollectionBuildingManager.collectionDatabaseAndTableSetup, AutoAnnotatorSetupsCollection).then(tagsCollectionInstance => {
    autoAnnotatorSetupsCollection = tagsCollectionInstance;
    return null;
});
exports.autoAnnotatorsCreatedCollectionBuildingManager = new AutoAnnotatorSetupsCollectionBuildingManager();
//# sourceMappingURL=AutoAnnotatorSetupsCollection.js.map