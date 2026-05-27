import './Spinner.css';

function Spinner({ size = 'md', label }) {
  return (
    <div className={`spinner-wrap spinner-${size}`} role="status" aria-live="polite">
      <div className="spinner-ring" />
      {label && <span className="spinner-label">{label}</span>}
    </div>
  );
}

export default Spinner;
