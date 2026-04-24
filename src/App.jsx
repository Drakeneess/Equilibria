import { Routes, Route } from "react-router-dom";
import "flag-icons/css/flag-icons.min.css";

import Home from "./pages/Home";
import EventoDetalle from "./pages/EventoDetalle";
import Legal from "./pages/Legal";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/eventos/:slug" element={<EventoDetalle />} />
      <Route path="/legal" element={<Legal />} />
    </Routes>
  );
}

export default App;