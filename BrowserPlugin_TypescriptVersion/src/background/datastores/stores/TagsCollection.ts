import BasicStoreWithKeyColumn from "../abstract_stores/BasicStoreWithKeyColumn";
import StoreKeyIndexInterface from "../abstract_store_object_parts/StoreKeyIndexInterface";
import StoreObjectInterface from "../abstract_store_object_parts/StoreObjectInterface";
import { AddMultipleKeysAndGetIndexesInterface,AddMultipleKeysAndGetIndexes } from "./mixins/AddMultipleKeysAndGetIndexes";

interface Tag extends StoreObjectInterface {
    id: number,
    tag: string
}

class TagsCollection extends BasicStoreWithKeyColumn<Tag>
                        implements AddMultipleKeysAndGetIndexesInterface {
    readonly x: string = ""
    constructor(){
        super("", 1, "","tag");
    }

    addMultipleKeysAndGetIndexes(newKeys: IDBValidKey[]): Promise<StoreKeyIndexInterface[]> {
        var [tx,objectStore] = super.getObjectStoreFromTransaction('readwrite');

        return AddMultipleKeysAndGetIndexes(newKeys,tx,objectStore);
    }
}

export const tagsCollection = new BasicStoreWithKeyColumn<Tag>("", 1, "","tag") 