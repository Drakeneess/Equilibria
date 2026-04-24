import { useState, useEffect } from "react";
import "./navbar.css";
import logo from "../../assets/logo.webp";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) setScrolled(true);
      else setScrolled(false);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        <li><a href="#about" onClick={() => setOpen(false)}>Nosotros</a></li>
        <li><a href="#services" onClick={() => setOpen(false)}>Servicios</a></li>
        <li><a href="#tecnologia" onClick={() => setOpen(false)}>Nuestra Tecnología</a></li>
        <li><a href="#contact" onClick={() => setOpen(false)}>Contacto</a></li>
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
