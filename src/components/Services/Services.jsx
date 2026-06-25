import { useState, useEffect } from "react";
import CategoryCarousel from "./CategoryCarousel";
import "./services.css";
import "./carousel.css";
import {
  getServicesProjectBackup,
  groupServicesByCategory
} from "../../utils/servicesBackup";

const API_URL = "https://api.equilibria.sbs/api/services.php";

const categoryThemes = [
  {
    start: "#1FB9A7",
    end: "#5CC3AD",
    soft: "rgba(31, 185, 167, 0.14)"
  },
  {
    start: "#7E57C2",
    end: "#BDA7D8",
    soft: "rgba(126, 87, 194, 0.14)"
  },
  {
    start: "#2E8B77",
    end: "#9DE0D2",
    soft: "rgba(46, 139, 119, 0.14)"
  },
  {
    start: "#6A4D99",
    end: "#9B7FCF",
    soft: "rgba(106, 77, 153, 0.14)"
  },
  {
    start: "#25A99A",
    end: "#D9C6FF",
    soft: "rgba(37, 169, 154, 0.14)"
  }
];

export default function Services() {
  const [categories, setCategories] = useState([]);
  const [servicesData, setServicesData] = useState({});
  const [activeCategory, setActiveCategory] = useState(0);

  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingServices, setLoadingServices] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
  async function loadServices() {
    try {
      setLoadingCategories(true);
      setLoadingServices(true);
      setError("");

      const categoriesResponse = await fetch(`${API_URL}?categories`);

      if (!categoriesResponse.ok) {
        throw new Error("No se pudieron cargar las categorías desde el API");
      }

      const servicesResponse = await fetch(API_URL);

      if (!servicesResponse.ok) {
        throw new Error("No se pudieron cargar los servicios desde el API");
      }

      const categoriesData = await categoriesResponse.json();
      const servicesData = await servicesResponse.json();

      const sortedCategories = [...categoriesData].sort((a, b) => a.id - b.id);
      const groupedServices = groupServicesByCategory(servicesData);

      setCategories(sortedCategories);
      setServicesData(groupedServices);
      setActiveCategory(0);
    } catch (apiError) {
      console.error("API falló. Cargando backup local:", apiError);

      try {
        const backup = await getServicesProjectBackup();

        const sortedCategories = [...backup.categories].sort((a, b) => a.id - b.id);
        const groupedServices = groupServicesByCategory(backup.services);

        setCategories(sortedCategories);
        setServicesData(groupedServices);
        setActiveCategory(0);
      } catch (backupError) {
        console.error("También falló el backup local:", backupError);
        setError("No pudimos cargar los servicios.");
      }
    } finally {
      setLoadingCategories(false);
      setLoadingServices(false);
    }
  }

  loadServices();
}, []);

  if (loadingCategories) {
    return (
      <section id="services" className="services">
        <div className="services-header">
          <span className="services-kicker">Tratamientos</span>

          <h2 className="section-title">
            Nuestros Servicios
          </h2>
        </div>

        <div className="services-shell skeleton-mode">
          <aside className="services-tabs">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="service-tab-skeleton" />
            ))}
          </aside>

          <div className="services-panel">
            <div className="services-panel-skeleton-title" />

            <div className="skeleton-cards">
              <div className="sk-card" />
              <div className="sk-card" />
              <div className="sk-card" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="services" className="services">
        <div className="services-header">
          <span className="services-kicker">Tratamientos</span>

          <h2 className="section-title">
            Nuestros Servicios
          </h2>

          <p className="services-error">{error}</p>
        </div>
      </section>
    );
  }

  const selectedCategory = categories[activeCategory];
  const selectedTheme = categoryThemes[activeCategory % categoryThemes.length];
  const selectedServices = selectedCategory
    ? servicesData[selectedCategory.name] || []
    : [];

  return (
    <section id="services" className="services">
      <div className="services-header">
        <span className="services-kicker">Tratamientos</span>

        <h2 className="section-title">
          Nuestros Servicios
        </h2>

        <p className="services-intro">
          Explora nuestras áreas de atención y encuentra el tratamiento más adecuado
          para tu proceso de recuperación, bienestar o mejora física.
        </p>
      </div>

      <div
        className="services-shell"
        style={{
          "--category-start": selectedTheme.start,
          "--category-end": selectedTheme.end,
          "--category-soft": selectedTheme.soft
        }}
      >
        <aside className="services-tabs" aria-label="Categorías de servicios">
          {categories.map((cat, index) => {
            const theme = categoryThemes[index % categoryThemes.length];
            const active = index === activeCategory;
            const total = servicesData[cat.name]?.length || 0;

            return (
              <button
                key={cat.id}
                type="button"
                className={`service-tab ${active ? "active" : ""}`}
                onClick={() => setActiveCategory(index)}
                style={{
                  "--tab-start": theme.start,
                  "--tab-end": theme.end,
                  "--tab-soft": theme.soft
                }}
              >
                <span className="service-tab-indicator" />

                <span className="service-tab-content">
                  <strong>{cat.name}</strong>
                  <small>{total} servicios</small>
                </span>
              </button>
            );
          })}
        </aside>

        <div className="services-panel">
          <div className="services-panel-header">
            <div>
              <span className="services-panel-kicker">Categoría activa</span>

              <h3>{selectedCategory?.name}</h3>
            </div>

            <span className="services-count">
              {selectedServices.length} servicios
            </span>
          </div>

          {loadingServices ? (
            <div className="skeleton-cards">
              <div className="sk-card" />
              <div className="sk-card" />
              <div className="sk-card" />
            </div>
          ) : selectedServices.length > 0 ? (
            <CategoryCarousel services={selectedServices} />
          ) : (
            <p className="services-empty">
              Todavía no hay servicios registrados en esta categoría.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}