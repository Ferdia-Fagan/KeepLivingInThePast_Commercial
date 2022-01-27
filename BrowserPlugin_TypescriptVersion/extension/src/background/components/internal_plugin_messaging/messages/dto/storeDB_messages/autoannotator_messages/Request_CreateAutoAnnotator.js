"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MessageType_1 = require("../../../base_dto/MessageType");
function createRequest_CreateAutoAnnotator(newAutoAnnotator) {
    return {
        messageType: MessageType_1.MessageType.Request_CreateAutoAnnotator,
        newAutoAnnotator: newAutoAnnotator
    };
}
exports.default = createRequest_CreateAutoAnnotator;
//# sourceMappingURL=Request_CreateAutoAnnotator.js.map