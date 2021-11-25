import MapCache from "../../utils/MapCache";
import IndexKeyObject from "../DTOs/baseDTOs/StoreKeyIndexInterface";
import DB from "./DB";
import IndexObject from "../DTOs/baseDTOs/IndexObject";
import {ID, KEY} from "../stores/Utils";

// TODO: make DBSTore, DBCache and DBReport and compoenents so are composable, rather than extendable.

/**
 * description:
 * by using this, 
 * store is assumed to have atleast:
 * {id, key,...}
 */
export abstract class DBWithCache<STORE_T extends IndexKeyObject, KEY_T extends IDBValidKey> extends DB<STORE_T> {
    cache = new MapCache<IDBValidKey, number>(100, 10);

    /**
     * Add new element (must not exist with key already) for system to indexdb and cache
     * (does not check cache)
     * @param value 
     */
    addObject(value: STORE_T): Promise<number>{

        // TODO: remove code
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

    async getObjectByKey(key_value: KEY_T): Promise<STORE_T>{
        if(this.cache.has(key_value)){
            let cachedIdValue = this.cache.get(key_value);
            return super.getObjectById(cachedIdValue)
        } else {
            return super.getObjectByIndexColumn(
                KEY, key_value
            );
        }
    }
} 

