import {IndexObject} from "../../../store_objects_interfaces/base_store_objects/IndexObject";

export default interface HostnameObject extends IndexObject {
    id?: number,
    hostname: string
}