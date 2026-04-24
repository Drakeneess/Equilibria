import "./pdfmodal.css";

export default function PDFModal({ isOpen, onClose, file }) {
  if (!isOpen) return null;

  return (
    <div className="pdfmodal-overlay" onClick={onClose}>
      <div
        className="pdfmodal-content"
        onClick={(e) => e.stopPropagation()}
      >

        <div className="pdfmodal-header">
          <span>Documento</span>
          <button onClick={onClose}>Cerrar</button>
        </div>

        <iframe
          src={file}
          title="Documento legal"
          className="pdfmodal-frame"
        />

      </div>
    </div>
  );
}