import {ID_TYPE} from "./DataTypes";

export const ID_NAME = "id"
export const KEY_NAME = "KEY"

export interface StoreObjectInterface {
    id?: ID_TYPE
}

export type StoreObject = StoreObjectInterface

export interface UpdatedStoreObjectInterface {
    id: ID_TYPE
}

export type UpdatedStoreObject = StoreObjectInterface