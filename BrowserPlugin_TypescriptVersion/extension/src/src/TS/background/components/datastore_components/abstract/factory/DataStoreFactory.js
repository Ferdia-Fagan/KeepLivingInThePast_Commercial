"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDataStoreFromParts = void 0;
const Builder_1 = require("../parts/layers/layer0_db/construction/Builder");
/**
 *
 * @param {EditableDBLayerConstructionParams<STORE_T, DATA_STORE_I>} dbConstructionParams
 * @param {{testData: STORE_T[], prepopulateCache: STORE_T[]}} dataStoreParams
 * @param {DATA_STORE_CONSTRUCTOR} dataStoreWrapperParams
 * @returns {Promise<DATA_STORE_I>}
 */
function createDataStoreFromParts(dbConstructionParams, dataStoreParams = {
    testData: Array(),
    prepopulateCache: Array()
}, dataStoreConstructor) {
    const x = (0, Builder_1.buildDBLayer)(dbConstructionParams).then(db => {
        const result = new dataStoreConstructor(Object.assign({ db: db }, dataStoreParams));
        // const result = create_DB_WithCache_Manager<STORE_T, STORE_T_UPDATE_INTERFACE>({
        //     db: db, // as unknown as A_EditableDBController<StoreObjectInterfaceExample, PersistedStoreObjectInterfaceExample>,
        //     cache: new DBCache<STORE_T>(((object) => object.key)),
        //     prepopulateCache: dataStoreParams.prepopulateCache
        // })
        return result;
    });
    return x;
}
exports.createDataStoreFromParts = createDataStoreFromParts;
//# sourceMappingURL=DataStoreFactory.js.map