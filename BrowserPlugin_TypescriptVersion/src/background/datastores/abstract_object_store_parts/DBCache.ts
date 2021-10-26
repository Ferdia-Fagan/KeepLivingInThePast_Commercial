import MapCache from "../../utils/MapCache";
import StoreKeyIndexObjectInterface from "../abstract_store_object_parts/StoreKeyIndexInterface";
import DBStore from "./DBStore";

export interface IndexStore {
    id?: number,
    key: any & IDBValidKey
}

export abstract class DBCache<K extends IDBValidKey> extends DBStore<StoreKeyIndexObjectInterface> {
    cache: MapCache<K,number>;

    // getObjectStore(mode: IDBTransactionMode): IDBObjectStore;

    // onSuccessfullAdd_ValueForKey(evt: any): void;

    // onFailedRequest(evt: any): void;

    addElement(value: StoreKeyIndexObjectInterface){

        const self = this;

        function onSuccessfullBookmarkAdd(evt: any){ // TODO: update evt interface
            // const bookmarkId = req.result; 
            const bookmarkId = evt.target.result; 
    
            self.cache.set(value.key,bookmarkId);
            
            // if(bookmarkType === BookmarkType.BookmarkWebpage){
            //     self.bookmarksAddedReport.set(bookmarkId, [parentId,webpageLoggingId])
            // }
        }
    
        super.addElement(value, onSuccessfullBookmarkAdd);
    }

    async getIdFromKey(key_value: K): Promise<IDBValidKey>{
        if(this.cache.has(key_value)){
            return this.cache.get(key_value);
        } else {

            const self = this;

            function onSuccessfullBookmarkGet(evt: any){ // TODO: update evt interface
                // const bookmarkId = req.result; 
                if (typeof evt.target.result == 'undefined') {
                    const bookmarkId = evt.target.result; 
            
                    self.cache.set(key_value,bookmarkId);
                }
                
            }

            return super.getStoreObjectByColumn('key', key_value,onSuccessfullBookmarkGet);
        }
    }

    deleteElement(bookmarkKey: ){

    }
    
} 

