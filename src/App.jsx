import Poketrap from "./pages/Poketrap";
import Pokedex from "./pages/Pokedex";
import Header from "./components/Header";
import Pokemon from "./pages/Pokemon";
import { Route, Routes, Navigate } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path="/poketrap" element={<Poketrap />} />
        <Route path="/pokedex" element={<Pokedex />} />
        <Route path="/pokemon/:name" Component={Pokemon}></Route>
        <Route path="*" element={<Navigate to="/poketrap" replace />} />
      </Routes>
    </div>
  );
}

export default App;
