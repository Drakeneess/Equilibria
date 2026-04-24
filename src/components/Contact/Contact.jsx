import { useState } from "react";
import { FaPhoneAlt, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";
import "./contact.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import customMarkerImg from "../../assets/marker-equilibria.webp";
import direction from "../../assets/Como-llegar.mp4";
import equilibriaLogo from "../../assets/logo.webp";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    message: "",
  });

  const customMarker = new L.Icon({
    iconUrl: customMarkerImg,
    iconSize: [48, 48],       // tamaño del ícono
    iconAnchor: [24, 48],     // punto que toca el suelo
    popupAnchor: [0, -48],    // posición del popup
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const phone = "59171531354"; // 👈 Número destino
    const text = `Hola, mi nombre es ${form.name}.%0A${form.message}`;
    const url = `https://wa.me/${phone}?text=${text}`;

    window.open(url, "_blank");
  };

  return (
    <section id="contact" className="contact">
      <h2 className="section-title">
        <span className="title-inner" data-icon="🎉">Ubicación y contacto</span>
      </h2>

      <div className="contact-container">
        {/* VIDEO */}
        <div className="contact-video">
          <video autoPlay loop muted>
            <source src={direction} type="video/mp4" />
          </video>
        </div>

        {/* MAPA */}
        <div className="contact-map">
          <MapContainer
            center={[-16.509158, -68.123034]}
            zoom={17}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />

            <Marker
              position={[-16.5091, -68.1233]}
              icon={customMarker}
            >
              <Popup>Torres Mall - La Paz</Popup>
            </Marker>
          </MapContainer>
        </div>

        {/* FORMULARIO */}
        <div className="contact-info">

          <div className="info-item">
            <FaMapMarkerAlt className="info-icon" />
            <p>
              Frente a la plaza Isabel la Católica,<br />
              Edificio “Torres Mall”, Torre B, piso 4, oficina 405
            </p>
          </div>

          <div className="info-item">
            <FaPhoneAlt className="info-icon" />
            <p><a href="tel:+59171531354">(591) 71531354</a></p>
          </div>

          <form className="whatsapp-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Tu nombre"
              value={form.name}
              onChange={handleChange}
              required
            />

            <textarea
              name="message"
              placeholder="Escribe tu consulta..."
              value={form.message}
              onChange={handleChange}
              required
            ></textarea>

            <button type="submit" className="cta-whatsapp">
              <FaWhatsapp /> Enviar por WhatsApp
            </button>
          </form>

        </div>

        {/* LOGO */}
        <div className="contact-logo">
          <img src={equilibriaLogo} alt="Equilibria"/>
        </div>

      </div>
    </section>
  );
}
