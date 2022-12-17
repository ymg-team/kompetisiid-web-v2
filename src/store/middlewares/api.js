/**
 * Created by yussan on 27/10/16.
 */

export const CALL_API = Symbol("CALL_API");

export default (store) => (next) => (action) => {
  if (action[CALL_API]) {
    // do something to call API
  } else {
    // normal circle
    return next(action);
  }
};
