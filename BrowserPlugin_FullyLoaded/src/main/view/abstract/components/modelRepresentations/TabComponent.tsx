/**
 * individual tab tile
 */
import {Component, ComponentChild, RenderableProps} from "preact";
import {TabM} from "../../../../../domainModel/system/browser/models/TabM";
import "./css/TabComponent.css"

interface TabComponentProps {
    tabModel: TabM
}

interface TabComponentData {
    tab: TabM
}

export class TabComponent extends Component<TabComponentProps, TabComponentData> {

    constructor(props: TabComponentProps) {
        super(props);

        this.state = {
            tab: props.tabModel
        }

    }

    onHover(e) {

    }

    onMouseDown(e: any) {

    }

    dragStart(e: any) {

    }

    dragStop(e: any) {

    }

    dragOut() {

    }

    drop(e: any) {

    }

    render(props: RenderableProps<any> | undefined, state: Readonly<any> | undefined, context: any): ComponentChild {
        console.log("reach here : tabb component: " + this.state.tab.toString())
        return (
            <div
                id={"tab-"}
                key={"tab-"}
                className={"tab"}
            >
                <span>{this.state.tab.currentWebpage.title.toString()}</span>
            </div>
        )
        // var children = [];
        // // if (this.props.layout == "vertical") {
        // children.push(
        //     <div
        //         key={"tab-pinned-" + this.props.tab.id}
        //         className={"tab-pinned " + (!this.props.tab.pinned ? "hidden" : "")}
        //     >
        //         Pinned
        //     </div>
        // );
        // children.push(
        //     <div
        //         key={"tab-highlighted-" + this.props.tab.id}
        //         className={"tab-highlighted " + (!this.props.tab.highlighted ? "hidden" : "")}
        //     >
        //         Active
        //     </div>
        // );
        // children.push(
        //     <div
        //         key={"tab-selected-" + this.props.tab.id}
        //         className={"tab-selected " + (!this.props.selected ? "hidden" : "")}
        //     >
        //         Selected
        //     </div>
        // );
        // children.push(
        //     <div
        //         key={"tab-icon-" + this.props.tab.id}
        //         className="iconoverlay "
        //         style={{
        //             backgroundImage: this.state.favIcon
        //         }}
        //     />
        // );
        // children.push(
        //     <div key={"tab-title-" + this.props.tab.id} className="tabtitle">
        //     {this.props.tab.title}
        //     </div>
        // );
        // // }
        //
        // var tabDom = {
        //     className:
        //         "icon tab " +
        //         (this.props.selected ? "selected " : "") +
        //         (this.props.tab.pinned ? "pinned " : "") +
        //         (this.props.tab.highlighted ? "highlighted " : "") +
        //         (this.props.hidden ? "hidden " : "") +
        //         ((this.props.tab.mutedInfo && this.props.tab.mutedInfo.muted) ? "muted " : "") +
        //         (this.props.tab.audible ? "audible " : "") +
        //         (this.props.tab.discarded ? "discarded " : "") +
        //         // (this.props.layout == "vertical" ? "full " : "") +
        //         (this.props.tab.incognito ? "incognito " : "") +
        //         (this.state.draggingOver || "") +
        //         (this.props["searchActive"] ? "search-active " : "") +
        //         " tab-" +
        //         this.props.tab.id,
        //         // " " +
        //         // (this.props.layout == "vertical" ? "vertical " : "blocks "),
        //     style:
        //         { backgroundImage: "" }
        //         // (this.props.layout == "vertical"
        //         //         ? { }
        //         //         : { backgroundImage: this.state.favIcon }
        //         // )
        //     ,
        //     id: this.props.id,
        //     title: this.props.tab.title,
        //     onClick: this.click,
        //     onMouseDown: this.onMouseDown,
        //     onMouseEnter: this.onHover
        // };
        //
        // if (!!this.props.drag) {
        //     tabDom["onDragStart"] = this.dragStart;
        //     tabDom["onDragOver"] = this.dragOver;
        //     tabDom["onDragLeave"] = this.dragOut;
        //     tabDom["onDrop"] = this.drop;
        //     tabDom["draggable"] = "true";
        // }
        //
        // return (
        //     <div {...tabDom}>
        //     {children}
        //     <div className="limiter" />
        //     </div>
        // );
    }

}



















