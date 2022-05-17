"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_TellSystem_BookmarksFolderReport = void 0;
const MessageType_1 = require("../../../values/MessageType");
function create_TellSystem_BookmarksFolderReport(createdBookmarksReport = null, updatedBookmarksReport = null, deletedBookmarksReport = null) {
    return {
        type: MessageType_1.MessageType.Record_BookmarksReport,
        messageData: {
            createdBookmarksReport,
            updatedBookmarksReport,
            deletedBookmarksReport
        }
    };
}
exports.create_TellSystem_BookmarksFolderReport = create_TellSystem_BookmarksFolderReport;
//# sourceMappingURL=TellSystem_BookmarksFolderReport.js.map