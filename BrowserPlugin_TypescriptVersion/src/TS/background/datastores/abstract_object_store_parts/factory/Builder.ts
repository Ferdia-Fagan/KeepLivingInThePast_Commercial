import {IndexObject} from "../../store_objects_interfaces/base_store_objects/IndexObject";
import {DBWithCache} from "../layers/cache/DBWithCache";
import DBWithCacheWithReportingBuilderInterface from "./DBWithCacheWithReportingBuilderInterface";
import DB from "../layers/db/DB";
import {DBWithCacheWithReporting} from "../layers/reporting/DBWithCacheWithReporting";

async function builder<
    STORE_T extends IndexObject,
    KEY_T extends IDBValidKey,
    T extends DBWithCacheWithReporting<STORE_T, KEY_T>
    >(DATABASE: string, DB_VERSION: number,STORE_NAME: string,
      createDBStore: ((event: any) => void),
      objectConstructor: {},
      objectToBuild: DBWithCacheWithReportingBuilderInterface<STORE_T, KEY_T>): Promise<T>{

    var createDB: IDBDatabase = await new Promise<IDBDatabase>((resolve,reject) => {
        var openDBReq = indexedDB.open(DATABASE, DB_VERSION);

        openDBReq.onsuccess = function (evt: any){
            resolve(evt.target.result)
        }

        openDBReq.onerror = function (evt) {
            console.error("openDb:", "db request fail");
        }
        openDBReq.onupgradeneeded = createDBStore
    });

    return new objectToBuild(STORE_NAME, createDB) as T;
}

// async function buildDBWithCach{
//
// }