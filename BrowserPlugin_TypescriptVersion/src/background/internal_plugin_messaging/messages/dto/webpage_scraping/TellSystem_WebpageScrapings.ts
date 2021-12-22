import BaseInternalMessageDto from "../../base_dto/BaseInternalMessageDto";
import {MessageType} from "../../base_dto/MessageType";


export interface TellSystem_WebpageScrapings extends BaseInternalMessageDto {
    title: string,
    webpageUrl: string,
    webpageImgUrl: string,
    webpageScrapings?: string
}

export default function createTellSystem_WebpageScrapings(
    title: string,
    webpageUrl: string,
    webpageImgUrl: string,
    webpageScrapings?: string
): TellSystem_WebpageScrapings {
    return {
        messageType: MessageType.CommandWithResponse_AddNewTags,

        title,
        webpageUrl,
        webpageImgUrl,
        webpageScrapings
    }
}
