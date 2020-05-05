class CustomEvent {
  constructor(event, params) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    let evt = document.createEvent("CustomEvent");
    /* prettier-ignore */
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  }
}

export { CustomEvent };
