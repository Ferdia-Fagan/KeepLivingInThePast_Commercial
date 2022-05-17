"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_TellSystem_AddTrackedHostnamesReport = void 0;
const MessageType_1 = require("../../values/MessageType");
function create_TellSystem_AddTrackedHostnamesReport(TrackedHostnamesAdded) {
    return {
        type: MessageType_1.MessageType.Save_AddedTrackedHostnamesReport,
        messageData: {
            TrackedHostnamesAdded
        }
    };
}
exports.create_TellSystem_AddTrackedHostnamesReport = create_TellSystem_AddTrackedHostnamesReport;
//# sourceMappingURL=AddHostNameIds.js.map