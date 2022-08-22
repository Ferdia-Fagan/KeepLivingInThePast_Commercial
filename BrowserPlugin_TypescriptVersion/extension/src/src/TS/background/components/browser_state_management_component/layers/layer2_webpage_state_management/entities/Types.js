"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWebpageHostnameAndPathnameFromUrl = void 0;
function getWebpageHostnameAndPathnameFromUrl(url) {
    const theUrl = new URL(url);
    return {
        hostname: theUrl.hostname,
        pathname: theUrl.pathname
    };
}
exports.getWebpageHostnameAndPathnameFromUrl = getWebpageHostnameAndPathnameFromUrl;
//# sourceMappingURL=Types.js.map