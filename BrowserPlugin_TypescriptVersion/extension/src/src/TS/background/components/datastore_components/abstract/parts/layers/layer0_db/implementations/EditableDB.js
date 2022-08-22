"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditableDB = void 0;
const NonEditableDB_1 = require("./NonEditableDB");
class EditableDB extends NonEditableDB_1.NonEditableDB {
    updateObject(storeObject) {
        let store = this.getObjectStore('readwrite');
        store.put(storeObject);
    }
}
exports.EditableDB = EditableDB;
//# sourceMappingURL=EditableDB.js.map