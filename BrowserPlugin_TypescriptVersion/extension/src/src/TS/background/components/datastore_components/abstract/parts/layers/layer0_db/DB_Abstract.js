"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBConnection_A_WRAPPER = exports.DBConnection_A = void 0;
/**
 * Base of a DB implementation
 */
class DBConnection_A {
    constructor(storeName, db) {
        this.STORE_NAME = storeName;
        this.DB_Connection = db;
    }
    /**
     * @description
     * Get the store within a database to then perform a request on
     *
     * @param {string} store_name
     * @param {string} mode either "readonly" or "readwrite"
     */
    getObjectStore(mode) {
        const request = this.DB_Connection.transaction(this.STORE_NAME, mode);
        return request.objectStore(this.STORE_NAME);
    }
    getObjectStoreFromTransaction(mode) {
        const tx = this.DB_Connection.transaction([this.STORE_NAME], mode);
        return [
            this.DB_Connection.transaction([this.STORE_NAME], mode),
            tx.objectStore(this.STORE_NAME) // objectStore
        ];
    }
    onFailedRequest(evt) {
        console.error("error with database request", evt.target.errorCode);
    }
}
exports.DBConnection_A = DBConnection_A;
class DBConnection_A_WRAPPER extends DBConnection_A {
}
exports.DBConnection_A_WRAPPER = DBConnection_A_WRAPPER;
//# sourceMappingURL=DB_Abstract.js.map