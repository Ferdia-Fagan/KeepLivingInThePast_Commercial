"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_Request_Query = void 0;
const MessageType_1 = require("../../values/MessageType");
function create_Request_Query(responseId, queryReq) {
    return {
        type: MessageType_1.MessageType.Request_Query,
        responseId: responseId,
        messageData: queryReq
    };
}
exports.create_Request_Query = create_Request_Query;
//# sourceMappingURL=Request_Query.js.map