import { useParams } from "react-router-dom";
import { eventos } from "../components/Blog/eventos";
import EventoDetalle from "../components/EventDetails/eventDetail";
import Navbar from "../components/Navbar/navbar";
import Footer from "../components/Footer/Footer";

export default function EventoDetallePage() {
  const { slug } = useParams();

  const evento = eventos.find(e => e.slug === slug);

  if (!evento) {
    return <h2 style={{ padding: "2rem" }}>Evento no encontrado</h2>;
  }

  return (
    <>
      <Navbar />
      <EventoDetalle evento={evento} />
      <Footer />
    </>
  );
}