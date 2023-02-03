import {render} from "preact";
import {BrowserManager, BrowserManagerT, createBrowserManager} from "../../../domainLogic/BrowserManager";
import App from "../popup/components/App";
import {BrowserComponent} from "../../abstract/ui/components/modelRepresentations/BrowserComponent";

let browserManagerInstance: undefined | BrowserManager

async function loadPopUp() {

    browserManagerInstance = await createBrowserManager() as BrowserManager

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

