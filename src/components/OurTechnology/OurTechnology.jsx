import TechnologyMagazine from "./TechnologyMagazine";
import technologyData from "./technologyData";
import "./OurTechnology.css";

export default function OurTechnology() {
  return (
    <section className="our-technology">

      <h2 className="section-title">
        <span
          className="title-inner"
          data-icon="🧬"
        >
          Nuestra Tecnología
        </span>
      </h2>

      <TechnologyMagazine items={technologyData} />

    </section>
  );
}
