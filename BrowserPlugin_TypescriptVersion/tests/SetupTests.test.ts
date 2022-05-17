import {bookmarks} from "webextension-polyfill";
import {IntegratedComponent, IntegrateWithComponent} from "../src/TS/utils/IntegrateWithComponent";


interface Component {
    function1(a: number): string
    function2(a: string): number
    function3(a: string): string
}

class ComponentImpl implements Component {
    function1(a: number): string {
        return a + ": original function1"
    }

    function2(a: string): number {
        return 0
    }

    function3(a: string): string {
        return a + ": original function3"
    }

}


interface IntegrationDescriptionInterface {
    function1(a: number): string
    function2(a: string): number
}

interface CompletedHostInterface {
    function1(a: number): string
    function2(a: string): number
    function3(a: string): string
    // function4(a: string): string
}

class HostImpl implements IntegrationDescriptionInterface {

    subject: Component

    constructor(subject: Component) {
        this.subject = subject
    }

    function1(a: number): string {
        return a + ": function1 with surgery"
    }

    function2(a: string): number {
        return 1;
    }

}


// const intergratedComponent: ((component: Component, integration: IntegrationDescriptionInterface) => Component) =
//     IntegrateComponentWithSubComponent<ComponentT, IntegrationDescriptionInterface>(subjectInst, integrationInst)

// type x = keyof Component
// type y<IntegrationDescription extends x> = keyof IntegrationDescription

console.log()

describe("sadf", () => {
    it("fdsa", () => {
        // const subjectInst = new ComponentImpl()
        const subjectInst = new ComponentImpl()
        // const hostInstance: IntegrationDescriptionInterface = new HostImpl(subjectInst)
        const hostInstance = new HostImpl(subjectInst)

        const hostInfected: CompletedHostInterface = IntegrateWithComponent(
            subjectInst,
            hostInstance
        )

        expect(hostInfected.function1(10000))
            .toBe("10000: function1 with surgery")
        expect(hostInfected.function2("10"))
            .toBe(1)
        expect(hostInfected.function3("1sdkf"))
            .toBe("1sdkf: original function3")
    })
})

