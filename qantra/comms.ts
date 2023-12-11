import type {
  QantraMessageEventHandler,
  QantraMessagePayload,
  QantraMessageType,
} from "./types";

export function subscribe<Type extends QantraMessageType>(
  type: Type,
  handler: QantraMessageEventHandler<Type>,
  options: AddEventListenerOptions = { once: true }
): void {
  window.addEventListener(
    "message",
    (evt) => {
      if (
        !("type" in evt.data) ||
        !("payload" in evt.data) ||
        evt.data.type !== type
      ) {
        return;
      }

      return handler(...(evt.data.payload as QantraMessagePayload<Type>));
    },
    options
  );
}

export function dispatch<Type extends QantraMessageType>(
  type: Type,
  ...params: QantraMessagePayload<Type>
) {
  if (
    !window.top ||
    !Object.prototype.hasOwnProperty.call(window.top, "postMessage")
  ) {
    throw new Error("could not find parent window, aborting...");
  }

  window.top.postMessage({ type, payload: params }, "*");
}
