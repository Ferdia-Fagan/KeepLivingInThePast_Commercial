const browser = require("webextension-polyfill");

const webpageMetadataParser = require("page-metadata-parser");

import TellSystem_WebpageScrapings from "../background/components/internal_plugin_messaging_component/internal_messages/dto/webpage_scraping/TellSystem_WebpageScrapings"

console.log("WebpageExtrractionLayer has been imported")

/**
 * This will listen for internal_messages from the background scripts
 */
browser.runtime.onMessage.addListener((request: any) => {
    if(request.messageType == "askForTitle"){
        console.log("current page being asked for title")

        return Promise.resolve(document.title);
    }
    else if(request.messageType == "askForScrapings"){

        console.log("The page is being asked to scrape")
        
        let webpageMetadata = getWebpageMetadata();

        webpageMetadata.webpageScrapings = ScrapeWebPage();
        
        return Promise.resolve(webpageMetadata);
    }
    return Promise.resolve({});
});

function getWebpageMetadata(): TellSystem_WebpageScrapings{
    const metadata = webpageMetadataParser.getMetadata(document, window.location)
    const webpageScrapings: TellSystem_WebpageScrapings = {
        "title": metadata.title,
        "webpageUrl": encodeURI(metadata.url),
        "webpageImgUrl": ((metadata.image !== undefined)? 
                                encodeURI(metadata.image):((metadata.icon !== undefined)? encodeURI(metadata.icon) : null))
    }
    return webpageScrapings;
    // const webpageTitle = encodeURIComponent(metadata.title);
    
    // const webpageImageUrl = ((metadata.image !== undefined)? encodeURI(metadata.image):((metadata.icon !== undefined)? encodeURI(metadata.icon) : null));

    // const webpageUrl = encodeURI(metadata.url); //TODO: I DONT KNOW IF CANONICAL URL IS BETTER. i THINK IT IS. SHOULD BE REPLACED

    // return {title:webpageTitle, url: webpageUrl, imgUrl: webpageImageUrl}
}

/**
 * @description
 * scrapes the web page of 
 * @returns 
 * html body text
 */
function ScrapeWebPage(){
    return document.body.innerText.trim().replace(/[^a-zA-Z ]/g, " ").replace(/\s\s+/g, ' ');   // remove letters, then remove all spacing
}