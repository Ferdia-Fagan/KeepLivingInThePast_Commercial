import {Component, ComponentChild, RenderableProps} from "preact";
import {debug} from "util";
import browser, {Runtime} from "webextension-polyfill";
import {BrowserM} from "../../../../../domainModel/system/browser/models/BrowserM";
import {WindowM} from "../../../../../domainModel/system/browser/models/WindowM";
import {BrowserStateDto} from "../../../../../infrastructure/internalMessages/BrowserStateDto";
import {InternalMessageDto, MessageType} from "../../../../../infrastructure/internalMessages/InternalMessageDto";

import "./css/BrowserComponent.css"
import {WindowComponent} from "./WindowComponent";

interface BrowserComponentProps {
    browserModel: BrowserM
}

interface BrowserComponentState {
    browserModel: BrowserM
}

export class BrowserComponent extends Component<BrowserComponentProps, BrowserComponentState> {

    constructor(props: BrowserComponentProps) {
        super(props);
        // const tab1 = new TabM(1,1)
        // const tab2 = new TabM(2,1)
        // const tab3 = new TabM(3,1)
        //
        // console.log("reached here")
        // const tabs = new Map([
        //     [tab1.id, tab1],
        //     [tab2.id, tab2],
        //     [tab3.id, tab3]
        // ])
        //
        // const window1 = new WindowM(
        //     1,
        //     tabs,
        //     tab1
        // )
        // console.log("constructing 0 : browser component " + window1.tabs.size)
        //
        // props.browserModel.windows = new Map([
        //     [window1.windowId, window1]
        // ])

        // console.log("constructing 1 : browser component " + props.browserModel.windows.get(1).toString())

        this.state = {
            browserModel: props.browserModel
        }
        // console.log("constructing 2 : browser component " + JSON.stringify(this.state.browserModel.windows.get(1)))

        console.log("herjiohewojilrhwejfldnf")
        browser.runtime.sendMessage(new InternalMessageDto(MessageType.REQUEST_BROWSER_STATE))
            .then(this.setBrowserState.bind(this))

        // browser.runtime.onMessage.addListener((message: InternalMessageDto<any>, sender: MessageSender) => {
        //     console.log("sidebar received message " + message.toString())
        //     if(message.messageType == MessageType.BROWSER_STATE) {
        //         this.setBrowserState(message.message)
        //     }
        // })
    }

    setBrowserState(message: BrowserStateDto){
        debugger
        console.log("setBrowserState:" + JSON.stringify(message))
        debugger
        this.setState({
            browserModel: message.browser
        })
    }

    render(props: RenderableProps<any> | undefined, state: Readonly<any> | undefined, context: any): ComponentChild {
        // console.log("reach here 1 : browser component " + this.state.browserModel.windows.get(1).toString())
        return (
            <div
                id="root"
            >
                <h1>Browser Component</h1>
                <div
                    className={"browser-ui-container"}
                    id={"browser-ui-container"}
                    class={"browser-ui-container"}
                >
                    {
                        [...this.state.browserModel.windows.values()].map((window: WindowM) => {
                            console.log("reach here 2 : browser component " + JSON.stringify(window))
                            return (
                                <WindowComponent
                                    key={"window-container-" + window.windowId}
                                    windowModel={window}
                                >

                                </WindowComponent>
                            )
                        })
                    }
                </div>
            </div>
        )
    }

}









