// src/components/Privacy/Privacy.jsx
import "./terms.css";

export default function Privacy() {
  return (
    <section className="legal-page">
      <div className="legal-page-container">

        <h1>Política de Privacidad</h1>

        <p className="legal-intro">
          Este sitio web tiene carácter informativo y no solicita registros ni recopila datos personales de forma directa.
        </p>

        <div className="legal-block">
          <h2>1. Datos recopilados automáticamente</h2>
          <p>
            Durante la navegación pueden recopilarse datos técnicos como dirección IP, navegador o páginas visitadas,
            con fines estadísticos y de mejora del sitio.
          </p>
        </div>

        <div className="legal-block">
          <h2>2. Cookies</h2>
          <p>
            El sitio puede utilizar cookies básicas necesarias para su funcionamiento. 
            No se utilizan cookies para seguimiento personalizado ni publicidad.
          </p>
        </div>

        <div className="legal-block">
          <h2>3. Enlaces externos</h2>
          <p>
            Este sitio puede contener enlaces a plataformas externas (redes sociales, WhatsApp, etc.),
            las cuales tienen sus propias políticas de privacidad.
          </p>
        </div>

        <div className="legal-block">
          <h2>4. Protección de la información</h2>
          <p>
            Se aplican medidas razonables para proteger la información técnica generada durante la navegación.
          </p>
        </div>

        <div className="legal-block">
          <h2>5. Cambios en la política</h2>
          <p>
            Esta política puede actualizarse en cualquier momento sin previo aviso.
          </p>
        </div>

        <div className="legal-block">
          <h2>6. Jurisdicción</h2>
          <p>
            Esta política se rige por la legislación del Estado Plurinacional de Bolivia.
          </p>
        </div>

      </div>
    </section>
  );
}