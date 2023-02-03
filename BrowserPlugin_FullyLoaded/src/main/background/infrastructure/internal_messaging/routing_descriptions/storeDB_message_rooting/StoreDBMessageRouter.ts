import {AutoAnnotatorMessageRouting} from "./routers/AutoAnnotatorMessageRouting";
import BookmarkMessageRouting from "./routers/BookmarkMessageRouting";
import TagMessageRouting from "./routers/TagMessageRouting";

export default interface StoreDBMessageRouter
    extends AutoAnnotatorMessageRouting,
        BookmarkMessageRouting,
        TagMessageRouting {}