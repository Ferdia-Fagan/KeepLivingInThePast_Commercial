"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_AddTrackedHostnamesReport_Message = void 0;
const MessageType_1 = require("../../values/MessageType");
function create_AddTrackedHostnamesReport_Message(TrackedHostnamesAdded) {
    return {
        type: MessageType_1.MessageType.Save_AddedTrackedHostnamesReport,
        message: {
            TrackedHostnamesAdded
        }
    };
}
exports.create_AddTrackedHostnamesReport_Message = create_AddTrackedHostnamesReport_Message;
//# sourceMappingURL=AddHostNameIds.js.map