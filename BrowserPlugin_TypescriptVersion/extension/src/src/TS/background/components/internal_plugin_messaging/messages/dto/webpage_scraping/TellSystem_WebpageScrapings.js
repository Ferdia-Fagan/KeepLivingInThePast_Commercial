"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MessageType_1 = require("../../base_dto/MessageType");
function createTellSystem_WebpageScrapings(title, webpageUrl, webpageImgUrl, webpageScrapings) {
    return {
        messageType: MessageType_1.MessageType.CommandWithResponse_AddNewTags,
        title,
        webpageUrl,
        webpageImgUrl,
        webpageScrapings
    };
}
exports.default = createTellSystem_WebpageScrapings;
//# sourceMappingURL=TellSystem_WebpageScrapings.js.map