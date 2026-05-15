import TechnologyMagazine from "./TechnologyMagazine";
import technologyData from "./technologyData";
import "./OurTechnology.css";

export default function OurTechnology() {
  return (
    <section id="tecnologia" className="our-technology">
      <div className="technology-header">
        <span className="technology-kicker">Innovación aplicada</span>

        <h2 className="section-title">
          Nuestra Tecnología
        </h2>

        <p className="technology-intro">
          Equipos y herramientas especializadas que complementan nuestros tratamientos
          para ofrecer procesos más precisos, seguros y personalizados.
        </p>
      </div>

      <TechnologyMagazine items={technologyData} />
    </section>
  );
}