import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./navbar.css";
import logo from "../../assets/logo.webp";

const navItems = [
  { label: "Nosotros", section: "about" },
  { label: "Servicios", section: "services" },
  { label: "Tecnología", section: "tecnologia" },
  { label: "Contacto", section: "contact" }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 80);

      const sections = navItems
        .map((item) => document.getElementById(item.section))
        .filter(Boolean);

      const current = sections.find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= 140 && rect.bottom >= 140;
      });

      if (current) {
        setActiveSection(current.id);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const scrollToSection = (section) => {
    setOpen(false);

    if (location.pathname !== "/") {
      navigate(`/#${section}`);
      return;
    }

    const el = document.getElementById(section);

    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const goTop = () => {
    setOpen(false);

    if (location.pathname !== "/") {
      navigate("/");
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav
      className={`navbar ${visible ? "navbar--visible" : "navbar--hidden"} ${open ? "navbar--open" : ""}`}
      aria-label="Navegación principal"
    >
      <div className="navbar-container">
        <button
          type="button"
          className="nav-brand"
          onClick={goTop}
          aria-label="Ir al inicio"
        >
          <img
            src={logo}
            alt="Equilibria"
            className="nav-logo"
          />
        </button>

        <ul className={`nav-links ${open ? "open" : ""}`}>
          {navItems.map((item) => (
            <li key={item.section}>
              <button
                type="button"
                className={`nav-link ${activeSection === item.section ? "active" : ""}`}
                onClick={() => scrollToSection(item.section)}
              >
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <button
            type="button"
            className="nav-cta"
            onClick={() => scrollToSection("contact")}
          >
            Reserva tu cita
          </button>

          <button
            type="button"
            className={`nav-toggle ${open ? "open" : ""}`}
            onClick={() => setOpen((current) => !current)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </nav>
  );
}