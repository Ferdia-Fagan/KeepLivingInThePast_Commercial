import {BookmarkId} from "../../../../../../datastores/stores/bookmarks/values/Types";
import {UnaryReport} from "../../../../../handlers/reporting/UnaryReport";
import {TagId} from "../../../../../../datastores/stores/tags/Types";
import Webpage from "../entities/Webpage";

export default interface WebpageMetaDataStateManagementInterface
    extends Webpage {
    addWebpageBookmark?(parentBookmarkId: number): void
    removeWebpageBookmark?(parentBookmarkId: number): void
    getWebpageBookmarks?(): Set<BookmarkId>
    // removeWebpageBookmark()  TODO: complete

    addTags(tagIds: Set<TagId>): void
    removeTags(tagIds: Set<TagId>): void
    getTags?(): Set<TagId>

    markAsIndexed?(): void

}

