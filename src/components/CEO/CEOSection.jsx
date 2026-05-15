import { useEffect, useState } from "react";
import "./ceoSection.css";
import CEOExperience from "./CEOExperience";
import ceoImg from "../../assets/icon leila1.webp";

export default function CEOSection() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <section className="ceo-container" id="ceo">
      <div className="ceo-header">
        <span className="ceo-kicker">Dirección profesional</span>

        <h2 className="section-title">
          Nuestra CEO
        </h2>

        <p className="ceo-intro">
          Liderazgo clínico, experiencia internacional y una visión centrada en
          tratamientos personalizados para el bienestar físico.
        </p>
      </div>

      <div className="ceo-content">
        <div className="ceo-text">
          <span className="ceo-role">CEO & Especialista en Fisioterapia</span>

          <h3 className="ceo-name">Lic. Leila Romero</h3>

          <p>
            Profesional en Fisioterapia y Kinesiología con amplia experiencia en
            rehabilitación integral, enfocada en mejorar la calidad de vida de
            sus pacientes mediante tratamientos personalizados y tecnología de
            vanguardia.
          </p>

          <p>
            Su liderazgo ha permitido que Equilibria se consolide como un centro
            de referencia en bienestar físico, destacándose por su enfoque humano,
            ético y orientado a resultados.
          </p>

          <div className="ceo-actions">
            <button
              type="button"
              className="ceo-exp-btn"
              onClick={() => setOpen(true)}
            >
              <span>Ver experiencia</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>

        <div className="ceo-image-area">
          <div className="ceo-image-orbit" aria-hidden="true" />

          <div className="ceo-image-wrapper">
            <img
              src={ceoImg}
              alt="Lic. Leila Romero, CEO de Equilibria"
              className="ceo-image"
              loading="lazy"
            />
          </div>

          <div className="ceo-floating-card ceo-floating-card--top">
            <strong>25+</strong>
            <span>formaciones profesionales</span>
          </div>

          <div className="ceo-floating-card ceo-floating-card--bottom">
            <strong>7</strong>
            <span>países de especialización</span>
          </div>
        </div>
      </div>

      <div
        className={`ceo-exp-overlay ${open ? "active" : ""}`}
        aria-hidden={!open}
        onClick={() => setOpen(false)}
      >
        <aside
          className="ceo-exp-panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby="ceo-experience-title"
          onClick={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            className="ceo-exp-close"
            onClick={() => setOpen(false)}
            aria-label="Cerrar experiencia profesional"
          >
            ✕
          </button>

          <CEOExperience />
        </aside>
      </div>
    </section>
  );
}