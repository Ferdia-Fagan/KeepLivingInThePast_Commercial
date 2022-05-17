"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildingManager_AutoAnnotatorSetupsStore = exports.autoAnnotatorSetupsStore = void 0;
const BuildDBConstructionActions_1 = require("../../../components/parts/abstract_object_store_parts/factory/BuildDBConstructionActions");
const DB_1 = __importDefault(require("../../../components/parts/abstract_object_store_parts/layers/layer0_db/DB"));
const DBCache_1 = require("../../../components/parts/abstract_object_store_parts/layers/layer1_cache/DBCache");
class AutoAnnotatorStore extends DB_1.default {
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
class AutoAnnotatorSetupsStoreBuildingManager {
    constructor() {
        this.collectionDatabaseAndTableSetup = (0, BuildDBConstructionActions_1.GetCreateDBStoreHandler)("AutoAnnotatorSetupsCollection");
        this.constructionProcedure = () => (0, DBCache_1.builder)("WebpageTags", 1, "TagsCollection", this.collectionDatabaseAndTableSetup, AutoAnnotatorStore).then(tagsCollectionInstance => {
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
//# sourceMappingURL=AutoAnnotatorStore.js.map