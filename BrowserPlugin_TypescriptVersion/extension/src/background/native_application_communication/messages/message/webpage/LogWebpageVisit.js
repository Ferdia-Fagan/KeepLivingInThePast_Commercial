"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_LogWebpageVisit_Message = void 0;
const MessageType_1 = require("../../values/MessageType");
function create_LogWebpageVisit_Message(responseId, data) {
    return {
        type: MessageType_1.MessageType.Log_WebPageVisit,
        responseId: responseId,
        message: data
    };
}
exports.create_LogWebpageVisit_Message = create_LogWebpageVisit_Message;
//# sourceMappingURL=LogWebpageVisit.js.map