
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Cadastro from "./pages/Cadastro";
import Categorias from "./pages/Categorias";
import Perfil from "./pages/Perfil";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/home" element={<Home />} />

        <Route path="/cadastro" element={<Cadastro />} />

        <Route path="/categorias" element={<Categorias />} />

        <Route path="/perfil" element={<Perfil />} />

        <Route path="/configurações" element={<Configurações />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

