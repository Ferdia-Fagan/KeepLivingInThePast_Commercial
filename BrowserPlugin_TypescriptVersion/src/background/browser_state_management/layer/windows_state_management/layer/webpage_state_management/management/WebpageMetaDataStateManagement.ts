import Webpage from "../entities/Webpage";

export default interface WebpageTotalVisitTimeStateManagementInterface
    extends Webpage {
    logWebpageVisitTime?(currentTimeStamp: number): void
    logWebpageLeaveTime?(currentTimeStamp: number): void
}



