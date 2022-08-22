"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stitch = exports.stitchObjects = void 0;
const DB_Abstract_1 = require("../components/datastore_components/abstract/parts/layers/layer0_db/DB_Abstract");
const BASE_DB_LAYER = DB_Abstract_1.DBConnection_A.name;
const haveReachedBaseDBLayer = (dbLayerName) => dbLayerName === BASE_DB_LAYER;
function stitchObjects(controller, db) {
    const methodsToNotStitch = new Set(Object.getOwnPropertyNames(controller).filter(item => typeof controller[item] === 'function'));
    const a = Object.getPrototypeOf(controller);
    const a1 = Object.getOwnPropertyNames(a);
    const b = Object.getPrototypeOf(a);
    const b1 = Object.getOwnPropertyNames(b);
    // const methodsToNotStitch = new Set(
    //     Object.getOwnPropertyNames(Object.getPrototypeOf())
    // )
    let currentLayerPrototype = Object.getPrototypeOf(db);
    while (!haveReachedBaseDBLayer(currentLayerPrototype.constructor.name)) {
        currentLayerPrototype = Object.getPrototypeOf(currentLayerPrototype);
        const currentLayerFuncNames = Object.getOwnPropertyNames(currentLayerPrototype);
        currentLayerFuncNames
            .filter(l => l !== "constructor")
            .filter(l => l in methodsToNotStitch)
            .forEach(funcName => {
            const x = funcName;
            controller[x] = controller.db[x].bind(this.db);
        });
    }
    return controller;
}
exports.stitchObjects = stitchObjects;
function stitch({ _this, methodsToNotStitch = null, keyToObjectToSwitch }) {
    const objToStitch = _this[keyToObjectToSwitch];
    let currentLayerPrototype = Object.getPrototypeOf(objToStitch);
    while (!haveReachedBaseDBLayer(currentLayerPrototype.constructor.name)) {
        const currentLayerFuncNames = Object.getOwnPropertyNames(currentLayerPrototype);
        currentLayerFuncNames
            .filter(l => l !== "constructor")
            .filter(l => methodsToNotStitch == null || !methodsToNotStitch.has(l))
            .forEach(funcName => {
            const x = funcName;
            _this[x] = _this[keyToObjectToSwitch][x].bind(_this[keyToObjectToSwitch]);
        });
        currentLayerPrototype = Object.getPrototypeOf(currentLayerPrototype);
    }
}
exports.stitch = stitch;
//# sourceMappingURL=Stitching.js.map