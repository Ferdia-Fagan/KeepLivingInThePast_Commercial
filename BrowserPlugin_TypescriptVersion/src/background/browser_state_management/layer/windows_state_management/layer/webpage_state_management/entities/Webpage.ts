import UserAddedWebpageMetadata from "./metadata/UserAddedWebpageMetadata";
import {WebpageFlags} from "./metadata/WebpageFlags";
import {WebpageOptionalMeasurements} from "./metadata/WebpageOptionalMeasurements";

interface WebpageMetadata {

    metaData: UserAddedWebpageMetadata

}

export interface OperationalData {
    metaData_UpdateTrackers: WebpageOptionalMeasurements

    webpageFlags: WebpageFlags
}

export interface WebpageContracts
    extends WebpageMetadata,
        OperationalData {

    readonly webpageLoggingId: number

}

/**
 * Management extends entity
 */
export default abstract class Webpage
    implements WebpageContracts {
    readonly webpageLoggingId: number;

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
        this.webpageLoggingId = webpageLoggingId
        this.metaData = metaData
        this.metaData_UpdateTrackers = metaData_UpdateTrackers
        this.webpageFlags = webpageFlags
    }

}

