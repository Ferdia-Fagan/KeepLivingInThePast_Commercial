import {
    WebpageDto
} from "../../../../native_application_communication/messages/message/webpage/Command_LogWebpageVisit";
import UserAddedWebpageMetadata from "./metadata/UserAddedWebpageMetadata";
import {WebpageFlags} from "./metadata/WebpageFlags";
import {WebpageOptionalMeasurements} from "./metadata/WebpageOptionalMeasurements";

/**
 * @description
 * Can be used as data transfer from return results
 * from native application request.
 * To be then converted to an implementation of management.
 */
export interface Webpage
    extends WebpageState {

    readonly webpageId: number

    metaData: UserAddedWebpageMetadata
    metaData_UpdateTrackers: WebpageOptionalMeasurements

    webpageFlags: WebpageFlags
}


/**
 * Management extends entity.
 * This is to be extended by implementations of management
 */
export abstract class WebpageState
    implements Webpage {

    readonly webpageId: number;

    // Webpage Metadata
    metaData: UserAddedWebpageMetadata;
    // Operational Data
    metaData_UpdateTrackers: WebpageOptionalMeasurements;
    webpageFlags: WebpageFlags;

    constructor(
        webpageLoggingId: number,

        metaData: UserAddedWebpageMetadata,

        metaData_UpdateTrackers: WebpageOptionalMeasurements, webpageFlags: WebpageFlags
    ) {
        this.webpageId = webpageLoggingId
        this.metaData = metaData
        this.metaData_UpdateTrackers = metaData_UpdateTrackers
        this.webpageFlags = webpageFlags
    }

}

