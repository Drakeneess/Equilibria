import { useState, useEffect } from "react";
import PDFModal from "../PDFModal/PDFModal";
import "./legal.css";

export default function LegalSection() {
  const [selectedFile, setSelectedFile] = useState(null);

  // bloquear scroll fondo
  useEffect(() => {
    document.body.style.overflow = selectedFile ? "hidden" : "auto";
  }, [selectedFile]);

  const openFile = (file) => {

  if (window.innerWidth < 600) {
    window.open(file, "_blank", "noopener,noreferrer");
  } else {
    setSelectedFile(file);
  }
};

  return (
    <>
      <section className="legal">
        <div className="legal-container">

          <h1 className="legal-title">
            Transparencia y respaldo legal
          </h1>

          <p className="legal-subtitle">
            Equilibria opera bajo normativa boliviana vigente, con documentación verificable.
          </p>

          <div className="legal-grid">

            <div className="legal-card seprec">
              <div className="card-header">
                <span className="badge">Vigente</span>
                <h3>Registro de empresa</h3>
              </div>
              <p>Matrícula SEPREC activa hasta 2027</p>
              <button onClick={() => openFile("/docs/seprec.pdf")}>
                Ver documento
              </button>
            </div>

            <div className="legal-card licencia">
              <div className="card-header">
                <span className="badge">Autorizado</span>
                <h3>Licencia de funcionamiento</h3>
              </div>
              <p>Permiso municipal para servicios de salud</p>
              <button onClick={() => openFile("/docs/licencia-funcionamiento.pdf")}>
                Ver documento
              </button>
            </div>

            <div className="legal-card sedes">
              <div className="card-header">
                <span className="badge">Habilitado</span>
                <h3>Habilitación sanitaria</h3>
              </div>
              <p>Centro autorizado por SEDES La Paz</p>
              <button onClick={() => openFile("/docs/sedes.pdf")}>
                Ver documento
              </button>
            </div>

            <div className="legal-card nit">
              <div className="card-header">
                <span className="badge">Activo</span>
                <h3>NIT</h3>
              </div>
              <p>Registro tributario con facturación habilitada</p>
              <button onClick={() => openFile("/docs/nit.pdf")}>
                Ver documento
              </button>
            </div>

            <div className="legal-card marca">
              <div className="card-header">
                <span className="badge">Registrado</span>
                <h3>Marca</h3>
              </div>
              <p>Registro SENAPI Clase 44</p>
              <button onClick={() => openFile("/docs/marca.pdf")}>
                Ver documento
              </button>
            </div>

          </div>

          <div className="legal-note">
            Esta información acredita el registro, autorización de funcionamiento
            y habilitación sanitaria dentro del marco normativo boliviano.
          </div>

        </div>
      </section>

      <PDFModal
        isOpen={!!selectedFile}
        file={selectedFile}
        onClose={() => setSelectedFile(null)}
      />
    </>
  );
}