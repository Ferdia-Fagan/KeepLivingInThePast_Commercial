import Webpage from "../entities/Webpage";

export default interface WebpageFocusStateManagementInterface
    extends Webpage {
    focus?(currentTimeStamp: number): void
    unFocus?(currentTimeStamp: number): void
}



