import Any = jasmine.Any;

function* loopThroughLevelsGenerator<T>(
    root: T,
    funcToGetLevelVulnerableFunctions: FuncToGetLevelVulnerableFunctions = getLevelVulnerableFunctions
): Generator<string[]> {
    let currentLevelOfComponent = Object.getPrototypeOf(root)
    let nextLevelOfComponent = Object.getPrototypeOf(currentLevelOfComponent)

    let functionsAtLevels: string[][] = []

    while(nextLevelOfComponent){
        yield funcToGetLevelVulnerableFunctions(currentLevelOfComponent)
        currentLevelOfComponent = nextLevelOfComponent
        nextLevelOfComponent = Object.getPrototypeOf(nextLevelOfComponent)
    }
}

type FuncToGetLevelVulnerableFunctions = (prototype: any) => string[]
// type FuncToGetLevelVulnerableFunctions1 = (...v: any[]) => string[]

const getLevelVulnerableFunctions = (prototype: any) =>
    Object.getOwnPropertyNames(prototype).filter(method => method !== 'constructor')
const filterFunctionsToTakeover = (functionMethodsInfected: Set<string>) => {
    return (prototype: any) => {
        const x = Object.getOwnPropertyNames(prototype)
        return x.filter(method => {
            const x = (
                method !== 'constructor'
                    &&
                !functionMethodsInfected.has(method)
            )

            return x
        })
    }
}

// function getLevelVulnerableFunctions(prototype: any): string[] {
//     return Object.getOwnPropertyNames(prototype).filter(method => method !== 'constructor')
// }
// function filterFunctionsToTakeover (prototype: any, functionMethodsInfected: Set<string>) =
//     Object.getOwnPropertyNames(prototype).filter(method => (
//         method !== 'constructor'
//         ||
//         method ! in functionMethodsInfected
//     ))

// function loopThroughLevels<T>(root: T, functionMethodsInfected: Set<string> = null): Generator<string[]> {
//
//
//
// }

function getFunctionsAtLevels<T>(theObject: T): string[][]{
    let currentLevelOfComponent = Object.getPrototypeOf(theObject)
    let nextLevelOfComponent = Object.getPrototypeOf(currentLevelOfComponent)

    let i = 0
    let functionsAtLevels: string[][] = []

    while(nextLevelOfComponent){
        functionsAtLevels[i++] = Object.getOwnPropertyNames(currentLevelOfComponent).filter(method => method !== 'constructor')
        currentLevelOfComponent = nextLevelOfComponent
        nextLevelOfComponent = Object.getPrototypeOf(nextLevelOfComponent)
    }
    return functionsAtLevels
}


// export function IntegrateComponentWithSubComponent<COMPONENT extends Partial<INTEGRATION>,INTEGRATION>(
// export function IntegrateComponentWithSubComponent<COMPONENT extends Required<INTEGRATION>,INTEGRATION>(
export function IntegrateWithComponent<
    GREATER_INTEGRATION, // extends (COMPONENT & INTEGRATION)
    INTEGRATION,
    COMPONENT extends IntegratedComponent<GREATER_INTEGRATION, INTEGRATION>
>(
    component: COMPONENT,
    integration: INTEGRATION
): GREATER_INTEGRATION {
    const integrationProcedureDetails = prepIntegrationToBecomeHost<INTEGRATION, GREATER_INTEGRATION, COMPONENT>(integration)
    return IntegrateHostWithComponent<INTEGRATION, GREATER_INTEGRATION, COMPONENT>(component, integrationProcedureDetails)
}

// export function IntegrateWithComponents<
//     COMPONENT extends IntegratedComponent<HOST, INTEGRATION>,
//     INTEGRATION,
//     HOST // = ([ ...COMPONENTS ] & INTEGRATION)
// >(
//     components: [COMPONENT],
//     integration: INTEGRATION
// ): HOST {
//     components.reduce((hostInConstructionStasis: INTEGRATION , component: COMPONENT) => {
//         return IntegrateWithComponent<COMPONENT, INTEGRATION>(component, hostInConstructionStasis)
//         // return hostInConstructionStasis
//     }, integration)
//     // components.reduce((hostInConstructionStasis: INTEGRATION , component: IntegratedComponent<HOST, INTEGRATION>) => {
//     //     IntegrateWithComponent(component, hostInConstructionStasis)
//     // }, integration)
// }

export function IntegrateHostWithComponent<
    INTEGRATION,
    HOST, // extends (COMPONENT & INTEGRATION)
    COMPONENT extends IntegratedComponent<HOST, INTEGRATION>
>(
    component: COMPONENT,
    integrationProcedureDetails: IntegrationProcedureDetails<COMPONENT>
): HOST {
    const funcsToIntegrate = ([...loopThroughLevelsGenerator(
        component, filterFunctionsToTakeover(integrationProcedureDetails.funcsTakingOver)
    )]).flat()

    funcsToIntegrate.forEach((funcThatIsNotTakenOver: string) => {
        const funcKey = funcThatIsNotTakenOver as keyof COMPONENT
        integrationProcedureDetails.hostInMimicking[funcKey] = component[funcKey]
    })
    return integrationProcedureDetails.hostInMimicking as unknown as HOST
}

interface IntegrationProcedureDetails<COMPONENT> {
    funcsTakingOver: Set<string>,
    hostInMimicking: COMPONENT
}

function prepIntegrationToBecomeHost<
    INTEGRATION,
    HOST, // extends (COMPONENT & INTEGRATION)
    COMPONENT extends IntegratedComponent<HOST, INTEGRATION>
>(integration: INTEGRATION): IntegrationProcedureDetails<COMPONENT> {
    return {
        funcsTakingOver: new Set(getFunctionsAtLevels(integration).flat()),
        hostInMimicking: integration as unknown as COMPONENT
    }
}

function completeIntegrationProcess<
    COMPONENT,
    INTEGRATION extends Partial<COMPONENT>,
    HOST = (COMPONENT & INTEGRATION)
>(hostInMimickingState: COMPONENT): HOST {
    return hostInMimickingState as unknown as HOST
}

// type Component<
//     COMPONENT,
//     INTEGRATION extends Required<COMPONENT>
// > = COMPONENT

export type IntegratedComponent<GREATER_INTEGRATED, PARENT> = Exclude<GREATER_INTEGRATED, PARENT>
// type IntegratedComponents<PARENT> = Array<[
//     IntegratedComponent<Exclude<INTEGRATED>, PARENT>
// ]>
// type IntegratedComponents<PARENT, K> = Array<IntegratedComponent<any, any>>

type Component<INTEGRATION> = Required<INTEGRATION>

// type Components<INTEGRATION> = Array<Component<INTEGRATION>>

//     {
//     [P in keyof INTEGRATION]-?: INTEGRATION[P]
// }

type Components<
    COMPONENTS extends Array<Component<Any>>,
    INTEGRATION
> = COMPONENTS

type Componentss<COMPONENT extends Component<Any>> = Array<COMPONENT>

// type ComponentOfIntegration<
//     Components,
//     INTEGRATION
// > = INTEGRATION

// export function IntegrateWithComponents<
//     Components,
//     INTEGRATION extends Partial<COMPONENTS>,
//     HOST = (COMPONENT & INTEGRATION)
// >(
//     component: Array<Component<integration>>,
//     integration: INTEGRATION
// ): HOST {
//     let funcsTakingOver = new Set(getFunctionsAtLevels(integration).flat());
//
//     const host = integration as unknown as COMPONENT
//
//     component.reduce((e,l) => {
//
//     }, )
// }
