import {NativeMessageOut} from "../../NativeMessageOut";
import {MessageType} from "../../values/MessageType";


export interface TellSystem_WebpageScrapings {
    webpageLoggingId: number;
    title: string; 
    url: string;
    imgUrl:string;
    scrapings:string;
}

export function create_TellSystem_WebpageScrapings(
    webpageScrapings: TellSystem_WebpageScrapings
): NativeMessageOut<TellSystem_WebpageScrapings> {
    return {
        type: MessageType.Save_WebScrapings,
        messageData: webpageScrapings
    }
}

