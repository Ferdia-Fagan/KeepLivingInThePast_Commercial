"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWebpagesCache = exports.getWebpageIdMap = exports.WebpagesCache = void 0;
const MapCache_1 = __importDefault(require("../../../../../utils/MapCache"));
class WebpagesCache {
    constructor() {
        this.URLCache = new MapCache_1.default(1000, 200);
        this.checkIfWebpageHasBeenCached = (hostName, pathName) => this.URLCache.has([hostName, pathName]);
        /**
         *  hostName -> pathName -> webpageLoggingId
         */
    }
    /**
     *
     * @param {*} hostName
     * @param {*} pathName
     * @returns webPageLoggingId or null (if not cached)
     */
    getWebpageIdForURL(hostName, pathName) {
        return this.URLCache.get([hostName, pathName]); // WebpageId
    }
    cacheURLWebpageId(hostName, pathName, webpageLoggingId) {
        this.URLCache.set([hostName, pathName], webpageLoggingId);
    }
}
exports.WebpagesCache = WebpagesCache;
const webpageIdMap = new MapCache_1.default(1000, 200);
const getWebpageIdMap = () => webpageIdMap;
exports.getWebpageIdMap = getWebpageIdMap;
const webpagesCache = new WebpagesCache();
function getWebpagesCache() {
    return webpagesCache;
}
exports.getWebpagesCache = getWebpagesCache;
//# sourceMappingURL=WebpagesCache.js.map