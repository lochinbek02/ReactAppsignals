import { useEffect, useState } from 'react';
import apiClient from '../../api';
import CategorySelector from '../shared/CategorySelector';
import FeatureGrid from '../shared/FeatureGrid';
import PlotCanvas from '../shared/PlotCanvas';
import './PlotPage.css';

const TIME_FEATURES = [
  { value: 'gplot', label: 'G' },
  { value: 'ssi', label: 'SSI' },
  { value: 'var', label: 'VAR' },
  { value: 'dasdv', label: 'DASDV' },
  { value: 'zcr', label: 'ZCR' },
  { value: 'mav', label: 'MAV' },
  { value: 'rms', label: 'RMS' },
  { value: 'wl', label: 'WL' },
  { value: 'aac', label: 'AAC' },
  { value: 'log', label: 'LOG' },
  { value: 'tm3', label: 'TM3' },
  { value: 'tm5', label: 'TM5' },
];

function TimeField() {
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
          <span className="plot-eyebrow">Vaqt sohasi</span>
          <h1>Vaqt sohasi tahlili</h1>
          <p>Signal xususiyatlarini vaqt domeni bo&apos;yicha hisoblang va vizual ko&apos;rsating.</p>
        </header>

        <section className="plot-section">
          <h2 className="plot-step-title">1. Gestura turini tanlang</h2>
          <CategorySelector value={category} onChange={(v) => { setCategory(v); setFeature(''); setImage(''); }} />
        </section>

        {category && (
          <section className="plot-section fade-in">
            <h2 className="plot-step-title">2. Xususiyatni tanlang</h2>
            <FeatureGrid features={TIME_FEATURES} value={feature} onChange={setFeature} />
          </section>
        )}

        {category && (
          <section className="plot-section fade-in">
            <PlotCanvas
              image={image}
              loading={loading}
              error={error}
              emptyMessage="Xususiyatni tanlasangiz grafik shu yerda ko'rinadi"
            />
          </section>
        )}
      </div>
    </main>
  );
}

export default TimeField;
