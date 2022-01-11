// import DBCollection from "../DBCollection";
//
// interface WebpageTag {
//     id: number,
//     tag: string
// }
//
// const ID = 'id';
// const TAG = 'tag';
//
// class WebpageTagsCollection extends DBCollection<WebpageTag> {
//     constructor(DATABASE: string, DB_VERSION: number,STORE_NAME: string){
//         function onUpgradeNeededHandler(event: any){    // TODO: correct any
//             // This will set up the DS
//
//             var objectStore = event.currentTarget.result.createObjectStore(
//                 // STORE_NAME, { keyPath: 'bookmarkKey', autoIncrement: true });
//                 STORE_NAME, { keyPath: ID, autoIncrement: true });
//
//             objectStore.createIndex(TAG, TAG, { unique: true });
//
//         }
//
//         super(DATABASE, DB_VERSION,STORE_NAME,onUpgradeNeededHandler);
//
//         // this._tagsUpdateReport = new Map();
//     }
//
//     // checkIfHasUpdateReport(){
//     //     return (this._tagsUpdateReport.size !== 0)
//     // }
//
//     // getUpdateReport(willClear){
//
//     //     let tagsUpdateReportArr = Array.from(this._tagsUpdateReport)
//     //     if(willClear){
//     //         this._tagsUpdateReport = new Map();
//     //     }
//
//     //     for(let [i,[webpageLoggingId,webpageTagUpdates]] of tagsUpdateReportArr.entries()){
//
//
//     //         let tagsAddedToWebpage = []
//     //         let tagsRemovedFromWebpage = []
//     //         for(let [tagId,isAdded] of webpageTagUpdates){
//
//     //             if(isAdded){
//     //                 tagsAddedToWebpage.push(tagId)
//     //             }else{
//     //                 tagsRemovedFromWebpage.push(tagId)
//     //             }
//     //         }
//     //         tagsUpdateReportArr[i][1] = [tagsAddedToWebpage,tagsRemovedFromWebpage]
//     //     }
//     //     return tagsUpdateReportArr;
//     // }
//
//
//     // updateExistingTabsForWebpage(tagReport, webpageLoggingId){
//
//
//     //     this._tagsUpdateReport.set(webpageLoggingId, tagReport);
//
//
//     // }
//
//
//
//     // -------------------------------------------------
//
//     addNewTagsAndGetTagIds(newTags: Array<string>): Promise<Array<WebpageTag>>{
//         var [tx,objectStore] = super.getObjectStoreFromTransaction('readwrite');
//
//         var newTagIds: Array<WebpageTag> = []
//
//         newTags.forEach(newTag => {
//             let addTag_Req = objectStore.add({value:newTag});
//             addTag_Req.onsuccess = function(newTagId: any){ // TODO: update type any
//                 newTagIds.push({id: newTagId.target.result,tag:newTag});
//             }
//
//         })
//
//         return new Promise<Array<WebpageTag>>((resolve, reject) => {
//             tx.oncomplete = function(event) {
//
//                 resolve(newTagIds)
//             }
//         })
//     }
//
//     getAllTags(): Promise<Array<WebpageTag>>{
//         return super.getAll();
//     }
//
//     // TODO: getTags
//     // getTags(tagIds: Array<number>): Array<string>{
//
//     // }
//
//
// }
