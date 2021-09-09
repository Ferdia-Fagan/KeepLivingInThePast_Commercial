import {NativeMessage, Create_NativeMessage} from "../NativeMessage";


export interface WebpageScrapings {
    webpageLoggingId: number;
    title: string; 
    url: string;
    imgUrl:string;
    scrapings:string;
}

export function Create_WebpageScrapings_Message(webpageLoggingId: number,title: string,
                                        url: string, imgUrl: string, 
                                        scrapings: string): NativeMessage {

    const webpageScrapingsMessage: WebpageScrapings = {
        webpageLoggingId: webpageLoggingId,
        title: title, 
        url: url,
        imgUrl: imgUrl,
        scrapings: scrapings
    };
    return Create_NativeMessage("SaveWebScrapings", webpageScrapingsMessage);
}

