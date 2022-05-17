"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebpageState = void 0;
/**
 * Management extends entity.
 * This is to be extended by implementations of management
 */
class WebpageState {
    constructor(webpageLoggingId, metaData, metaData_UpdateTrackers, webpageFlags) {
        this.webpageId = webpageLoggingId;
        this.metaData = metaData;
        this.metaData_UpdateTrackers = metaData_UpdateTrackers;
        this.webpageFlags = webpageFlags;
    }
}
exports.WebpageState = WebpageState;
//# sourceMappingURL=Webpage.js.map