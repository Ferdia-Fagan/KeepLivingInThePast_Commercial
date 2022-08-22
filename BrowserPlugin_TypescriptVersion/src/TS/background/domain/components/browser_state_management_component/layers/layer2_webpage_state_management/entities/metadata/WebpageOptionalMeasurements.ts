export interface WebpageOptionalMeasurements {
    lastLogTime: number

    totalVisitCount?: number
    totalVisitTime?: number
    lastLoggedActiveTime?: number
}

export function createWebpageOptionalMeasurements(
    lastLogTime: number,

    totalVisitCount?: number,
    totalVisitTime?: number,
    lastLoggedActiveTime?: number
) {
    return {
        lastLogTime,
        totalVisitCount,
        totalVisitTime,
        lastLoggedActiveTime
    }
}