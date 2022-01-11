"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MessageType_1 = require("../../base_dto/MessageType");
function createCommand_ChangeTagsOfWebpage(webpageId, tagsReport) {
    return {
        messageType: MessageType_1.MessageType.Command_ChangeTagsOfWebpage,
        webpageId: webpageId,
        tagsReport: tagsReport
    };
}
exports.default = createCommand_ChangeTagsOfWebpage;
//# sourceMappingURL=Command_ChangeTagsOfWebpage.js.map