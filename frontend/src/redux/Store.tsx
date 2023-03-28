import { v4 as uuidV4 } from "uuid";
import { createStore, combineReducers } from "redux";
import BoardReducer from "./Reducers/Board";
import UIReducer from "./Reducers/UI";

const appReducer = combineReducers({
  board: BoardReducer,
  ui: UIReducer
});

export type AppState = ReturnType<typeof appReducer>;

export default createStore(appReducer);
