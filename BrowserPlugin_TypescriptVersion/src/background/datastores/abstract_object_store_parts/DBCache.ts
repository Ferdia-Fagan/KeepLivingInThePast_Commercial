import MapCache from "../../utils/MapCache";
import StoreKeyIndexObjectInterface from "../abstract_store_object_parts/StoreKeyIndexInterface";
import DBStore from "./DBStore";

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
export abstract class DBCache extends DBStore<StoreKeyIndexObjectInterface> {
    cache: MapCache<IDBValidKey, number>;

    // getObjectStore(mode: IDBTransactionMode): IDBObjectStore;

    // onSuccessfullAdd_ValueForKey(evt: any): void;

    // onFailedRequest(evt: any): void;

    /**
     * Add new element for system to indexdb and cache
     * (does not check cache)
     * @param value 
     */
    addElementAndThenDoSomething(value: StoreKeyIndexObjectInterface){

        const self = this;

        function onSuccessfullBookmarkAdd(evt: any & Event){ // TODO: update evt interface
            // const bookmarkId = req.result; 
            const bookmarkId = evt.target.result; 
    
            self.cache.set(value.KEY, bookmarkId);
            
            // if(bookmarkType === BookmarkType.BookmarkWebpage){
            //     self.bookmarksAddedReport.set(bookmarkId, [parentId,webpageLoggingId])
            // }
        }
    
        super.addElementAndThenDoSomething(value, onSuccessfullBookmarkAdd);
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

    private onSuccessfullBookmarkGet(evt: any){
        if (typeof evt.target.result == 'undefined') {
            const bookmarkId = evt.target.result; 
    
            this.cache.set(key_value,bookmarkId);
        }
    }
} 

