// import StoreKeyIndexObjectInterface from "../../DTOs/StoreKeyIndexInterface";
// import StoreObjectInterface from "../../DTOs/StoreObjectInterface";
//
// export interface AddMultipleKeysAndGetIndexesInterface {
//     addMultipleKeysAndGetIndexes: (newKeys: IDBValidKey[],
//         tx: IDBTransaction, objectStore: IDBObjectStore
//         ) => Promise<Array<StoreKeyIndexObjectInterface>>
// }
//
// export function AddMultipleKeysAndGetIndexes(newKeys: IDBValidKey[],
//                             tx: IDBTransaction, objectStore: IDBObjectStore
//                             ): Promise<Array<StoreKeyIndexObjectInterface>>{
//     var newKeysObjs: Array<StoreKeyIndexObjectInterface> = []
//
//     newKeys.forEach(newKey => {
//         let addKey_Req = objectStore.add({newKey});
//         addKey_Req.onsuccess = function(newIndexKeyObj: any){ // TODO: update type any
//             newKeysObjs.push({
//                 ID: newIndexKeyObj.target.result,
//                 KEY: newKey
//             })
//         }
//
//     })
//
//     return new Promise<Array<StoreKeyIndexObjectInterface>>((resolve, reject) => {
//         tx.oncomplete = function(event) {
//
//             resolve(newKeysObjs)
//         }
//     })
// }
//
//
