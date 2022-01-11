import {NativeMessageOut} from "../../NativeMessageOut";
import {MessageType} from "../../values/MessageType";

type test = string

export function Create_Test_Message(): NativeMessageOut<test>{
    return {
        type: MessageType.Test,
        message: ""
    }
}


