import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import BoardReducer from "./Reducers/Board";
import UIReducer from "./Reducers/UI";

const appReducer = combineReducers({
  board: BoardReducer,
  ui: UIReducer
});

export type AppState = ReturnType<typeof appReducer>;

export default configureStore({
  reducer: appReducer
});
