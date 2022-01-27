"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MessageType_1 = require("../../base_dto/MessageType");
function createCommand_UpdateIndexingSettings(indexAllPages, minimumTotalTimeOnPageToIndex, minimumTotalVisitsOnPageToIndex, minimumAndConditions) {
    return {
        messageType: MessageType_1.MessageType.Command_UpdateIndexingSettings,
        indexingSettings: {
            indexAllPages,
            minimumTotalTimeOnPageToIndex,
            minimumTotalVisitsOnPageToIndex,
            minimumAndConditions
        }
    };
}
exports.default = createCommand_UpdateIndexingSettings;
//# sourceMappingURL=Command_UpdateIndexingSettings.js.map