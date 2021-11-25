// TODO: abstract reporting behavior to modular components.

import {DBWithCache} from "./DBWithCache";
import IndexKeyObject from "../DTOs/baseDTOs/StoreKeyIndexInterface";
import {ID} from "../../../utils/Aliases";

export abstract class DBWithCacheWithReporting<STORE_T extends IndexKeyObject, KEY_T extends IDBValidKey>
    extends DBWithCache<STORE_T, KEY_T> {

    newObjectsReport = new Map<ID, STORE_T>()  // TODO: STORE_T mite have to become a transofrmation interface for what is wanted to be reported/saved
    updatedObjectReport = new Map<ID, STORE_T>()
    deletedObjectReport = new Set<ID>()

    addObject(value: STORE_T): Promise<number> {
        return super.addObject(value).then(
            elementId => {
                value.ID = elementId
                this.newObjectsReport.set(elementId, value)
                return elementId;
            }
        )
    }

    updateObject(value: STORE_T): void {
        this.updatedObjectReport.set(value.ID, value)
        super.updateObject(value)
    }

    deleteObjectById(elementId: number): void{
        this.deletedObjectReport.add(elementId)
        super.deleteObjectById(elementId)
    }

}