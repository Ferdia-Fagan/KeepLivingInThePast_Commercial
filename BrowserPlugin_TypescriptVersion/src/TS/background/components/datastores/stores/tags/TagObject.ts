import {
    ID_TYPE,
    StoreObjectStub
} from "../../components/parts/abstract_object_store_parts/layers/layer0_db/store_object/Types";
import {TagName} from "./Types";

export default interface TagObject extends StoreObjectStub {
    id?: ID_TYPE,
    tag: TagName
}
