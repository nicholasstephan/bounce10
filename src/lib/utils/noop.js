export default {
  subscribe(callback) {
    callback(null);
    return () => null;
  },
  set() {},
}