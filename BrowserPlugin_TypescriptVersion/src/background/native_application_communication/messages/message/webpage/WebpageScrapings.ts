import {NativeMessageBaseInterface} from "../../NativeMessageBaseInterface";
import {MessageType} from "../../values/MessageType";


export interface WebpageScrapings {
    webpageLoggingId: number;
    title: string; 
    url: string;
    imgUrl:string;
    scrapings:string;
}

export function create_WebpageScrapings_Message(
    webpageLoggingId: number,title: string,
    url: string, imgUrl: string,
    scrapings: string
): NativeMessageBaseInterface<WebpageScrapings> {
    return {
        type: MessageType.Save_WebScrapings,
        message: {
            webpageLoggingId: webpageLoggingId,
            title: title,
            url: url,
            imgUrl: imgUrl,
            scrapings: scrapings
        }
    }
}

