"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_TagsReport_Message = void 0;
const MessageType_1 = require("../../../values/MessageType");
function create_TagsReport_Message(tagsUpdateReport) {
    return {
        type: MessageType_1.MessageType.Record_TagsReport,
        message: {
            tagsUpdateReport
        }
    };
}
exports.create_TagsReport_Message = create_TagsReport_Message;
//# sourceMappingURL=TagsReport.js.map