import StoreObjectInterface from "../abstract_store_object_parts/StoreObjectInterface";

export default interface DBInterface<STORE_T extends StoreObjectInterface> {
    addElementAndThenDoSomething(newElementToStore: STORE_T,
        onSuccessfullReq: ((evt: any & Event) => void)): void
    getStoreObjectByColumn( indexName: string, value: IDBValidKey): Promise<IDBValidKey>
    getAllStoreObject(): Promise<Array<STORE_T>>
    deleteStoreObjectById(elementId: number): void
    updateStoreObject(storeObject: STORE_T): void
}