"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDBManager = exports.EditableDB_Manager = void 0;
const Stitching_1 = require("../../../../../utils/Stitching");
class EditableDB_Manager {
    constructor(db, methodsToNotStitch = null) {
        this.db = db;
        (0, Stitching_1.stitch)({
            _this: this,
            methodsToNotStitch: methodsToNotStitch,
            keyToObjectToSwitch: "db"
        });
    }
}
exports.EditableDB_Manager = EditableDB_Manager;
function createDBManager({ db, methodsToNotStitch }) {
    return new EditableDB_Manager(db, methodsToNotStitch);
}
exports.createDBManager = createDBManager;
//# sourceMappingURL=DB_Manager.js.map