import {
    THE_KEY_NAME
} from "../../../../../../../../../../tests/background/datastores/abstract_object_store_parts/utils/DB/DB_StoreDummy";
import {DBConnection_A} from "../DB_Abstract";
import {EditableStoreDB_I} from "../implementations/EditableDB";
import {NonEditableStoreDB_I} from "../implementations/NonEditableDB";
import {ID_NAME, KEY_NAME} from "../store_object/StoreObject_Constants";
import {NonPersistedStoreObjectStub, UpdatedStoreObjectStub} from "../store_object/StoreObject_Dtos";
import {DBConnectionConstruction_Editable_I} from "./DBConnectionConstruction_I";

export interface EditableDBLayerConstructionParams<
    OBJ_T extends NonPersistedStoreObjectStub,
    DB_INTERFACE extends EditableStoreDB_I<OBJ_T, any>
> {
    DATABASE: string, DB_VERSION: number,
    STORE_NAME: string,
    dbConstructor: DBConnectionConstruction_Editable_I<DB_INTERFACE>,
    startingData?: OBJ_T[],    // TODO: add starting data
    keyIndexAssignement?: Omit<KeyIndexAssignement, 'name'>,
    otherKeysIndexAssignements?: KeyIndexAssignements
}

export async function buildDBLayer<
    OBJ_T extends NonPersistedStoreObjectStub,
    UPDATE_OBJ_T extends UpdatedStoreObjectStub,
    DB_INTERFACE extends NonEditableStoreDB_I<OBJ_T>
>(
    params: EditableDBLayerConstructionParams<OBJ_T, DB_INTERFACE>
) {
    if (!params.keyIndexAssignement) {
        params.keyIndexAssignement = KeyIndexKeyAssignement
    }
    if (!params.otherKeysIndexAssignements) {
        params.otherKeysIndexAssignements = []
    }
    const DB: IDBDatabase = await new Promise<IDBDatabase>((resolve, reject) => {
        const openDBReq = indexedDB.open(params.DATABASE, params.DB_VERSION);

        openDBReq.onsuccess = useThisSuccessHandler(
            resolve,
            openDBReq,
            params.STORE_NAME,
            params.startingData
        );
        openDBReq.onerror = useThisErrorHandler("error creating datastore")
        openDBReq.onupgradeneeded = useThisUpgradeNeededHandler(
            params.STORE_NAME,
            params.keyIndexAssignement,
            params.otherKeysIndexAssignements
        )
    })
    return new params.dbConstructor(params.STORE_NAME, DB);   //<STORE_T, STORE_T_UPDATE_INTERFACE>
}

interface KeyIndexAssignement {
    name: string,
    keyPath: string | string[],
    options?: IDBIndexParameters
}

type KeyIndexAssignements = KeyIndexAssignement[]

export const KeyIndexKeyAssignement = {
    keyPath: THE_KEY_NAME,
    options: {
        unique: true
    }
}


function useThisUpgradeNeededHandler(
    storeName: string,
    keyIndexAssignement: Omit<KeyIndexAssignement, 'name'> = KeyIndexKeyAssignement,
    otherKeysIndexAssignements: KeyIndexAssignements = []
): (
    this: IDBOpenDBRequest & any,
    ev: IDBVersionChangeEvent & any
) => Promise<void>  {
    return async function onUpgradeNeededHandler(
        this: IDBOpenDBRequest & any,
        ev: IDBVersionChangeEvent & any
    ) {

        // create object store with index
        const objectStore = ev.currentTarget.result.createObjectStore(
            storeName,
            {
                keyPath: ID_NAME,
                autoIncrement: true
            }
        );

        // add key
        objectStore.createIndex(
            KEY_NAME,
            keyIndexAssignement.keyPath,
            keyIndexAssignement.options
        )

        // add other keys
        otherKeysIndexAssignements.forEach(keyIndexAssignement => {
            objectStore.createIndex(
                keyIndexAssignement.name,
                keyIndexAssignement.keyPath,
                keyIndexAssignement.options
            )
        })
    }
}

function useThisSuccessHandler(
    resolve: any,
    openDBReq: IDBOpenDBRequest,
    STORE_NAME: string,
    startingData?: any[]
){
    return function onSuccessHandler(evt: any) {
        if(startingData){
            const transaction = openDBReq.result.transaction(
                STORE_NAME,'readwrite'
            )
            const store: any & IDBObjectStore = transaction.objectStore(STORE_NAME)

            const clearStore = store.clear()

            store._rawObjectStore.keyGenerator.num = 0

            clearStore.onsuccess = function(){
                let testDataInsertRequests: IDBRequest<IDBValidKey>[] = []

                startingData.forEach(testDataToInsert => {
                    testDataInsertRequests.push(store.add(testDataToInsert))
                })
                Promise.all(testDataInsertRequests).then(e => {
                    resolve(evt.target.result)
                })
            }

        } else {
            resolve(openDBReq.result)
        }
    }
}

function useThisErrorHandler(error: String){
    return function onErrorHandler(this: IDBRequest<any>, event: Event) {
        console.error(error);
    }
}

