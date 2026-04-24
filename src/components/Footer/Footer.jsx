import "./footer.css";
import logo from "../../assets/logo.webp";
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function Footer() {
  const [isOpen, setIsOpen] = useState(false);
  const [todaySchedule, setTodaySchedule] = useState("");

  useEffect(() => {
    const now = new Date();

    const day = new Intl.DateTimeFormat("es-BO", {
      weekday: "long",
      timeZone: "America/La_Paz",
    }).format(now);

    const hours = new Intl.DateTimeFormat("es-BO", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "America/La_Paz",
    }).format(now);

    const [h, m] = hours.split(":").map(Number);
    const currentMinutes = h * 60 + m;

    const schedule = {
      lunes: [[9 * 60, 19 * 60]],
      martes: [[9 * 60, 19 * 60]],
      miércoles: [[9 * 60, 19 * 60]],
      jueves: [[9 * 60, 19 * 60]],
      viernes: [[9 * 60, 19 * 60]],
      sábado: [[9 * 60, 13 * 60]],
      domingo: [],
    };

    const today = day.toLowerCase();
    const ranges = schedule[today] || [];
    const openNow = ranges.some(
      ([start, end]) => currentMinutes >= start && currentMinutes <= end
    );

    setIsOpen(openNow);

    if (ranges.length === 0) {
      setTodaySchedule("Cerrado todo el día");
    } else {
      const pretty = ranges
        .map(([start, end]) => {
          const toHHMM = (min) =>
            `${String(Math.floor(min / 60)).padStart(2, "0")}:${String(
              min % 60
            ).padStart(2, "0")}`;
          return `${toHHMM(start)} - ${toHHMM(end)}`;
        })
        .join(", ");
      setTodaySchedule(pretty);
    }
  }, []);

  return (
    <footer className="footer">
      <div className="footer-logo-container">
        <img src={logo} alt="Equilibria Logo" className="footer-logo" />
        <p className="footer-tagline">
          ¡Recupera tu movimiento!
        </p>
      </div>

      <div className="footer-container">
        {/* Contacto */}
        <div className="footer-col">
          <h4>Datos de Contacto</h4>
          <p>
            Frente a la plaza Isabel la Católica, edificio las “Torres Mall”,
            torre B, piso 4 oficina 405 – LA PAZ
          </p>
          <p>
            <strong>Tel:</strong>{" "}
            <a href="tel:+59171531354">(591) 71531354</a>
          </p>
        </div>

        {/* Horarios */}
        <div className="footer-col">
          <h4>Horarios de Atención</h4>
          <p className={`open-status ${isOpen ? "open" : "closed"}`}>
            <span className="dot" /> Hoy: {todaySchedule} •{" "}
            {isOpen ? "Abierto ahora" : "Cerrado"}
          </p>
          <ul className="footer-hours">
            <li>Lunes - Viernes: 09:00 - 19:00</li>
            <li>Sábado: 09:00 - 13:00</li>
          </ul>
        </div>

        {/* Redes */}
        <div className="footer-col">
          <h4>Conéctate</h4>
          <div className="footer-socials">
            <a
              href="https://www.facebook.com/profile.php?id=100091824191811"
              target="_blank"
              rel="noreferrer"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.instagram.com/equilibria.fisio"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.tiktok.com/@equilibria_fisioterapia"
              target="_blank"
              rel="noreferrer"
            >
              <FaTiktok />
            </a>
            <a
              href="https://api.whatsapp.com/send/?phone=%2B59171531354"
              target="_blank"
              rel="noreferrer"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Equilibria. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
