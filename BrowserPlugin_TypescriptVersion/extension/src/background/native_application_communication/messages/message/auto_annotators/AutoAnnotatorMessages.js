"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_DeleteAutoAnnotatorReportMessage_Message = exports.create_UpdatedAutoAnnotatorReportMessage_Message = exports.create_NewAutoAnnotatorReportMessage_Message = void 0;
const MessageType_1 = require("../../values/MessageType");
function create_NewAutoAnnotatorReportMessage_Message(autoAnnotatorId, tagIds, hostIds) {
    return {
        type: MessageType_1.MessageType.Save_NewAutoAnnotatorReport,
        message: {
            autoAnnotatorId,
            tagIds,
            hostIds
        }
    };
}
exports.create_NewAutoAnnotatorReportMessage_Message = create_NewAutoAnnotatorReportMessage_Message;
function create_UpdatedAutoAnnotatorReportMessage_Message(autoAnnotatorId, tagIds_Added, tagIds_Removed, hostIds_Added, hostIds_Removed) {
    return {
        type: MessageType_1.MessageType.Save_NewAutoAnnotatorReport,
        message: {
            autoAnnotatorId,
            tagIds_Added,
            tagIds_Removed,
            hostIds_Added,
            hostIds_Removed
        }
    };
}
exports.create_UpdatedAutoAnnotatorReportMessage_Message = create_UpdatedAutoAnnotatorReportMessage_Message;
function create_DeleteAutoAnnotatorReportMessage_Message(autoAnnotatorIds) {
    return {
        type: MessageType_1.MessageType.Save_NewAutoAnnotatorReport,
        message: autoAnnotatorIds
    };
}
exports.create_DeleteAutoAnnotatorReportMessage_Message = create_DeleteAutoAnnotatorReportMessage_Message;
//# sourceMappingURL=AutoAnnotatorMessages.js.map