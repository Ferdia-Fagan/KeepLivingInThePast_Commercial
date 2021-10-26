export default interface WebpageMetaData {
    tags?: Set<number>;

    totalVisitCount? : number;
    totalVisitTime? : number;
    parentBookmarkId?: number;
    
}