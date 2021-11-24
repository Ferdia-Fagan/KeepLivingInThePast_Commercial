import MapCache from "../../utils/MapCache";
import StoreKeyIndexObjectInterface from "../abstract_store_object_parts/StoreKeyIndexInterface";
import DB from "./DB";
import StoreObjectInterface from "../abstract_store_object_parts/StoreObjectInterface";

export interface IndexStore {
    id?: number,
    key: any & IDBValidKey
}

// TODO: make DBSTore, DBCache and DBReport and compoenents so are composable, rather than extendable.

/**
 * description:
 * by using this, 
 * store is assumed to have atleast:
 * {id, key,...}
 */
export abstract class DBWithCache<STORE_T extends StoreKeyIndexObjectInterface> extends DB<STORE_T> {
    cache: MapCache<IDBValidKey, number>;

    // getObjectStore(mode: IDBTransactionMode): IDBObjectStore;

    // onSuccessfullAdd_ValueForKey(evt: any): void;

    // onFailedRequest(evt: any): void;

    /**
     * Add new element for system to indexdb and cache
     * (does not check cache)
     * @param value 
     */
    addObject(value: STORE_T): Promise<number>{

        // function onSuccessfullBookmarkAdd(evt: any & Event){ // TODO: update evt interface
        //     // const bookmarkId = req.result;
        //     const bookmarkId = evt.target.result;
        //
        //     self.cache.set(value.KEY, bookmarkId);
        //
        //     // if(bookmarkType === BookmarkType.BookmarkWebpage){
        //     //     self.bookmarksAddedReport.set(bookmarkId, [parentId,webpageLoggingId])
        //     // }
        // }
    
        return super.addObject(value).then(
            elementId => {
                this.cache.set(value.KEY, elementId)
                return elementId
            }
        )
    }

    // async getIdFromKey(key_value: K): Promise<IDBValidKey>{
    //     if(this.cache.has(key_value)){
    //         return this.cache.get(key_value);
    //     } else {

    //         // const self = this;

    //         // function onSuccessfullBookmarkGet(evt: any){ // TODO: update evt interface
    //         //     // const bookmarkId = req.result; 
    //         //     if (typeof evt.target.result == 'undefined') {
    //         //         const bookmarkId = evt.target.result; 
            
    //         //         self.cache.set(key_value,bookmarkId);
    //         //     }
                
    //         // }

    //         return super.getStoreObjectByColumn('key', key_value, this.onSuccessfullBookmarkGet);
    //     }
    // }

    // deleteElement(bookmarkKey: ){

    // }

    // DB Cache callback handlers:

    // private onSuccessfullBookmarkGet(evt: any){
    //     if (typeof evt.target.result == 'undefined') {
    //         const bookmarkId = evt.target.result;
    //
    //         this.cache.set(key_value,bookmarkId);
    //     }
    // }
} 

