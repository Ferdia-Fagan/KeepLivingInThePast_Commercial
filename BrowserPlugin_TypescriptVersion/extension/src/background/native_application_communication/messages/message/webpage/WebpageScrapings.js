"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_WebpageScrapings_Message = void 0;
const MessageType_1 = require("../../values/MessageType");
function create_WebpageScrapings_Message(webpageLoggingId, title, url, imgUrl, scrapings) {
    return {
        type: MessageType_1.MessageType.Save_WebScrapings,
        message: {
            webpageLoggingId: webpageLoggingId,
            title: title,
            url: url,
            imgUrl: imgUrl,
            scrapings: scrapings
        }
    };
}
exports.create_WebpageScrapings_Message = create_WebpageScrapings_Message;
//# sourceMappingURL=WebpageScrapings.js.map