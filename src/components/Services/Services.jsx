import { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import CategoryCarousel from "./CategoryCarousel";
import "./services.css";

export default function Services() {
  const [categories, setCategories] = useState([]);
  const [servicesData, setServicesData] = useState({});
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingServices, setLoadingServices] = useState(true);

  // siempre máximo 2 categorías abiertas
  const [activeCategories, setActiveCategories] = useState([0, 1]);

  const API_URL = "https://api.equilibria.sbs/api/services.php";

  /*
  |--------------------------------------------------------------
  | Abrir categorías (máximo 2)
  |--------------------------------------------------------------
  */
  const toggleCategory = (i) => {
    setActiveCategories((current) => {
      // si ya está abierta no hacemos nada
      if (current.includes(i)) return current;

      const updated = [...current, i];

      // mantener solo 2
      if (updated.length > 2) {
        updated.shift();
      }

      return updated;
    });
  };

  /*
  |--------------------------------------------------------------
  | 1. Obtener categorías
  |--------------------------------------------------------------
  */
  useEffect(() => {
    fetch(`${API_URL}?categories`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setLoadingCategories(false);
      })
      .catch((err) => console.error("Error cargando categorías:", err));
  }, []);

  /*
  |--------------------------------------------------------------
  | 2. Obtener servicios
  |--------------------------------------------------------------
  */
  useEffect(() => {
    if (loadingCategories) return;

    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {

        const grouped = {};

        data.forEach((service) => {
          const cat = service.category;

          if (!grouped[cat]) grouped[cat] = [];
          grouped[cat].push(service);
        });

        setServicesData(grouped);
        setLoadingServices(false);
      })
      .catch((err) => console.error("Error cargando servicios:", err));

  }, [loadingCategories]);

  /*
  |--------------------------------------------------------------
  | Skeleton inicial
  |--------------------------------------------------------------
  */
  if (loadingCategories) {
    return (
      <section id="services" className="services">
        <h2 className="section-title">
          <span className="title-inner" data-icon="🪅">Servicios</span>
        </h2>

        {[...Array(3)].map((_, i) => (
          <div key={i} className="category-skeleton">
            <div className="skeleton-header" />

            <div className="skeleton-cards">
              <div className="sk-card" />
              <div className="sk-card" />
              <div className="sk-card" />
            </div>
          </div>
        ))}
      </section>
    );
  }

  return (
    <section id="services" className="services">

      <h2 className="section-title">
        <span className="title-inner" data-icon="🪅">Nuestros Servicios</span>
      </h2>

      {[...categories]
        .sort((a, b) => a.id - b.id)
        .map((cat, index) => {

          const services = servicesData[cat.name] || [];
          const open = activeCategories.includes(index);

          return (
            <div
              key={cat.id}
              className={`service-category ${open ? "active" : ""}`}
            >

              <div
                className="category-header"
                onClick={() => toggleCategory(index)}
              >
                <h3 className="category-title">{cat.name}</h3>

                <FaChevronDown
                  className={`chevron ${open ? "rotated" : ""}`}
                />
              </div>

              <div
                className="services-grid-wrapper"
                style={{
                  maxHeight: open ? "700px" : "0",
                  opacity: open ? 1 : 0,
                }}
              >

                {loadingServices ? (
                  <div className="skeleton-cards">
                    <div className="sk-card" />
                    <div className="sk-card" />
                    <div className="sk-card" />
                  </div>
                ) : (
                  <CategoryCarousel services={services} />
                )}

              </div>
            </div>
          );
        })}
    </section>
  );
}