import { useEffect, useState } from 'react';
import apiClient from '../../api';
import CategorySelector from '../shared/CategorySelector';
import FeatureGrid from '../shared/FeatureGrid';
import PlotCanvas from '../shared/PlotCanvas';
import './PlotPage.css';

const FREQUENCY_FEATURES = [
  { value: 'Fourier', label: 'FFT' },
];

function Frequency() {
  const [category, setCategory] = useState('');
  const [feature, setFeature] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!category || !feature) return;

    let cancelled = false;
    setLoading(true);
    setError('');
    setImage('');

    apiClient
      .get(`/api/${category}/${feature}/`)
      .then(({ data }) => {
        if (!cancelled) setImage(data.image);
      })
      .catch(() => {
        if (!cancelled) setError('Grafikni yuklab bo\'lmadi. Internetni yoki server holatini tekshiring.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [category, feature]);

  return (
    <main className="plot-page page">
      <div className="container">
        <header className="plot-header">
          <span className="plot-eyebrow">Chastota sohasi</span>
          <h1>Fourier transformatsiyasi</h1>
          <p>Signalning chastota tarkibini FFT yordamida tahlil qiling.</p>
        </header>

        <section className="plot-section">
          <h2 className="plot-step-title">1. Gestura turini tanlang</h2>
          <CategorySelector value={category} onChange={(v) => { setCategory(v); setFeature(''); setImage(''); }} />
        </section>

        {category && (
          <section className="plot-section fade-in">
            <h2 className="plot-step-title">2. Transformatsiyani tanlang</h2>
            <FeatureGrid features={FREQUENCY_FEATURES} value={feature} onChange={setFeature} />
          </section>
        )}

        {category && (
          <section className="plot-section fade-in">
            <PlotCanvas
              image={image}
              loading={loading}
              error={error}
              emptyMessage="FFT'ni tanlasangiz spektr shu yerda ko'rinadi"
            />
          </section>
        )}
      </div>
    </main>
  );
}

export default Frequency;
