import {render} from "preact";
import browser, {Runtime} from "webextension-polyfill";
import {BrowserManager, createBrowserManager} from "../../../domainLogic/BrowserManager";
import {BrowserM} from "../../../domainModel/system/browser/models/BrowserM";
import {BrowserStateDto} from "../../../infrastructure/internalMessages/BrowserStateDto";
import {InternalMessageDto, MessageType} from "../../../infrastructure/internalMessages/InternalMessageDto";
import {BrowserComponent} from "../../abstract/ui/components/modelRepresentations/BrowserComponent";
import MessageSender = Runtime.MessageSender;

let browserManagerInstance: undefined | BrowserManager

async function loadPopUp() {

    // browserManagerInstance = await createBrowserManager() as BrowserManager
    browserManagerInstance = new BrowserManager(new BrowserM())

    document.documentElement.style.maxHeight = "auto";
    document.documentElement.style.maxWidth = "auto";
    document.body.style.maxHeight = "auto";
    document.body.style.maxWidth = "auto";
    document.documentElement.style.maxHeight = "100%"
    document.documentElement.style.maxWidth = "100%"
    document.documentElement.style.height = "100%"
    document.documentElement.style.width = "500px"
    document.body.style.maxHeight = "100%"
    document.body.style.maxWidth = "100%"
    document.body.style.height = "100%"
    document.body.style.width = "100%"

    window.document.getElementById('sidebar').style.width = "400px";

    render(
        <BrowserComponent
            browserModel={browserManagerInstance.browser}
        />,
        document.getElementById("sidebar")
    )
}
loadPopUp()