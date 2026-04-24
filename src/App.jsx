import { Routes, Route } from "react-router-dom";
import "flag-icons/css/flag-icons.min.css";

import Home from "./pages/Home";
import EventoDetalle from "./pages/EventoDetalle";
import Legal from "./pages/Legal";
import Privacidad from "./pages/Privacidad";
import Terminos from "./pages/Terminos";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/eventos/:slug" element={<EventoDetalle />} />
      <Route path="/legal" element={<Legal />} />
      <Route path="/privacidad" element={<Privacidad />} />
      <Route path="/terminos" element={<Terminos/>} />
    </Routes>
  );
}

export default App;