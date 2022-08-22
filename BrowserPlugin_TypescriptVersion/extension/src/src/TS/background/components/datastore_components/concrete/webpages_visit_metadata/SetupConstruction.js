"use strict";
// TODO: complete store  WebpagesToBeIndexedCOllection
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexStoresConstructionAndSetupWatcher = void 0;
const AsyncUtils_1 = require("../../../../utils/AsyncUtils");
const AutoAnnotatorStore_1 = require("../auto_annotator/auto_annotator_created/AutoAnnotatorStore");
const AutoAnnotatorHostnameStore_1 = require("../auto_annotator/auto_annotator_hostnames/AutoAnnotatorHostnameStore");
const BookmarksStore_1 = require("../bookmarks/BookmarksStore");
const TagsStore_1 = require("../tags/TagsStore");
/**
 *
 * @param storesToCheckConstruction
 */
function checkStoresConstruction(storesToCheckConstruction) {
    return storesToCheckConstruction.filter(storeInConstruction => {
        const isStoreFinishedConstr = storeInConstruction.checkBuildIsSetUp();
        if (isStoreFinishedConstr) {
            storeInConstruction.deleteBuildingManager();
        }
        return isStoreFinishedConstr;
    });
}
const isStoreBuildingManagersAllFinnishedConstruction = (storeBuildingManagers) => storeBuildingManagers.length === 0;
function indexStoresConstructionAndSetupWatcher() {
    return __awaiter(this, void 0, void 0, function* () {
        let storeBuildingManagers = [
            AutoAnnotatorStore_1.buildingManager_AutoAnnotatorSetupsStore,
            AutoAnnotatorHostnameStore_1.buildingManager_AutoAnnotatorHostnameStore,
            BookmarksStore_1.buildingManager_BookmarksStore,
            TagsStore_1.buildingManager_TagsStore
        ];
        while (true) {
            storeBuildingManagers = checkStoresConstruction(storeBuildingManagers);
            if (isStoreBuildingManagersAllFinnishedConstruction(storeBuildingManagers)) {
                break;
            }
            else {
                yield (0, AsyncUtils_1.sleep)(100);
            }
        }
        procedureAfterAllStoresHaveBeenConstructed();
    });
}
exports.indexStoresConstructionAndSetupWatcher = indexStoresConstructionAndSetupWatcher;
function procedureAfterAllStoresHaveBeenConstructed() {
    // TODO: complete
}
indexStoresConstructionAndSetupWatcher();
//# sourceMappingURL=SetupConstruction.js.map