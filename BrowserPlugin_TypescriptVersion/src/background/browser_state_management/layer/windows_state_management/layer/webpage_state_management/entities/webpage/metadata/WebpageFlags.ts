export interface WebpageFlags {
    isIndexed?: boolean
    // isTagged: boolean

    isPaused?: boolean  // TODO: should these be put into folder local interfaces and then inherited.

    updated: boolean

    totalVisitCount_updated?: boolean;
    totalVisitTime_updated? :boolean;
}

export function createWebpageFlags(
    updated: boolean,
    isIndexed?: boolean,
    isPaused?: boolean
){
    return {
        updated,
        isIndexed,
        isPaused
    }
}