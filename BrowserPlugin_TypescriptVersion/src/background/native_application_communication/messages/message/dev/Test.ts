import {NativeMessageBaseInterface} from "../../NativeMessageBaseInterface";
import {MessageType} from "../../values/MessageType";

type test = string

export function Create_Test_Message(): NativeMessageBaseInterface<test>{
    return {
        type: MessageType.Test,
        message: ""
    }
}


