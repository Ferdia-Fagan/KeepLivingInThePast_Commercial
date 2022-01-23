import UserAddedWebpageMetadata from "./metadata/UserAddedWebpageMetadata";
import {WebpageFlags} from "./metadata/WebpageFlags";
import {WebpageOptionalMeasurements} from "./metadata/WebpageOptionalMeasurements";

// interface WebpageMetadata {
//     metaData: UserAddedWebpageMetadata
// }
//
// export interface OperationalData {
//     metaData_UpdateTrackers: WebpageOptionalMeasurements
//
//     webpageFlags: WebpageFlags
// }
//
// export interface WebpageDataContracts
//     extends WebpageMetadata,
//             OperationalData {
//
//     readonly webpageLoggingId: number
//
// }

// interface WebpageOperationActions
//     extends FocusCheckUserBrowserControllerInterface{
//
// }
//
// interface WebpageUserActions {
//
// }

export interface Webpage
    extends WebpageState {
    readonly webpageLoggingId: number

    metaData: UserAddedWebpageMetadata
    metaData_UpdateTrackers: WebpageOptionalMeasurements

    webpageFlags: WebpageFlags

}

/**
 * Management extends entity
 */
export abstract class WebpageState implements Webpage {
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

