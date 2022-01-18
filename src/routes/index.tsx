import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "../App";
import Poke from "../pages";
import Pokedek from "../pages/pokedek";
import PokeId from "../pages/_id";

const Index = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/pokemon" />} />
        <Route path="pokemon" element={<App />}>
          <Route index element={<Poke />} />
          <Route path=":name" element={<PokeId />} />
          <Route path="pokedek" element={<Pokedek />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Index;
