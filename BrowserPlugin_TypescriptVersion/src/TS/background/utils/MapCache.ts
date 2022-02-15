
export default class MapCache<k,v>{

    /**
     *  hostName -> pathName -> webpageLoggingId
     */
    cache: Map<k,v>;

    readonly _MAX_SIZE: number;
    readonly _CLEAR_SIZE: number;

    constructor(
        initialCache: Map<k,v> = new Map(),
        maxSize: number = 150, clearSize: number = 100
    ){
        this.cache = initialCache

        this._MAX_SIZE = maxSize
        this._CLEAR_SIZE = clearSize
    }

    get(key: k){
        return this.cache.get(key)
    }

    set(key: k , value: v){
        this.cache.set(key,value)
        if(this.cache.size == this._MAX_SIZE){
            this.clearSpace();
        }
    }

    has(key: k){
        return this.cache.has(key);
    }

    clearSpace(){
        let keysToRemove = Array.from(this.cache.keys()).slice(0, this._CLEAR_SIZE);     // drop 10% of layer1_cache (KeyValues added first)
        keysToRemove.forEach(
            keyToRemove => this.cache.delete(keyToRemove)
        );
    }

}

