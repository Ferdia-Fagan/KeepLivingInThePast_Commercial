"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_TellSystem_WebpageScrapings = void 0;
const MessageType_1 = require("../../values/MessageType");
function create_TellSystem_WebpageScrapings(webpageScrapings) {
    return {
        type: MessageType_1.MessageType.Save_WebScrapings,
        messageData: webpageScrapings
    };
}
exports.create_TellSystem_WebpageScrapings = create_TellSystem_WebpageScrapings;
//# sourceMappingURL=TellSystem_WebpageScrapings.js.map