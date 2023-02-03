export type TabIdToWindowIdT = Map<number, number>
const tabIdToWindowIdInst: TabIdToWindowIdT = new Map()
export const tabIdToWindowIdDependency = (): TabIdToWindowIdT => tabIdToWindowIdInst
