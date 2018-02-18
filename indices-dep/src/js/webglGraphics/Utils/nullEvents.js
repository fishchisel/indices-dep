export default createNullEvents();

function createNullEvents() {
  return {
    on: noop,
    off: noop,
    stop: noop
  };
}

function noop() { }
