import DB from "../abstract_object_store_parts/DB";
import IndexObject from "../DTOs/baseDTOs/IndexObject";
import { ID, KEY } from "../stores/Utils";

/**
 *  description:
 *  base class. 
 *  The sub class will want to fetch a id by a key.
 *  E.g. Tags, bookmarks, etc.
 */
export default class BasicStoreWithKeyColumn<StoreObjType extends IndexObject> extends DB<StoreObjType> {
    
    // private readonly KEY_NAME: string
    
    constructor(DATABASE: string, DB_VERSION: number,STORE_NAME: string, 
        keyName: string){        
        function onUpgradeNeededHandler(event: any){    // TODO: correct any
            let objectStore =  event.currentTarget.result.createObjectStore(
                STORE_NAME, { ID, autoIncrement: true });

            objectStore.createIndex(KEY,keyName)
        }

        super(DATABASE, DB_VERSION,STORE_NAME,onUpgradeNeededHandler);
    }

    async getByKey(key: IDBValidKey){
        return this.getObjectByIndexColumn(KEY, key);
    }

    
}