import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./navbar.css";
import logo from "../../assets/logo.webp";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (section) => {
    setOpen(false);

    if (location.pathname !== "/") {
      navigate(`/#${section}`);
    } else {
      const el = document.getElementById(section);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className={`navbar ${scrolled ? "navbar--visible" : "navbar--top"}`}>
    <div className="navbar-container">

      <div className="nav-left">
        <img
          src={logo}
          alt="Equilibria Logo"
          className="nav-logo"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        />
      </div>

      <ul className={`nav-links ${open ? "open" : ""}`}>
        <li><button onClick={() => handleNavClick("about")}>Nosotros</button></li>
        <li><button onClick={() => handleNavClick("services")}>Servicios</button></li>
        <li><button onClick={() => handleNavClick("tecnologia")}>Nuestra Tecnología</button></li>
        <li><button onClick={() => handleNavClick("contact")}>Contacto</button></li>
      </ul>

      <div className="nav-right">
        <button
          className={`nav-toggle ${open ? "open" : ""}`}
          onClick={() => setOpen(!open)}
        >
          <span></span><span></span><span></span>
        </button>

        <button className="nav-cta">Reserva tu cita</button>
      </div>

    </div>
  </nav>
  );
}
