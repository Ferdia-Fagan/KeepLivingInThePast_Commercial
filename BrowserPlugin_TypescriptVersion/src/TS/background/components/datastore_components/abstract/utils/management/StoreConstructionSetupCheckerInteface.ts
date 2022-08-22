import {CreateDBStoreHandler} from "../../parts/abstract_object_store_parts/factory/junk/BuildDBConstructionActions";

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