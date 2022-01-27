"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildingManager_AutoAnnotatorSetupsStore = exports.autoAnnotatorSetupsStore = void 0;
const BuildDB_1 = require("../../../abstract_object_store_parts/factory/BuildDB");
const DB_1 = __importDefault(require("../../../abstract_object_store_parts/layers/db/DB"));
const DBWithCache_1 = require("../../../abstract_object_store_parts/layers/cache/DBWithCache");
class AutoAnnotatorSetupsStore extends DB_1.default {
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
exports.autoAnnotatorSetupsStore = null;
// export function get_AutoAnnotatorSetupsStore(): AutoAnnotatorsCreatedStoreInterface {
//     return autoAnnotatorSetupsStore
// }
class AutoAnnotatorSetupsStoreBuildingManager {
    constructor() {
        this.collectionDatabaseAndTableSetup = BuildDB_1.GetCreateDBStoreHandler("AutoAnnotatorSetupsCollection");
        this.constructionProcedure = () => DBWithCache_1.builder("WebpageTags", 1, "TagsCollection", this.collectionDatabaseAndTableSetup, AutoAnnotatorSetupsStore).then(tagsCollectionInstance => {
            exports.autoAnnotatorSetupsStore = tagsCollectionInstance;
            return null;
        });
        this.request = this.constructionProcedure();
    }
    checkBuildIsSetUp() {
        return (exports.autoAnnotatorSetupsStore != null);
    }
    deleteBuildingManager() {
        exports.buildingManager_AutoAnnotatorSetupsStore = null;
    }
}
exports.buildingManager_AutoAnnotatorSetupsStore = new AutoAnnotatorSetupsStoreBuildingManager();
//# sourceMappingURL=AutoAnnotatorSetupsStore.js.map