import "./footer.css";
import logo from "../../assets/logo.webp";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaClock
} from "react-icons/fa";
import { useEffect, useState } from "react";

const schedule = {
  lunes: [[9 * 60, 19 * 60]],
  martes: [[9 * 60, 19 * 60]],
  miércoles: [[9 * 60, 19 * 60]],
  jueves: [[9 * 60, 19 * 60]],
  viernes: [[9 * 60, 19 * 60]],
  sábado: [[9 * 60, 13 * 60]],
  domingo: []
};

const socials = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=100091824191811",
    icon: <FaFacebookF />
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/equilibria.fisio",
    icon: <FaInstagram />
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@equilibria_fisioterapia",
    icon: <FaTiktok />
  },
  {
    label: "WhatsApp",
    href: "https://api.whatsapp.com/send/?phone=%2B59171531354",
    icon: <FaWhatsapp />
  }
];

function toHHMM(minutes) {
  return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(
    minutes % 60
  ).padStart(2, "0")}`;
}

function getTodayStatus() {
  const now = new Date();

  const day = new Intl.DateTimeFormat("es-BO", {
    weekday: "long",
    timeZone: "America/La_Paz"
  }).format(now);

  const hours = new Intl.DateTimeFormat("es-BO", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "America/La_Paz"
  }).format(now);

  const [h, m] = hours.split(":").map(Number);
  const currentMinutes = h * 60 + m;

  const today = day.toLowerCase();
  const ranges = schedule[today] || [];

  const isOpen = ranges.some(
    ([start, end]) => currentMinutes >= start && currentMinutes <= end
  );

  const todaySchedule =
    ranges.length === 0
      ? "Cerrado todo el día"
      : ranges.map(([start, end]) => `${toHHMM(start)} - ${toHHMM(end)}`).join(", ");

  return {
    isOpen,
    todaySchedule
  };
}

export default function Footer() {
  const [status, setStatus] = useState({
    isOpen: false,
    todaySchedule: ""
  });

  useEffect(() => {
    setStatus(getTodayStatus());
  }, []);

  return (
    <footer className="footer">
      <div className="footer-shell">
        <div className="footer-brand">
          <img src={logo} alt="Equilibria Logo" className="footer-logo" />

          <div>
            <h3>Equilibria</h3>
            <p>¡Recupera tu movimiento!</p>
          </div>
        </div>

        <div className="footer-container">
          <div className="footer-col">
            <h4>Datos de contacto</h4>

            <div className="footer-info-item">
              <span className="footer-icon">
                <FaMapMarkerAlt />
              </span>

              <p>
                Frente a la plaza Isabel la Católica, edificio “Torres Mall”,
                torre B, piso 4, oficina 405 – La Paz.
              </p>
            </div>

            <div className="footer-info-item">
              <span className="footer-icon">
                <FaPhoneAlt />
              </span>

              <p>
                <a href="tel:+59171531354">(591) 71531354</a>
              </p>
            </div>
          </div>

          <div className="footer-col">
            <h4>Horarios de atención</h4>

            <div className={`open-status ${status.isOpen ? "open" : "closed"}`}>
              <span className="status-dot" />

              <div>
                <strong>{status.isOpen ? "Abierto ahora" : "Cerrado"}</strong>
                <p>Hoy: {status.todaySchedule}</p>
              </div>
            </div>

            <ul className="footer-hours">
              <li>
                <FaClock />
                <span>Lunes - Viernes: 09:00 - 19:00</span>
              </li>
              <li>
                <FaClock />
                <span>Sábado: 09:00 - 13:00</span>
              </li>
              <li>
                <FaClock />
                <span>Domingo: cerrado</span>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Conéctate</h4>

            <p className="footer-social-text">
              Síguenos para conocer novedades, promociones y contenido de bienestar.
            </p>

            <div className="footer-socials">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-legal">
          <a href="/legal">Información Legal</a>
          <span>•</span>
          <a href="/terminos">Términos y Condiciones</a>
          <span>•</span>
          <a href="/privacidad">Política de Privacidad</a>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Equilibria. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}