import MapCache from "../../../utils/MapCache";
import { DBCache } from "../../abstract_object_store_parts/DBCache";
import BasicStoreWithKeyColumn from "../abstract_stores/BasicStoreWithKeyColumn";
import StoreObjectInterface from "../../abstract_store_object_parts/StoreObjectInterface";

interface Hostname extends StoreObjectInterface {
    id: number,
    hostname: string
}

export const autoAnnotatorHostnameCollection = new BasicStoreWithKeyColumn<Hostname>("", 1, "", "hostname");



// const ID = 'id';
// const KEY = 'key';

// class AutoAnnotatorCollection extends DBCache<string, Hostname> {
//     cache: MapCache<string, number>
//     constructor(DATABASE: string, DB_VERSION: number,STORE_NAME: string){
//         function onUpgradeNeededHandler(event: any){    // TODO: correct any
//             // This will set up the DS

//             var objectStore = event.currentTarget.result.createObjectStore(
//                 // STORE_NAME, { keyPath: 'bookmarkKey', autoIncrement: true });
//                 STORE_NAME, { keyPath: ID, autoIncrement: true });
      
//             objectStore.createIndex(KEY, KEY, { unique: true });
    
//         }

//         super(DATABASE, DB_VERSION,STORE_NAME,onUpgradeNeededHandler);

//         this.cache = new MapCache<string, number>(100,25);
//     }

//     addHostname(hostname: string){

//     }

//     checkHostnameExists(hostname: string){

//     }

//     getAllHostnames():Promise<Hostname[]>{
//         return this.getAll();
//     }

//     getHostnamesFromIds(hostnameIds: Array<number>): Promise<Hostname[]>{
//         var [tx,store] = super.getObjectStoreFromTransaction('readwrite');

//         var hostnamesFromIds:Array<Hostname> = [];
//         hostnameIds.forEach(hostnameId => {
//             let getHostnameById = store.get(hostnameId);
//             getHostnameById.onsuccess = function(hostname: any){   // TODO: correct any type
//                 hostnamesFromIds.push(hostname.target.result)
//             }
//         })

//         return new Promise((resolve, reject) => {
//             tx.oncomplete = function(event) {

//                 resolve(hostnamesFromIds)
//             }
//         });
//     }


// }
