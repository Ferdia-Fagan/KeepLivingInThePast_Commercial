
import MapCache from "../../../../../../utils/MapCache"

const MAX_HOSTS = 100;
const MAX_PATHS = 100;

export class WebpagesCache {

    URLCachee: MapCache<string, MapCache<string, number>> = new MapCache(150,MAX_HOSTS);

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
    getWebpageLoggingIdForURL(hostName: string, pathName: string){
        if(this.URLCachee.has(hostName)){
            const hostMap = this.URLCachee.get(hostName);
            if(hostMap.has(pathName)){
                return hostMap.get(pathName);
            }else{
                return null;
            }
        }
        // TODO: hostname is not in cache
        // else{ 
        //     let newHostPathsCache = new MapCache<>(150,MAX_HOSTS);
        //     newHostPathsCache.set(pathName, );
        //     this.URLCachee.set(hostName, [
        //         [pathName,-1]
        //     ]))
        //     return null;
        // }
    }

    cacheeURLWebpageLoggingId(hostName: string, pathName: string, webpageLoggingId: number){
        this.URLCachee.get(hostName).set(pathName,webpageLoggingId);
    }

    // TODO: y?
    // _freeSpaceInCache(){
    //     let keysToRemove = Array.from(this.URLCachee.keys()).slice(0, 50);     // drop 10% of cache (KeyValues added first) 
    //     keysToRemove.forEach(keyToRemove => this.URLCachee.delete(keyToRemove));
    // }
} 



