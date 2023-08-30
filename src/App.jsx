import Poketrap from "./pages/Poketrap";
import Pokedex from "./pages/Pokedex";
import Header from "./components/Header";
import Pokemon from "./pages/Pokemon";
import { Route, Routes, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { fetchLikes } from "./features/likesSlice";

store.dispatch(fetchLikes());

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/poketrap" element={<Poketrap />} />
          <Route path="/pokedex" element={<Pokedex />} />
          <Route path="/pokemon/:name" element={<Pokemon />} />
          <Route path="*" element={<Navigate to="/poketrap" replace />} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
