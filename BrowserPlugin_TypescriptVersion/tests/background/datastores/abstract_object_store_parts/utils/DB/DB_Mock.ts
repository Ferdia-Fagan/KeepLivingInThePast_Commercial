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
        addObject = jest.fn(),
        addObjects = jest.fn(),
        getObjectByIndexColumn = jest.fn(),
        getObjectById = jest.fn(),
        getAllObjects = jest.fn(),
        deleteObjectById = jest.fn(),
        updateObject = jest.fn()
    }: EditableStoreDBInterface<STORE_T, STORE_T_UPDATE_INTERFACE>
): EditableStoreDBInterface<STORE_T, STORE_T_UPDATE_INTERFACE>{
    return {
        addObject, addObjects,
        getObjectByIndexColumn, getObjectById, getAllObjects,
        deleteObjectById,
        updateObject
    }
}


