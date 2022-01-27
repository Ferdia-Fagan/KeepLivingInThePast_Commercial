"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_Command_LogWebpageVisit = void 0;
const MessageType_1 = require("../../values/MessageType");
function create_Command_LogWebpageVisit(responseId, data) {
    return {
        type: MessageType_1.MessageType.Log_WebPageVisit,
        responseId,
        messageData: data
    };
}
exports.create_Command_LogWebpageVisit = create_Command_LogWebpageVisit;
//# sourceMappingURL=Command_LogWebpageVisit.js.map