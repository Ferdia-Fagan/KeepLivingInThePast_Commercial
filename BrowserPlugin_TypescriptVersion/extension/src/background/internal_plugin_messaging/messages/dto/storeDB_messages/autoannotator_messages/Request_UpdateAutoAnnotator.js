"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MessageType_1 = require("../../../base_dto/MessageType");
function createRequest_UpdateAutoAnnotator(updatedAutoAnnotator) {
    return {
        messageType: MessageType_1.MessageType.Request_UpdateAutoAnnotator,
        updatedAutoAnnotator: updatedAutoAnnotator
    };
}
exports.default = createRequest_UpdateAutoAnnotator;
//# sourceMappingURL=Request_UpdateAutoAnnotator.js.map