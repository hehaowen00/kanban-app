import React from "react";
import KanbanBoard from "./components/Board";
import Dashboard from "./components/Dashboard";

import "./App.css";

import { Board } from "./types/Kanban";
import { v4 as uuidV4 } from "uuid";

function App() {
  return <KanbanBoard />;
}

export default App;
