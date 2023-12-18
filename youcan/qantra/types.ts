export interface QantraMessagePayloadMap {
    'QANTRA::SESSION_TOKEN.REQ': [],
    'QANTRA::SESSION_TOKEN.RES': [string],

    'QANTRA::NAV.REDIRECT.REMOTE': [string]
}

export type QantraMessageType = keyof QantraMessagePayloadMap;
export type QantraMessagePayload<T extends QantraMessageType> = QantraMessagePayloadMap[T]
export type QantraMessageEventHandler<T extends QantraMessageType> = (...params: QantraMessagePayloadMap[T]) => void
export type QantraMessageEvent<T extends QantraMessageType> = MessageEvent<{type: QantraMessageType, payload: QantraMessagePayload<T>}>