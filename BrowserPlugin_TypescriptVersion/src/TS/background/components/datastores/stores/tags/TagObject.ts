import {StoreObjectInterface} from "../../components/parts/abstract_object_store_parts/layers/layer0_db/store_object/StoreObject";
import {ID_TYPE} from "../../components/parts/abstract_object_store_parts/layers/layer0_db/store_object/DataTypes";
import {TagName} from "./Types";

export default interface TagObject extends StoreObjectInterface {
    id?: ID_TYPE,
    tag: TagName
}
