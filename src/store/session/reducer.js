import { SET_SESSION } from "./types";

export const SessionReducer = (initialState = {}, action = {}) => {
  switch (action.type) {
    case SET_SESSION:
      return { ...action.data.session };
    default:
      return initialState;
  }
};
