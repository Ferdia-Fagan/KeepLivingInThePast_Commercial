import {h, Component, ComponentChild, RenderableProps} from 'preact';
import LayoutGrid from 'preact-material-components/LayoutGrid';
import 'preact-material-components/LayoutGrid/style.css';
import {TabM} from "../../../../../domainModel/system/browser/models/TabM";
import {WindowM} from "../../../../../domainModel/system/browser/models/WindowM";
import {TabComponent} from "./TabComponent";


interface WindowComponentProps {
    windowModel: WindowM
}

interface WindowComponentState {
    // windowModel: WindowM
    tabs: Map<number, TabM>
}

// const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
// }))

export class WindowComponent extends Component<WindowComponentProps, WindowComponentState> {

    constructor(props: WindowComponentProps) {
        super(props);

        this.state = {
            tabs: props.windowModel.tabs
        }
    }

    render(props: RenderableProps<any> | undefined, state: Readonly<any> | undefined, context: any): ComponentChild {
        console.log("reach here : window component 0 " + this.state.tabs.size)
        return (
            <div
                id={"window-" + this.props.windowModel.windowId}
                key={"window-" + this.props.windowModel.windowId}
                className={"window"}
            >
                <span>Window</span>
                <div>
                    <LayoutGrid>
                        <LayoutGrid.Inner>
                            {/* <LayoutGrid.Cell cols={1}>1</LayoutGrid.Cell> */}
                            {/* <LayoutGrid.Cell cols={2}> */}
                            {/*     <LayoutGrid.Inner> */}
                            {/*         <LayoutGrid.Cell cols={1}>1</LayoutGrid.Cell> */}
                            {/*         <LayoutGrid.Cell cols={1}>2</LayoutGrid.Cell> */}
                            {/*     </LayoutGrid.Inner> */}
                            {/* </LayoutGrid.Cell> */}
                            {/* <LayoutGrid.Cell cols={1}>3</LayoutGrid.Cell> */}
                            {/* <LayoutGrid.Cell cols={2}>4</LayoutGrid.Cell> */}
                            {/* <LayoutGrid.Cell cols={1}>5</LayoutGrid.Cell> */}
                            {/* <LayoutGrid.Cell cols={2}>6</LayoutGrid.Cell> */}
                            {/* <LayoutGrid.Cell cols={1}>1</LayoutGrid.Cell> */}
                            {/* <LayoutGrid.Cell cols={1}>2</LayoutGrid.Cell> */}
                            {/* <LayoutGrid.Cell cols={1}>3</LayoutGrid.Cell> */}
                            {/* <LayoutGrid.Cell cols={1}>4</LayoutGrid.Cell> */}
                            {/* <LayoutGrid.Cell cols={1}>5</LayoutGrid.Cell> */}
                            {/* <LayoutGrid.Cell cols={1}>6</LayoutGrid.Cell> */}
                            {
                                [...this.state.tabs.values()].map((tab: TabM) => {
                                    console.log("reach here : window component 1")
                                    return (
                                        <LayoutGrid.Cell cols={1}>
                                            <TabComponent
                                                key={"tab-container-" + tab.id}
                                                tabModel={tab}
                                            >

                                            </TabComponent>
                                        </LayoutGrid.Cell>
                                    )
                                })
                            }
                        </LayoutGrid.Inner>
                            {/* </LayoutGrid.Cell> */}
                            {/* <LayoutGrid.Cell cols={12}> */}
                            {/*     <LayoutGrid.Inner> */}
                            {/*         <LayoutGrid.Cell cols={3}>Second cell</LayoutGrid.Cell> */}
                            {/*         <LayoutGrid.Cell cols={3}>Third cell</LayoutGrid.Cell> */}
                            {/*     </LayoutGrid.Inner> */}
                            {/* </LayoutGrid.Cell> */}
                        {/* </LayoutGrid.Inner> */}
                    </LayoutGrid>
                </div>
                {/* </Box> */}
                        {/* <LayoutGridInner> */}
                        {/*     <LayoutGridCell> */}
                        {/*         /!* <TabComponent *!/ */}
                        {/*         /!*     key={"tab-container-" + this.state.tabs.get(1).id} *!/ */}
                        {/*         /!*     tabModel={this.state.tabs.get(1)} *!/ */}
                        {/*         /!* > *!/ */}

                        {/*         /!* </TabComponent> *!/ */}
                        {/*     </LayoutGridCell> */}
                        {/* </LayoutGridInner> */}
                    {/* <LayoutGrid.Inner> */}
                    {/*     <LayoutGrid.Cell> */}
                    {/*         <TabComponent */}
                    {/*             key={"tab-container-" + this.state.tabs.get(1).id} */}
                    {/*             tabModel={this.state.tabs.get(1)} */}
                    {/*         > */}

                    {/*         </TabComponent> */}
                    {/*     </LayoutGrid.Cell> */}
                    {/* </LayoutGrid.Inner> */}
                    {/* <LayoutGrid.Inner> */}
                    {/*     <LayoutGrid.Cell> */}
                    {/*         <TabComponent */}
                    {/*             key={"tab-container-" + this.state.tabs.get(1).id} */}
                    {/*             tabModel={this.state.tabs.get(1)} */}
                    {/*         > */}

                    {/*         </TabComponent> */}
                    {/*     </LayoutGrid.Cell> */}
                    {/* </LayoutGrid.Inner> */}
                {/* </Grid> */}
                {/* { */}
                {/*     // <TabComponent */}
                {/*     //     key={"tab-container-" + 1} */}
                {/*     //     tabModel={this.state.tabs[0]} */}
                {/*     // > */}
                {/*     // */}
                {/*     // </TabComponent> */}
                {/*     [...this.state.tabs.values()].map((tab: TabM) => { */}
                {/*         console.log("reach here : window component 1") */}
                {/*         return ( */}
                {/*             <TabComponent */}
                {/*                 key={"tab-container-" + tab.id} */}
                {/*                 tabModel={tab} */}
                {/*             > */}

                {/*             </TabComponent> */}
                {/*         ) */}
                {/*     }) */}
                {/* } */}
            </div>
        )
    }

}










