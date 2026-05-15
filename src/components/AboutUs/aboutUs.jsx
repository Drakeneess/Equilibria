import AboutCard from "./AboutCard";
import "./aboutUs.css";

const AboutUs = () => {
  return (
    <section id="about" className="about-container">
      <div className="about-header">
        <span className="about-kicker">Quiénes somos</span>

        <h2 className="section-title">
          Acerca de Nosotros
        </h2>

        <p className="about-intro">
          En Equilibria combinamos atención profesional, tecnología y un enfoque humano
          para acompañar procesos de recuperación, bienestar y movimiento consciente.
        </p>
      </div>

      <div className="about-sections">
        <AboutCard
          type="mission"
          eyebrow="Nuestro propósito"
          title="Misión"
        >
          <p>
            Ofrecer servicios de rehabilitación personalizados y de alta calidad para
            mejorar el bienestar y la calidad de vida de nuestros pacientes, con un
            enfoque ético, profesional y cercano.
          </p>
        </AboutCard>

        <AboutCard
          type="vision"
          eyebrow="Hacia dónde vamos"
          title="Visión"
        >
          <p>
            Ser un referente en fisioterapia y kinesiología, reconocido por la excelencia,
            la innovación y la capacidad de adaptarnos a las necesidades reales de cada
            paciente.
          </p>
        </AboutCard>

        <AboutCard
          type="values"
          eyebrow="Lo que nos guía"
          title="Valores"
        >
          <ul>
            <li>Eficiencia</li>
            <li>Seguridad</li>
            <li>Integridad</li>
            <li>Profesionalismo</li>
            <li>Empatía</li>
            <li>Colaboración</li>
          </ul>
        </AboutCard>
        <AboutCard
          type="purpose"
          eyebrow="Nuestra razón de ser"
          title="Propósito"
        >
          <p>
            Guiar procesos de recuperación con cuidado, precisión y humanidad, para que cada
            persona vuelva a confiar en su cuerpo y en su capacidad de sentirse mejor.
          </p>
        </AboutCard>
      </div>
    </section>
  );
};

export default AboutUs;