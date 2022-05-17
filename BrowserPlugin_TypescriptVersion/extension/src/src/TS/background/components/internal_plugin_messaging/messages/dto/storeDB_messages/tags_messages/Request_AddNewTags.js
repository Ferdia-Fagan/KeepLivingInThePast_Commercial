"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MessageType_1 = require("../../../base_dto/MessageType");
function createCommandWithResponse_AddNewTags(newTags) {
    return {
        messageType: MessageType_1.MessageType.CommandWithResponse_AddNewTags,
        newTags: newTags
    };
}
exports.default = createCommandWithResponse_AddNewTags;
//# sourceMappingURL=Request_AddNewTags.js.map