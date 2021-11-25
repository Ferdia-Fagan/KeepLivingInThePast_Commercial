import IndexObject from "../../DTOs/baseDTOs/IndexObject";

export default interface DBInterface<STORE_T extends IndexObject> {
    // addElementAndThenDoSomething(newElementToStore: STORE_T,
    //     onSuccessfullReq: ((evt: any & Event) => void)): void
    addObject(newElementToStore: STORE_T): Promise<number>
    getObjectByIndexColumn(indexName: string, value: IDBValidKey): Promise<STORE_T>
    getAllObjects(): Promise<Array<STORE_T>>
    deleteObjectById(elementId: number): void
    updateObject(storeObject: STORE_T): void
}