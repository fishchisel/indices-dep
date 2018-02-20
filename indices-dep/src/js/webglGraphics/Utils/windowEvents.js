var nullEvents = require('./nullEvents.js');

export default createDocumentEvents();

function createDocumentEvents() {
  if (typeof window === 'undefined') {
    return nullEvents;
  }

  return {
    on: on,
    off: off
  };
}

function on(eventName, handler) {
  window.addEventListener(eventName, handler);
}

function off(eventName, handler) {
  window.removeEventListener(eventName, handler);
}

