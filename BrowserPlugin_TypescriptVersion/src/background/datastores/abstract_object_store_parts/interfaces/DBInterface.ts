import StoreObjectInterface from "../../abstract_store_object_parts/StoreObjectInterface";

export default interface DBInterface<STORE_T extends StoreObjectInterface> {
    // addElementAndThenDoSomething(newElementToStore: STORE_T,
    //     onSuccessfullReq: ((evt: any & Event) => void)): void
    addObject(newElementToStore: STORE_T): Promise<number>
    getObjectByIndexColumn(indexName: string, value: IDBValidKey): Promise<STORE_T>
    getAllObjects(): Promise<Array<STORE_T>>
    deleteObjectById(elementId: number): void
    updateObject(storeObject: STORE_T): void
}