"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_TellSystem_TagsReport = void 0;
const MessageType_1 = require("../../../values/MessageType");
function create_TellSystem_TagsReport(tagsUpdateReport) {
    return {
        type: MessageType_1.MessageType.Record_TagsReport,
        messageData: {
            tagsUpdateReport
        }
    };
}
exports.create_TellSystem_TagsReport = create_TellSystem_TagsReport;
//# sourceMappingURL=TagsReport.js.map