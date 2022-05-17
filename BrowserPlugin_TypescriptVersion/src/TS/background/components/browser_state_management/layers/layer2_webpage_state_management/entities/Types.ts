import {
    ID_TYPE
} from "../../../../datastores/parts/abstract_object_store_parts/layers/layer0_db/store_object/StoreObject_Types";


export type WebpageId = ID_TYPE

export type WebpageUrl = string
export interface WebpageIdentifier {
    hostname: Hostname
    pathname: Pathname
}
export function getWebpageHostnameAndPathnameFromUrl(url: WebpageUrl): WebpageIdentifier {
    const theUrl = new URL(url)
    return {
        hostname: theUrl.hostname,
        pathname: theUrl.pathname
    }
}

export type Hostname = String
export type Pathname = String
