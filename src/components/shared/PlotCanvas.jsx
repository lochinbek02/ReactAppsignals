import Spinner from './Spinner';
import './PlotCanvas.css';

function PlotCanvas({ image, loading, error, emptyMessage = 'Boshlash uchun yuqoridan tugma tanlang' }) {
  return (
    <div className="plot-canvas" aria-live="polite">
      {loading && (
        <div className="plot-state">
          <Spinner size="lg" label="Grafik yuklanmoqda..." />
        </div>
      )}
      {!loading && error && (
        <div className="plot-state plot-state-error" role="alert">
          <span className="plot-state-icon" aria-hidden="true">⚠️</span>
          <p>{error}</p>
        </div>
      )}
      {!loading && !error && image && (
        <img
          src={image.startsWith('data:') ? image : `data:image/png;base64,${image}`}
          alt="Signal grafigi"
          className="plot-image fade-in"
        />
      )}
      {!loading && !error && !image && (
        <div className="plot-state plot-state-empty">
          <span className="plot-state-icon" aria-hidden="true">📈</span>
          <p>{emptyMessage}</p>
        </div>
      )}
    </div>
  );
}

export default PlotCanvas;
