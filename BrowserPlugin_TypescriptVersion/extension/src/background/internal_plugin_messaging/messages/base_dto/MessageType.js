"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageType = void 0;
var MessageType;
(function (MessageType) {
    MessageType[MessageType["RequestQuery"] = 0] = "RequestQuery";
    MessageType[MessageType["Command_UpdateIndexingSettings"] = 1] = "Command_UpdateIndexingSettings";
    MessageType[MessageType["Command_SendUpdateReport"] = 2] = "Command_SendUpdateReport";
    MessageType[MessageType["Command_ChangeTagsOfWebpage"] = 3] = "Command_ChangeTagsOfWebpage";
    MessageType[MessageType["TellSystem_AnnotationUIIsOpen"] = 4] = "TellSystem_AnnotationUIIsOpen";
    MessageType[MessageType["Request_GetAllTags"] = 5] = "Request_GetAllTags";
    MessageType[MessageType["Request_GetAllTagsAndBookmarks"] = 6] = "Request_GetAllTagsAndBookmarks";
    MessageType[MessageType["Request_GetAllHostnames"] = 7] = "Request_GetAllHostnames";
    MessageType[MessageType["Request_GetAllAutoAnnotators"] = 8] = "Request_GetAllAutoAnnotators";
    MessageType[MessageType["Request_GetAutoAnnotator"] = 9] = "Request_GetAutoAnnotator";
    MessageType[MessageType["Request_CreateAutoAnnotator"] = 10] = "Request_CreateAutoAnnotator";
    MessageType[MessageType["Request_UpdateAutoAnnotator"] = 11] = "Request_UpdateAutoAnnotator";
    MessageType[MessageType["Request_DeleteAutoAnnotator"] = 12] = "Request_DeleteAutoAnnotator";
    MessageType[MessageType["Command_AddHostnameOfWebpageToHostnames"] = 13] = "Command_AddHostnameOfWebpageToHostnames";
    MessageType[MessageType["Command_GetCurrentWebpageTags"] = 14] = "Command_GetCurrentWebpageTags";
    MessageType[MessageType["Request_ReportsAndBrowserData"] = 15] = "Request_ReportsAndBrowserData";
    MessageType[MessageType["CommandWithResponse_AddNewTags"] = 16] = "CommandWithResponse_AddNewTags";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
//# sourceMappingURL=MessageType.js.map