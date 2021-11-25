// import DBCollection from "../DBCollection";
// import {DBWithCache,IndexStore} from "../abstract_object_store_parts/DBWithCache";
// import MapCache from "../../utils/MapCache";

// interface BookmarkAddedReportCollection {
//     parentId: number;
//     webpageLoggingId: number;
// }
//
// type bookmarkId = number;
// type newParentId = number;
//
// type bookmarkUID = string;

// type Bookmark_Key_Cache = MapCache<bookmarkUID, number>

// enum BookmarkType {
//     BookmarkFolder,
//     BookmarkWebpage
// }

// interface Bookmark extends IndexStore {
//     id?: number,
//     key: string,
//     bookmarkType: BookmarkType,
//     parentId: number,
//     webpageLoggingId?: number
// }

// const BOOKMARK_KEY = "bookmarkKey";
// const PARENT_ID = "parentId";

class BookmarksCollection extends DBWithCache<string, Bookmark> {
    
    cache: MapCache<string,number>;

    private bookmarksAddedReport: Map<bookmarkId, BookmarkAddedReportCollection>;
    private bookmarksMovedReport: Map<bookmarkId,newParentId>;
    private bookmarksDeletedReport: Set<bookmarkId>;

    constructor(DATABASE: string, DB_VERSION: number,STORE_NAME: string){
        function createDatabase(event: any){    // TODO: change
            // This will set up the DS

            var objectStore = event.currentTarget.result.createObjectStore(
                // STORE_NAME, { keyPath: 'bookmarkKey', autoIncrement: true });
                STORE_NAME, { keyPath: 'id', autoIncrement: true });
      
            objectStore.createIndex(BOOKMARK_KEY, BOOKMARK_KEY, { unique: true });
            objectStore.createIndex(PARENT_ID, PARENT_ID, { unique: false });
    
        }

        super(DATABASE, DB_VERSION,STORE_NAME,createDatabase);

        this.cache = new MapCache<bookmarkUID, number>(100,50);

        // this.BOOKMARK_KEY_CACHE = new Map()
        /**
         *  bookmarkKey -> bookmarkId
         */

        /**
         * Keeps track of updates from the 
         */
        this.bookmarksAddedReport = new Map<bookmarkId, BookmarkAddedReportCollection>();
        this.bookmarksMovedReport = new Map<bookmarkId,newParentId>();
        this.bookmarksDeletedReport = new Set<bookmarkId>();
    }

    checkIfHasUpdateReport(){ // TODO: THIS IS A HACK FOR THE BETA
        if(this.bookmarksAddedReport.size !== 0 || this.bookmarksMovedReport.size !== 0 || this.bookmarksDeletedReport.size !== 0){
            return true;
        }
        return false;
    }
    
    /**
     * @description
     * Extract update report to be used to send to native application to update bookmarks.
     * 
     * @param {*} willClear -> if true, cleares the update report (this is default for production. False should only be used for dev mode) 
     * @returns
     */
    getUpdateReport(willClear: boolean = true){ // TODO: getUpdateReport function -> make this an class
            let updateReport = {}
            
            // if(this.bookmarksAddedReport.size !== 0){
            //     let bookmarksAddedReportArray = Array.from(this.bookmarksAddedReport);
            //     if(willClear){
            //         this.bookmarksAddedReport = new Map();
            //     }
    
            //     for(var i = 0; i < bookmarksAddedReportArray.length; i++){
            //         bookmarksAddedReportArray[i] = [].concat.apply([], bookmarksAddedReportArray[i])
            //     }
            //     updateReport.bookmarksAddedReport = bookmarksAddedReportArray
    
            // }
            // if(this.bookmarksMovedReport.size !== 0){
            //     updateReport.bookmarksMovedReport = Array.from(this.bookmarksMovedReport);
            //     if(willClear){
            //         this.bookmarksMovedReport = new Map();
            //     }
    
            // }
            // if(this.bookmarksDeletedReport.size !== 0){
            //     updateReport.bookmarksDeletedReport = Array.from(this.bookmarksDeletedReport);
            //     if(willClear){
            //         this.bookmarksDeletedReport = new Map();
            //     }
    
            // }
            
            // return updateReport;
    }

    /**
     * @description
     * Used to check if bookmarks is in the root folder of chosen folder within bookmarks
     * 
     * @param {*} bookmarkKey 
     * @returns
     */
    async checkIfBookmarkIsWatched(bookmarkKey: string): Promise<number>{
        if(bookmarkKey === "toolbar_____" || bookmarkKey === "unfiled_____"){
            return null;
        }
        
        // return false;
        var bookmarkId = null;
        if(this.cache.has(bookmarkKey)){

            bookmarkId = this.cache.get(bookmarkKey);
            return bookmarkId;
        }else{
            const bookmarkIdReq = this.getIdOfBookmarkKey(bookmarkKey);
    
            return bookmarkIdReq;
        }
    }


    // -------------------------------------------------------------------------------

    addBookmark(bookmarkType: BookmarkType, bookmarkKey: string, parentId: number, 
        webpageLoggingId?: number): void{

        const newBookmarkToAdd: Bookmark = {
            key: bookmarkKey,
            bookmarkType,
            parentId,
            webpageLoggingId
        }

        super.addObject(newBookmarkToAdd);

    }

    async getIdOfBookmarkKey(bookmarkKey: string): Promise<number>{
        return super.getIdFromKey(bookmarkKey);
    }

    deleteBookmark(bookmarkKey: IDBValidKey){

    }

    moveBookmark(bookmarkKey: IDBValidKey, newParentBookmarkKey: IDBValidKey){

    }

    async getBookmarkIds(bookmarkKeys: Array<IDBValidKey>){

    }


}


