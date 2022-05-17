"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegrateHostWithComponent = exports.IntegrateWithComponent = void 0;
function* loopThroughLevelsGenerator(root, funcToGetLevelVulnerableFunctions = getLevelVulnerableFunctions) {
    let currentLevelOfComponent = Object.getPrototypeOf(root);
    let nextLevelOfComponent = Object.getPrototypeOf(currentLevelOfComponent);
    let functionsAtLevels = [];
    while (nextLevelOfComponent) {
        yield funcToGetLevelVulnerableFunctions(currentLevelOfComponent);
        currentLevelOfComponent = nextLevelOfComponent;
        nextLevelOfComponent = Object.getPrototypeOf(nextLevelOfComponent);
    }
}
// type FuncToGetLevelVulnerableFunctions1 = (...v: any[]) => string[]
const getLevelVulnerableFunctions = (prototype) => Object.getOwnPropertyNames(prototype).filter(method => method !== 'constructor');
const filterFunctionsToTakeover = (functionMethodsInfected) => {
    return (prototype) => {
        const x = Object.getOwnPropertyNames(prototype);
        return x.filter(method => {
            const x = (method !== 'constructor'
                &&
                    !functionMethodsInfected.has(method));
            return x;
        });
    };
};
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
function getFunctionsAtLevels(theObject) {
    let currentLevelOfComponent = Object.getPrototypeOf(theObject);
    let nextLevelOfComponent = Object.getPrototypeOf(currentLevelOfComponent);
    let i = 0;
    let functionsAtLevels = [];
    while (nextLevelOfComponent) {
        functionsAtLevels[i++] = Object.getOwnPropertyNames(currentLevelOfComponent).filter(method => method !== 'constructor');
        currentLevelOfComponent = nextLevelOfComponent;
        nextLevelOfComponent = Object.getPrototypeOf(nextLevelOfComponent);
    }
    return functionsAtLevels;
}
// export function IntegrateComponentWithSubComponent<COMPONENT extends Partial<INTEGRATION>,INTEGRATION>(
// export function IntegrateComponentWithSubComponent<COMPONENT extends Required<INTEGRATION>,INTEGRATION>(
function IntegrateWithComponent(component, integration) {
    const integrationProcedureDetails = prepIntegrationToBecomeHost(integration);
    return IntegrateHostWithComponent(component, integrationProcedureDetails);
}
exports.IntegrateWithComponent = IntegrateWithComponent;
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
function IntegrateHostWithComponent(component, integrationProcedureDetails) {
    const funcsToIntegrate = ([...loopThroughLevelsGenerator(component, filterFunctionsToTakeover(integrationProcedureDetails.funcsTakingOver))]).flat();
    funcsToIntegrate.forEach((funcThatIsNotTakenOver) => {
        const funcKey = funcThatIsNotTakenOver;
        integrationProcedureDetails.hostInMimicking[funcKey] = component[funcKey];
    });
    return integrationProcedureDetails.hostInMimicking;
}
exports.IntegrateHostWithComponent = IntegrateHostWithComponent;
function prepIntegrationToBecomeHost(integration) {
    return {
        funcsTakingOver: new Set(getFunctionsAtLevels(integration).flat()),
        hostInMimicking: integration
    };
}
function completeIntegrationProcess(hostInMimickingState) {
    return hostInMimickingState;
}
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
//# sourceMappingURL=IntegrateWithComponent.js.map