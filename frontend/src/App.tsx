import BoardView from "./components/Board";
import Dashboard from "./components/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/board" element={<BoardView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
