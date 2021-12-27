import Webpage from "../entities/webpage/Webpage";

export default interface WebpageFocusStateManagementInterface
    extends Webpage {
    focus?(currentTimeStamp: number): void
    unFocus?(currentTimeStamp: number): void
}



