"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalMessageRouter = void 0;
const webextension_polyfill_1 = __importDefault(require("webextension-polyfill"));
/**
 * Requirement on refactor: format and section accordingly
 */
exports.InternalMessageRouter = {
// [MessageType.Command_AddHostnameOfWebpageToHostnames]:
};
function routerInternalMessages(message, sender) {
    exports.InternalMessageRouter[message.messageType](message.messageData, sender);
}
webextension_polyfill_1.default.runtime.onMessage.addListener(routerInternalMessages);
//# sourceMappingURL=InternalMessageRouter.js.map