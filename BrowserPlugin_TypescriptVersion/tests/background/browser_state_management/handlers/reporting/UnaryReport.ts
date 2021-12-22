
export enum BaseAction {
    ADD,
    DELETE
}

export type UnaryReport<REPORT_DATA_T> = [BaseAction, REPORT_DATA_T]


