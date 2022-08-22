import {UnaryReport} from "../../../../browser_state_management_component/handlers/reporting/UnaryReport";
import {
    WebpageId
} from "../../../../browser_state_management_component/layers/layer2_webpage_state_management/entities/Types";
import {NonPersistedStoreObjectStub} from "../../../abstract/parts/layers/layer0_db/store_object/StoreObject_Dtos";
import {ID_TYPE} from "../../../abstract/parts/layers/layer0_db/store_object/StoreObject_Types";
import {TagId, TagName} from "./Types";

export default interface TagObject extends NonPersistedStoreObjectStub {
    id?: ID_TYPE,
    tag: TagName
}

export interface WebpageTagReportIdentifier {
    tagId: TagId,
    webpageId: WebpageId
}

export type WebpageTagReports = UnaryReport<WebpageTagReportIdentifier>