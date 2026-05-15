import "./ceoSection.css";

const experiencia = [
  { text: "Neuro-Linguistic Programming with Body Work", country: "USA" },
  { text: "Reflexology", country: "USA" },
  { text: "Diplomado en Fisioterapia deportiva", country: "España" },
  { text: "Chi Nei Tsang I", country: "Tailandia" },
  { text: "Chi Nei Tsang II", country: "Tailandia" },
  { text: "Chi Nei Tsang III", country: "Tailandia" },
  { text: "Biomagnetismo médico", country: "México" },
  { text: "Sonoterapia (terapia vibroacústica)", country: "Argentina" },
  { text: "Neuromodulación funcional", country: "Perú" },
  { text: "Punción seca y electropunción", country: "Perú" },
  { text: "Especialización en piso pélvico", country: "Perú" },
  { text: "Innovación en terapias no invasivas", country: "Bolivia" },
  { text: "Fisioterapia en parálisis facial", country: "Bolivia" },
  { text: "Diplomado en Educación Superior", country: "Bolivia" },
  { text: "Electroterapia y ultrasonido", country: "Bolivia" },
  { text: "Fisioterapia del suelo pélvico", country: "Bolivia" },
  { text: "Acupuntura estética", country: "Bolivia" },
  { text: "Manejo endocrino con campos magnéticos", country: "Bolivia" },
  { text: "Drenaje linfático", country: "Bolivia" },
  { text: "Auriculoterapia aplicada al dolor", country: "Bolivia" },
  { text: "Acupuntura manual", country: "Bolivia" },
  { text: "Kinesio Taping", country: "Bolivia" },
  { text: "Rendimiento en altura", country: "Bolivia" },
  { text: "Fisioterapia respiratoria COVID-19", country: "Bolivia" },
  { text: "Tecarterapia y láser de alta potencia", country: "Bolivia" }
];

const flags = {
  USA: "us",
  España: "es",
  Tailandia: "th",
  México: "mx",
  Argentina: "ar",
  Perú: "pe",
  Bolivia: "bo"
};

export default function CEOExperience() {
  return (
    <section className="ceo-exp-container">
      <div className="ceo-exp-header">
        <span className="ceo-exp-kicker">Trayectoria</span>

        <h3 id="ceo-experience-title" className="ceo-exp-title">
          Experiencia Profesional
        </h3>

        <p className="ceo-exp-description">
          Formación multidisciplinaria en fisioterapia, rehabilitación, terapias
          complementarias y tecnologías aplicadas al bienestar físico.
        </p>
      </div>

      <div className="ceo-exp-grid">
        {experiencia.map((item, i) => (
          <article key={`${item.text}-${i}`} className="ceo-exp-item">
            <span
              className={`fi fi-${flags[item.country] || "xx"} ceo-exp-flag`}
              aria-hidden="true"
            />

            <div>
              <p>{item.text}</p>
              <span>{item.country}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}