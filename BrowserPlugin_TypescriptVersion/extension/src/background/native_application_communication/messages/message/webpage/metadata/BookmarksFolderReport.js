"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_BookmarksReport_Message = void 0;
const MessageType_1 = require("../../../values/MessageType");
function create_BookmarksReport_Message(createdBookmarksReport = null, updatedBookmarksReport = null, deletedBookmarksReport = null) {
    return {
        type: MessageType_1.MessageType.Record_BookmarksReport,
        message: {
            createdBookmarksReport,
            updatedBookmarksReport,
            deletedBookmarksReport
        }
    };
}
exports.create_BookmarksReport_Message = create_BookmarksReport_Message;
//# sourceMappingURL=BookmarksFolderReport.js.map