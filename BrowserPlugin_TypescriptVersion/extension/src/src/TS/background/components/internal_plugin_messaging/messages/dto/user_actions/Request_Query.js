"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createQuery = void 0;
const MessageType_1 = require("../../base_dto/MessageType");
function createQuery(queryString, tags, bookmarks, filterByToday, filterDates) {
    return {
        queryString,
        tags,
        bookmarks,
        filterByToday,
        filterDates
    };
}
exports.createQuery = createQuery;
function createRequest_Query(query) {
    return {
        messageType: MessageType_1.MessageType.RequestQuery,
        query: query
    };
}
exports.default = createRequest_Query;
//# sourceMappingURL=Request_Query.js.map