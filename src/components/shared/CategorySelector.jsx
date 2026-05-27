import './CategorySelector.css';

const CATEGORIES = [
  { value: 'ok', label: 'Bo\'sh holat', emoji: '👌', accent: 'ok' },
  { value: 'qisish', label: 'Qo\'lni qisish', emoji: '✊', accent: 'qisish' },
  { value: 'yoyish', label: 'Qo\'lni yoyish', emoji: '🫴', accent: 'yoyish' },
];

function CategorySelector({ value, onChange }) {
  return (
    <div className="category-selector" role="radiogroup" aria-label="Gestura kategoriyasi">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.value}
          type="button"
          role="radio"
          aria-checked={value === cat.value}
          className={`category-chip category-${cat.accent} ${value === cat.value ? 'is-active' : ''}`}
          onClick={() => onChange(cat.value)}
        >
          <span className="category-emoji" aria-hidden="true">{cat.emoji}</span>
          <span className="category-label">{cat.label}</span>
        </button>
      ))}
    </div>
  );
}

export default CategorySelector;
