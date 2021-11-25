import BasicStoreWithKeyColumn from "../abstract_stores/BasicStoreWithKeyColumn";
import StoreKeyIndexInterface from "../DTOs/baseDTOs/StoreKeyIndexInterface";
import IndexObject from "../DTOs/baseDTOs/IndexObject";
import { AddMultipleKeysAndGetIndexesInterface,AddMultipleKeysAndGetIndexes } from "./mixins/AddMultipleKeysAndGetIndexes";

interface Tag extends IndexObject {
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