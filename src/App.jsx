import Home from "./pages/Home";
import Header from "./components/Header";
import { Route, Routes, Navigate } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path="/poketrap" element={<Home />} />
        <Route path="*" element={<Navigate to="/poketrap" replace />} />
      </Routes>
    </div>
  );
}

export default App;
