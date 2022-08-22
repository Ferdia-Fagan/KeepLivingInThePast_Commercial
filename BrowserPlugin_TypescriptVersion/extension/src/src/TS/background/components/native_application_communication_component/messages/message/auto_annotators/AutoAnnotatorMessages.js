"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_TellSystem_DeleteAutoAnnotatorReport = exports.create_TellSystem_UpdatedAutoAnnotatorReportMessage = exports.create_TellSystem_NewAutoAnnotatorReportMessage_Message = void 0;
const MessageType_1 = require("../../values/MessageType");
function create_TellSystem_NewAutoAnnotatorReportMessage_Message(newAutoAnnotatorReport) {
    return {
        type: MessageType_1.MessageType.Save_NewAutoAnnotatorReport,
        messageData: newAutoAnnotatorReport
    };
}
exports.create_TellSystem_NewAutoAnnotatorReportMessage_Message = create_TellSystem_NewAutoAnnotatorReportMessage_Message;
function create_TellSystem_UpdatedAutoAnnotatorReportMessage(updatedAutoAnnotatorReport) {
    return {
        type: MessageType_1.MessageType.Save_NewAutoAnnotatorReport,
        messageData: updatedAutoAnnotatorReport
    };
}
exports.create_TellSystem_UpdatedAutoAnnotatorReportMessage = create_TellSystem_UpdatedAutoAnnotatorReportMessage;
function create_TellSystem_DeleteAutoAnnotatorReport(autoAnnotatorIds) {
    return {
        type: MessageType_1.MessageType.Save_NewAutoAnnotatorReport,
        messageData: autoAnnotatorIds
    };
}
exports.create_TellSystem_DeleteAutoAnnotatorReport = create_TellSystem_DeleteAutoAnnotatorReport;
//# sourceMappingURL=AutoAnnotatorMessages.js.map