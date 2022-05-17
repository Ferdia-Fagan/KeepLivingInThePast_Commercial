/**
 * Base of a DB implementation
 */
export abstract class DBConnection_A {

    private readonly STORE_NAME: string;

    private DB_Connection: IDBDatabase;

    constructor(storeName: string, db: IDBDatabase) {
        this.STORE_NAME = storeName;
        this.DB_Connection = db
    }

    /**
     * @description
     * Get the store within a database to then perform a request on
     *
     * @param {string} store_name
     * @param {string} mode either "readonly" or "readwrite"
     */
    protected getObjectStore(mode: IDBTransactionMode): IDBObjectStore {
        const request: IDBTransaction = this.DB_Connection.transaction(this.STORE_NAME, mode);
        return request.objectStore(this.STORE_NAME);
    }

    protected getObjectStoreFromTransaction(mode: IDBTransactionMode): [IDBTransaction, IDBObjectStore] {
        const tx: IDBTransaction = this.DB_Connection.transaction([this.STORE_NAME], mode);
        return [
            this.DB_Connection.transaction([this.STORE_NAME], mode),    // tx
            tx.objectStore(this.STORE_NAME) // objectStore
        ]
    }

    protected onFailedRequest(evt: any): void { // TODO: update evt interface
        console.error("error with database request", evt.target.errorCode);
    }
}
