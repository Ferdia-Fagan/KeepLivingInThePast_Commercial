
import MapCache from "../../../../../utils/MapCache"
import {WebpageId} from "../entities/Types";
import {Webpage} from "../entities/Webpage";
import {WebpageStateContainer} from "../WebpageStateManagement";

type HostName = string
type PathName = string


export class WebpagesCache {

    URLCache: MapCache<[HostName, PathName], WebpageId> = new MapCache(1000, 200);

    constructor(){
        /**
         *  hostName -> pathName -> webpageLoggingId
         */
    }

    /**
     * 
     * @param {*} hostName 
     * @param {*} pathName 
     * @returns webPageLoggingId or null (if not cached)
     */
    getWebpageIdForURL(hostName: string, pathName: string): WebpageId{
        return this.URLCache.get([hostName, pathName]); // WebpageId
    }

    checkIfWebpageHasBeenCached = (hostName: string, pathName: string) =>
        this.URLCache.has([hostName, pathName])

    cacheURLWebpageId(hostName: string, pathName: string, webpageLoggingId: number){
        this.URLCache.set([hostName, pathName], webpageLoggingId)
    }

}

const webpageIdMap = new MapCache<WebpageId, WebpageStateContainer>(1000, 200)

export const getWebpageIdMap = () => webpageIdMap

const webpagesCache: WebpagesCache = new WebpagesCache()

export function getWebpagesCache(): WebpagesCache {
    return webpagesCache
}


