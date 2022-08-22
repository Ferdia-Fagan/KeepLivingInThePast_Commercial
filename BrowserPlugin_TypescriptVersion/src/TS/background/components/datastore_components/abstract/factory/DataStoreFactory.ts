import {CreateDBManagerParams} from "../parts/layer_orchastrators/DB_Manager";
import {
    create_DB_WithCache_Manager,
    CreateDBWithCacheManagerParams
} from "../parts/layer_orchastrators/DB_WithCache_Manager";
import {
    CreateDBWithCacheWithReportingManagerParams
} from "../parts/layer_orchastrators/DB_WithCache_WithReporting_Manager";
import {
    buildDBLayer,
    EditableDBLayerConstructionParams,
    KeyIndexKeyAssignement
} from "../parts/layers/layer0_db/construction/Builder";
import {DBConnection_A} from "../parts/layers/layer0_db/DB_Abstract";
import {EditableDB, EditableStoreDB_I} from "../parts/layers/layer0_db/implementations/EditableDB";
import {NonEditableStoreDB_I} from "../parts/layers/layer0_db/implementations/NonEditableDB";
import {
    NonPersistedStoreObjectStub,
    UpdatedStoreObjectStub
} from "../parts/layers/layer0_db/store_object/StoreObject_Dtos";
import {PersistedStoreObject} from "../parts/layers/layer0_db/store_object/StoreObject_Types";
import {DBCache} from "../parts/layers/layer1_cache/DBCache_Implementations";

interface DatastoreConstructor<
    STORE_T extends NonPersistedStoreObjectStub,
    STORE_T_UPDATE_INTERFACE extends UpdatedStoreObjectStub,
    DATA_STORE_I extends NonEditableStoreDB_I<STORE_T>,
    PARAMS extends CreateDBManagerParams<STORE_T, STORE_T_UPDATE_INTERFACE> | CreateDBWithCacheManagerParams<STORE_T, STORE_T_UPDATE_INTERFACE> | CreateDBWithCacheWithReportingManagerParams<STORE_T, STORE_T_UPDATE_INTERFACE, R_STORE_REPORT_T>,

    R_STORE_REPORT_T extends PersistedStoreObject = PersistedStoreObject
> {
    new(params: PARAMS): DATA_STORE_I
}

type CreateDBManager<
    STORE_OBJECT_T extends NonPersistedStoreObjectStub,
    UPDATE_STORE_OBJECT_T extends UpdatedStoreObjectStub
> = ( {}: CreateDBManagerParams<STORE_OBJECT_T, UPDATE_STORE_OBJECT_T> ) => EditableStoreDB_I<STORE_OBJECT_T, UPDATE_STORE_OBJECT_T>


/**
 *
 * @param {EditableDBLayerConstructionParams<STORE_T, DATA_STORE_I>} dbConstructionParams
 * @param {{testData: STORE_T[], prepopulateCache: STORE_T[]}} dataStoreParams
 * @param {DATA_STORE_CONSTRUCTOR} dataStoreWrapperParams
 * @returns {Promise<DATA_STORE_I>}
 */
export function createDataStoreFromParts<
    STORE_T extends NonPersistedStoreObjectStub,
    STORE_T_UPDATE_INTERFACE extends UpdatedStoreObjectStub,
    R_STORE_REPORT_T extends PersistedStoreObject,

    DATA_STORE_PARAMS extends CreateDBManagerParams<STORE_T, STORE_T_UPDATE_INTERFACE>,

    DATA_STORE_I extends NonEditableStoreDB_I<STORE_T>,

    DATA_STORE_CONSTRUCTOR extends DatastoreConstructor<STORE_T, STORE_T_UPDATE_INTERFACE, DATA_STORE_I, DATA_STORE_PARAMS, R_STORE_REPORT_T>
>(
    dbConstructionParams: EditableDBLayerConstructionParams<STORE_T, DATA_STORE_I>,

    dataStoreParams = {
        testData: Array<STORE_T>(),
        prepopulateCache: Array<STORE_T>()
    },
    dataStoreConstructor: DATA_STORE_CONSTRUCTOR

): Promise<
    DATA_STORE_I
> {
    const x = buildDBLayer<
        STORE_T,
        STORE_T_UPDATE_INTERFACE,
        DATA_STORE_I
        // EditableDB<STORE_T, STORE_T_UPDATE_INTERFACE>
    >(dbConstructionParams).then(db => {

        const result = new dataStoreConstructor(
            // @ts-ignore
            {
                db: db,
                ...dataStoreParams
            }
        )
        // const result = create_DB_WithCache_Manager<STORE_T, STORE_T_UPDATE_INTERFACE>({
        //     db: db, // as unknown as A_EditableDBController<StoreObjectInterfaceExample, PersistedStoreObjectInterfaceExample>,
        //     cache: new DBCache<STORE_T>(((object) => object.key)),
        //     prepopulateCache: dataStoreParams.prepopulateCache
        // })
        return result
    })

    return x
}






