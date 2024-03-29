import { BrowserRouter, Routes, Route } from "react-router-dom";
import Board from "./Components/Board";

import "./App.css";

function App() {
  return (
    <BrowserRouter basename="/kanban">
      <Routes>
        <Route path="/" element={<Board />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
