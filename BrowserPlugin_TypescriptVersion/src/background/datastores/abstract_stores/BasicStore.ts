import DB from "../abstract_object_store_parts/DB";
import StoreObjectInterface from "../abstract_store_object_parts/StoreObjectInterface";
import { ID } from "../stores/Utils";

/**
 * description:
 * store that does not have the concept of a 'key'. Any index could be searched.
 */
export default class BasicStore<StoreObjType extends StoreObjectInterface> extends DB<StoreObjType> {
    constructor(DATABASE: string, DB_VERSION: number,STORE_NAME: string){
        function onUpgradeNeededHandler(event: any){    // TODO: correct any
             event.currentTarget.result.createObjectStore(
                STORE_NAME, { keyPath: ID, autoIncrement: true });
        }

        super(DATABASE, DB_VERSION,STORE_NAME,onUpgradeNeededHandler);
    }
}

