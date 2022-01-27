"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebpagesCache = void 0;
const MapCache_1 = __importDefault(require("../../../../../../utils/MapCache"));
const MAX_HOSTS = 100;
const MAX_PATHS = 100;
class WebpagesCache {
    constructor() {
        this.URLCachee = new MapCache_1.default(150, MAX_HOSTS);
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
    getWebpageLoggingIdForURL(hostName, pathName) {
        if (this.URLCache.has(hostName)) {
            const hostMap = this.URLCache.get(hostName);
            if (hostMap.has(pathName)) {
                return hostMap.get(pathName);
            }
            else {
                return null;
            }
        }
        // TODO: hostname is not in layer1_cache
        // else{ 
        //     let newHostPathsCache = new MapCache<>(150,MAX_HOSTS);
        //     newHostPathsCache.set(pathName, );
        //     this.URLCachee.set(hostName, [
        //         [pathName,-1]
        //     ]))
        //     return null;
        // }
    }
    cacheeURLWebpageLoggingId(hostName, pathName, webpageLoggingId) {
        this.URLCache.get(hostName).set(pathName, webpageLoggingId);
    }
}
exports.WebpagesCache = WebpagesCache;
//# sourceMappingURL=WebpagesCache.js.map