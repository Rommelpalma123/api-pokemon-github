import "./App.css";
import Barra from "./components/Barra";
import { Routes, Route } from "react-router-dom";
import Pokemon from "./pages/Pokemon";
import Github from "./pages/Github";
import PokemonPage from "./components/PokemonPage";
import Evolutions from "./components/Evolutions";

function App() {
  return (
    <div>
      <Barra />
      <Routes>
        <Route exact path="/api-pokemon-github" element={<Pokemon />} />
        <Route path="/github" element={<Github />} />
        <Route path="/pokemon/:id" element={<PokemonPage />} />
        <Route path="/evolutions/:id" element={<Evolutions />} />
      </Routes>
    </div>
  );
}

export default App;
