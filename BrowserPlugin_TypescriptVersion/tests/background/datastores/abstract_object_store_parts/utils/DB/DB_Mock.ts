import {
    EditableStoreDBInterface
} from "../../../../../../src/TS/background/components/datastores/components/parts/abstract_object_store_parts/layers/layer0_db/DB";
import {
    StoreObjectStub,
    UpdatedStoreObjectStub
} from "../../../../../../src/TS/background/components/datastores/components/parts/abstract_object_store_parts/layers/layer0_db/store_object/Types";
import {PersistedStoreObjectInterfaceExample, StoreObjectInterfaceExample} from "./DB_StoreDummy";

export function createDBMock<
    STORE_T extends StoreObjectStub = StoreObjectInterfaceExample,
    STORE_T_UPDATE_INTERFACE extends UpdatedStoreObjectStub = PersistedStoreObjectInterfaceExample
>(
    {
        addObj = jest.fn(),
        addObjs = jest.fn(),
        getObjByIndexColumn = jest.fn(),
        getObjById = jest.fn(),
        getAllObjs = jest.fn(),
        deleteObjById = jest.fn(),
        updateObject = jest.fn()
    }: EditableStoreDBInterface<STORE_T, STORE_T_UPDATE_INTERFACE>
): EditableStoreDBInterface<STORE_T, STORE_T_UPDATE_INTERFACE>{
    return {
        addObj: addObject, addObjs: addObjects,
        getObjByIndexColumn: getObjectByIndexColumn, getObjById: getObjectById, getAllObjs: getAllObjects,
        deleteObjById: deleteObjectById,
        updateObject
    }
}


