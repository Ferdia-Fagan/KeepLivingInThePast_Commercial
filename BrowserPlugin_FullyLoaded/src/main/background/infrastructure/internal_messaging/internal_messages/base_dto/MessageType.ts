
export enum MessageType {
    RequestQuery,

    Command_UpdateIndexingSettings,

    Command_SendUpdateReport,

    Command_ChangeTagsOfWebpage,

    TellSystem_AnnotationUIIsOpen,

    Request_GetAllTags,

    Request_GetAllTagsAndBookmarks,

    Request_GetAllHostnames,
    Request_GetAllAutoAnnotators,
    Request_GetAutoAnnotator,
    Request_CreateAutoAnnotator,
    Request_UpdateAutoAnnotator,
    Request_DeleteAutoAnnotator,

    Command_AddHostnameOfWebpageToHostnames,

    Command_GetCurrentWebpageTags,

    Request_ReportsAndBrowserData,

    CommandWithResponse_AddNewTags
}
