import IndexObject from "../../store_objects_interfaces/base_store_objects/IndexObject";
import {ID_TYPE} from "../../store_objects_interfaces/types/Types";
import {TagName} from "./Types";

export default interface TagObject extends IndexObject {
    id?: ID_TYPE,
    tag: TagName
}
