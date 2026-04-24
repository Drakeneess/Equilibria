import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./trustbar.css";

export default function TrustBar() {
  return (
    <section className="trustbar">
      <div className="trustbar-container">

        <div className="trust-items">
          <div className="trust-item">
            <FaCheckCircle />
            <span>Empresa registrada</span>
          </div>

          <div className="trust-item">
            <FaCheckCircle />
            <span>Licencia vigente</span>
          </div>

          <div className="trust-item">
            <FaCheckCircle />
            <span>Centro habilitado</span>
          </div>
        </div>

        <Link to="/legal" className="trustbar-link">
          Ver respaldo legal →
        </Link>

      </div>
    </section>
  );
}