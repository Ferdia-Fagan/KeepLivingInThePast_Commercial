import {StoreController} from "../../../components/stores/utils/Types";
import {CreateDBStoreHandler} from "./BuildDB";

/**
 * Order of use:
 * 1) checkIsSetUp()
 * 2) if false, then this request will be repeated the next cycle
 * 4) followed by deleteBuildingManager()
 */
export default interface BuildingSetupCheckInterface {
    collectionDatabaseAndTableSetup: CreateDBStoreHandler

    constructionProcedure: () => Promise<null>

    checkBuildIsSetUp(): boolean
    deleteBuildingManager(): void
}