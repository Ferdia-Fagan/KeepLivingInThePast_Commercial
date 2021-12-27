import {NativeMessageBaseInterface} from "../../NativeMessageBaseInterface";
import {MessageType} from "../../values/MessageType";

export interface TrackedHostnameAdded {
    hostnameId: number,
    hostname: string
}

interface AddTrackedHostnamesReport {
    TrackedHostnamesAdded: TrackedHostnameAdded[]
}

export function create_AddTrackedHostnamesReport_Message(
    TrackedHostnamesAdded: TrackedHostnameAdded[]
): NativeMessageBaseInterface<AddTrackedHostnamesReport> {
    return {
        type: MessageType.Save_AddedTrackedHostnamesReport,
        message: {
            TrackedHostnamesAdded
        }
    }
}
















