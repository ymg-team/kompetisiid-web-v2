import { SET_SESSION } from "./types";

/**
 * function to set new session on redux store
 * @param {object} session , response login from be, include {status:*, data:*}
 * @returns
 */
export const setSession = ({ session }) => {
  return {
    type: SET_SESSION,
    data: {
      session,
    },
  };
};
