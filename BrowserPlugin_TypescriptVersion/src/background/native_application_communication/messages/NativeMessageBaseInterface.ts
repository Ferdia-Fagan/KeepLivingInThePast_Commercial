import {MessageType} from "./values/MessageType";

export interface NativeMessageBaseInterface<T> {
    type: MessageType;
    responseId?: number;
    message: T;
}


