"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MessageType_1 = require("../../../base_dto/MessageType");
function createRequest_DeleteAutoAnnotator(autoAnnotatorId) {
    return {
        messageType: MessageType_1.MessageType.Request_DeleteAutoAnnotator,
        autoAnnotatorId
    };
}
exports.default = createRequest_DeleteAutoAnnotator;
//# sourceMappingURL=Request_DeleteAutoAnnotator.js.map