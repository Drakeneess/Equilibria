import React from "react";
import AboutCard from "./AboutCard carnival"; // Importa el nuevo componente
import "./aboutUs Carnival.css";
import mask from "../Hollidays/Carnival/mask.png"
import mask1 from "../Hollidays/Carnival/mask1.png"
import mask2 from "../Hollidays/Carnival/mask2.png"

const AboutUs = () => {
  return (
    <section id="about" className="about-container">
      <h2 class="section-title">
        <span class="title-inner" data-icon="🎊">Acerca de Nosotros</span>
      </h2>

      <div className="about-sections">
        <AboutCard type="mission" title="Misión">
          <p>
            Ofrecer servicios de rehabilitación personalizados y de alta calidad 
            para mejorar el bienestar y la calidad de vida de los pacientes, 
            con un enfoque ético y profesional.
          </p>
        </AboutCard>

        <AboutCard type="vision" title="Visión">
          <p>
            Ser líderes en fisioterapia y kinesiología, reconocidos por la 
            excelencia y la innovación en el cuidado de la salud, expandiendo 
            nuestros servicios para atender las necesidades cambiantes de los pacientes.
          </p>
        </AboutCard>

        <AboutCard type="values" title="Valores">
          <ul>
            <li>Eficiencia</li>
            <li>Seguridad</li>
            <li>Integridad</li>
            <li>Profesionalismo</li>
            <li>Empatía</li>
            <li>Colaboración</li>
          </ul>
        </AboutCard>

      </div>
    </section>
  );
};

export default AboutUs;
