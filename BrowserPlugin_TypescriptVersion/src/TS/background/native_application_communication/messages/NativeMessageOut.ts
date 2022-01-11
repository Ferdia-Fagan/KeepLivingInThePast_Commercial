import {ResponseId} from "./Types";
import {MessageType} from "./values/MessageType";

export interface NativeMessageOut<T> {
    type: MessageType
    message: T
}

export interface NativeRequestOut<T>
        extends NativeMessageOut<T>{
    responseId?: number
}

export interface NativeMessageResponse {
    responseId: ResponseId,
    message: any
}


