import {StoreObjectInterface} from "../../../components/parts/abstract_object_store_parts/layers/layer0_db/store_object/StoreObject";

export default interface HostnameObject extends StoreObjectInterface {
    hostname: string
}