import './FeatureGrid.css';

function FeatureGrid({ features, value, onChange }) {
  return (
    <div className="feature-grid" role="radiogroup">
      {features.map((feature) => (
        <button
          key={feature.value}
          type="button"
          role="radio"
          aria-checked={value === feature.value}
          className={`feature-btn ${value === feature.value ? 'is-active' : ''}`}
          onClick={() => onChange(feature.value)}
        >
          {feature.label}
        </button>
      ))}
    </div>
  );
}

export default FeatureGrid;
