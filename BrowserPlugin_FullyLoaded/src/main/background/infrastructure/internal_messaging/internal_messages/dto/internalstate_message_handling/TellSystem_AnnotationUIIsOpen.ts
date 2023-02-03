import BaseInternalMessageDto from "../../base_dto/BaseInternalMessageDto";
import {MessageType} from "../../base_dto/MessageType";

interface TellSystem_AnnotationUIIsOpen extends BaseInternalMessageDto {
}

export default function createTellSystem_AnnotationUIIsOpen(): TellSystem_AnnotationUIIsOpen {
    return {
        messageType: MessageType.TellSystem_AnnotationUIIsOpen,
    }
}