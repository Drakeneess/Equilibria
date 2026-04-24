// src/components/Terms/Terms.jsx
import "./terms.css";

export default function Terms() {
  return (
    <section className="legal-page">
      <div className="legal-page-container">

        <h1>Términos y Condiciones</h1>

        <p className="legal-intro">
          El presente sitio web tiene carácter exclusivamente informativo. 
          Su finalidad es brindar información sobre los servicios de Equilibria Fisioterapia y Kinesiología.
        </p>

        <div className="legal-block">
          <h2>1. Uso del contenido</h2>
          <p>
            La información publicada es referencial y no sustituye una evaluación profesional personalizada.
            El usuario se compromete a utilizarla de manera responsable.
          </p>
        </div>

        <div className="legal-block">
          <h2>2. Propiedad intelectual</h2>
          <p>
            La marca “Equilibria” y los contenidos del sitio están protegidos por la normativa vigente.
            Queda prohibida su reproducción sin autorización.
          </p>
        </div>

        <div className="legal-block">
          <h2>3. Limitación de responsabilidad</h2>
          <p>
            Equilibria no se responsabiliza por decisiones tomadas únicamente en base a la información del sitio.
            Para diagnóstico o tratamiento, se recomienda acudir a consulta profesional.
          </p>
        </div>

        <div className="legal-block">
          <h2>4. Enlaces externos</h2>
          <p>
            El sitio puede contener enlaces a plataformas externas. Equilibria no es responsable del contenido o políticas de dichos sitios.
          </p>
        </div>

        <div className="legal-block">
          <h2>5. Disponibilidad</h2>
          <p>
            Se realizan esfuerzos razonables para mantener el sitio disponible, sin garantizar funcionamiento continuo.
          </p>
        </div>

        <div className="legal-block">
          <h2>6. Jurisdicción</h2>
          <p>
            El uso del sitio se rige por la legislación del Estado Plurinacional de Bolivia.
          </p>
        </div>

      </div>
    </section>
  );
}