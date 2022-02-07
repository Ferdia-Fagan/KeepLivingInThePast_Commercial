import {
    StoreObjectStub
} from "../../../components/parts/abstract_object_store_parts/layers/layer0_db/store_object/Types";

export default interface HostnameObject extends StoreObjectStub {
    hostname: string
}