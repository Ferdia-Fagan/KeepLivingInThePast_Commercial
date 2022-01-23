import {NativeMessageOut} from "../../NativeMessageOut";
import {MessageType} from "../../values/MessageType";

export interface TrackedHostnameAdded {
    hostnameId: number,
    hostname: string
}

interface TellSystem_AddTrackedHostnamesReport {
    TrackedHostnamesAdded: TrackedHostnameAdded[]
}

export function create_TellSystem_AddTrackedHostnamesReport (
    TrackedHostnamesAdded: TrackedHostnameAdded[]
): NativeMessageOut<TellSystem_AddTrackedHostnamesReport> {
    return {
        type: MessageType.Save_AddedTrackedHostnamesReport,
        messageData: {
            TrackedHostnamesAdded
        }
    }
}
















