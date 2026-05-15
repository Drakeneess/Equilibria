import { useMemo, useState } from "react";
import { FaPhoneAlt, FaMapMarkerAlt, FaWhatsapp, FaRoute } from "react-icons/fa";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import "./contact.css";

import customMarkerImg from "../../assets/marker-equilibria.webp";
import direction from "../../assets/Como-llegar.mp4";
import equilibriaLogo from "../../assets/logo.webp";

const EQUILIBRIA_POSITION = [-16.509158, -68.123034];
const WHATSAPP_PHONE = "59171531354";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    message: ""
  });

  const customMarker = useMemo(() => {
    return new L.Icon({
      iconUrl: customMarkerImg,
      iconSize: [52, 52],
      iconAnchor: [26, 52],
      popupAnchor: [0, -52]
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((current) => ({
      ...current,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const text = encodeURIComponent(
      `Hola, mi nombre es ${form.name}.\n${form.message}`
    );

    const url = `https://wa.me/${WHATSAPP_PHONE}?text=${text}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contact" className="contact">
      <div className="contact-header">
        <span className="contact-kicker">Agenda tu visita</span>

        <h2 className="section-title">
          Ubicación y contacto
        </h2>

        <p className="contact-intro">
          Estamos en Torres Mall, La Paz. Escríbenos por WhatsApp o revisa cómo
          llegar para coordinar tu atención.
        </p>
      </div>

      <div className="contact-container">
        <div className="contact-info">
          <div className="contact-brand">
            <img src={equilibriaLogo} alt="Equilibria" />

            <div>
              <span>Equilibria</span>
              <strong>Fisioterapia, kinesiología y bienestar</strong>
            </div>
          </div>

          <div className="info-list">
            <div className="info-item">
              <span className="info-icon-wrap">
                <FaMapMarkerAlt className="info-icon" />
              </span>

              <p>
                Frente a la plaza Isabel la Católica,<br />
                Edificio “Torres Mall”, Torre B, piso 4, oficina 405
              </p>
            </div>

            <div className="info-item">
              <span className="info-icon-wrap">
                <FaPhoneAlt className="info-icon" />
              </span>

              <p>
                <a href="tel:+59171531354">(591) 71531354</a>
              </p>
            </div>
          </div>

          <form className="whatsapp-form" onSubmit={handleSubmit}>
            <label>
              <span>Nombre</span>

              <input
                type="text"
                name="name"
                placeholder="Tu nombre"
                value={form.name}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              <span>Consulta</span>

              <textarea
                name="message"
                placeholder="Escribe tu consulta..."
                value={form.message}
                onChange={handleChange}
                required
                rows={4}
              />
            </label>

            <button type="submit" className="cta-whatsapp">
              <FaWhatsapp />
              <span>Enviar por WhatsApp</span>
            </button>
          </form>
        </div>

        <div className="contact-map-card">
          <div className="contact-map-header">
            <div>
              <span>Mapa interactivo</span>
              <strong>Torres Mall - La Paz</strong>
            </div>

            <FaRoute aria-hidden="true" />
          </div>

          <div className="contact-map">
            <MapContainer
              center={EQUILIBRIA_POSITION}
              zoom={17}
              scrollWheelZoom={false}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />

              <Marker
                position={EQUILIBRIA_POSITION}
                icon={customMarker}
              >
                <Popup>Torres Mall - La Paz</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>

        <div className="contact-video-card">
          <div className="contact-video-header">
            <span>Cómo llegar</span>
            <strong>Guía visual</strong>
          </div>

          <div className="contact-video">
            <video autoPlay loop muted playsInline>
              <source src={direction} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}