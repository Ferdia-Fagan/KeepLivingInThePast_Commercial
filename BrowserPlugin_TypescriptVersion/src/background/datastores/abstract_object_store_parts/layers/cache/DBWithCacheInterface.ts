import IndexObject from "../../../store_objects_interfaces/base_store_objects/IndexObject";
import {KEY_TYPE} from "../../../store_objects_interfaces/types/Types";

export default interface DBWithCacheInterface<STORE_T extends IndexObject> {
    getObjectByKey(key: KEY_TYPE): Promise<STORE_T>
}