import BoardView from "./components/Board";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BoardView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
