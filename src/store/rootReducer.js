/**
 * Created by yussan on 02/10/16.
 * Updated by yussanb on 17/12/22.
 */

import { combineReducers } from "redux";
import { SessionReducer } from "./session/reducer";

export default combineReducers({
  Session: SessionReducer,
});
