import Webpage from "../entities/webpage/Webpage";

export default interface WebpageTotalVisitTimeStateManagementInterface
    extends Webpage {
    logWebpageVisitTime?(currentTimeStamp: number): void
    logWebpageLeaveTime?(currentTimeStamp: number): void
}



