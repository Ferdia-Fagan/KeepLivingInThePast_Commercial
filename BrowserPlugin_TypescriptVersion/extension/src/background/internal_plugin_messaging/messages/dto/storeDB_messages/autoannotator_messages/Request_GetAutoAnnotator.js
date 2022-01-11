"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MessageType_1 = require("../../../base_dto/MessageType");
function createRequest_GetAutoAnnotator(autoAnnotatorId) {
    return {
        messageType: MessageType_1.MessageType.Request_GetAutoAnnotator,
        autoAnnotatorId
    };
}
exports.default = createRequest_GetAutoAnnotator;
//# sourceMappingURL=Request_GetAutoAnnotator.js.map