"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_Query_Request = void 0;
const MessageType_1 = require("../../values/MessageType");
function create_Query_Request(responseId, filterDates, filterByToday, tags, bookmarks, query) {
    return {
        type: MessageType_1.MessageType.Request_Query,
        responseId: responseId,
        message: {
            filterDates: filterDates,
            filterByToday: filterByToday,
            tags: tags,
            bookmarks: bookmarks,
            query: query,
        }
    };
}
exports.create_Query_Request = create_Query_Request;
//# sourceMappingURL=Query.js.map