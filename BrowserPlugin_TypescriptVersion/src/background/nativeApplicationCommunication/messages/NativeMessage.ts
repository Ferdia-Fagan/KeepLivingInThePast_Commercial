
export interface NativeMessage {
    type: string;
    responseId?: number;
    message: any;
}

export function Create_NativeMessage(type: string, message: any): NativeMessage{
    return {
        type: type,
        message: message 
    };
}

export function Create_NativeMessage_WithResponse(type: string, message: any, responseId: number): NativeMessage{
    return {
        type: type,
        responseId: responseId,
        message: message 
    };
}


