"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_Command_LogWebpages = void 0;
const MessageType_1 = require("../../values/MessageType");
function create_Command_LogWebpages(responseId, webpages) {
    return {
        type: MessageType_1.MessageType.Log_WebPageVisit,
        responseId,
        messageData: {
            webpages
        }
    };
}
exports.create_Command_LogWebpages = create_Command_LogWebpages;
//# sourceMappingURL=Command_LogWebpages.js.map