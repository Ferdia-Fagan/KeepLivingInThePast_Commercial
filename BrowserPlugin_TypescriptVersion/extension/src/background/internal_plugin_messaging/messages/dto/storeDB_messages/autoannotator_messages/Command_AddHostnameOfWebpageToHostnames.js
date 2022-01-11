"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MessageType_1 = require("../../../base_dto/MessageType");
function createRequestToAddHostnameToCollection(webpageId) {
    return {
        messageType: MessageType_1.MessageType.Command_AddHostnameOfWebpageToHostnames,
        webpageId: webpageId
    };
}
exports.default = createRequestToAddHostnameToCollection;
//# sourceMappingURL=Command_AddHostnameOfWebpageToHostnames.js.map