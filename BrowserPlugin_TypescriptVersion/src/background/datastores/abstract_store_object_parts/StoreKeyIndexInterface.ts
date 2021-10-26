import StoreObjectInterface from "./StoreObjectInterface";

export default interface StoreKeyIndexObjectInterface extends StoreObjectInterface {
    ID: number,
    KEY: IDBValidKey
}