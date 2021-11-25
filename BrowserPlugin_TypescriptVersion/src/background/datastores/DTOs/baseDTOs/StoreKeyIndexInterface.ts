import IndexObject from "./IndexObject";

export default interface IndexKeyObject extends IndexObject {
    ID?: number,
    KEY: IDBValidKey
}