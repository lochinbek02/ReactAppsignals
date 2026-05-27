import { useState } from 'react';
import apiClient from '../../api';
import './Classification.css';

const FEATURES = [
  'MAV', 'G', 'MAV1', 'MAV2', 'SSI', 'VAR', 'TM3', 'TM5',
  'RMS', 'LOG', 'WL', 'ZC', 'AAC', 'DASDV', 'FFT', 'PSR',
  'MNF', 'WAMP', 'IEMG', 'logDetect',
];

function Classification() {
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const toggleFeature = (feature) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]
    );
  };

  const selectAll = () => setSelectedFeatures(FEATURES);
  const clearAll = () => setSelectedFeatures([]);

  const handleSubmit = async () => {
    if (selectedFeatures.length === 0) {
      setError('Kamida bitta xususiyat tanlang');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const response = await apiClient.post(
        '/api/classification/',
        { features: selectedFeatures },
        { responseType: 'blob' }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'results.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      setSelectedFeatures([]);
    } catch (err) {
      setError('CSV yuklab olishda xato. Server holatini tekshiring.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="cls-page page">
      <div className="container">
        <header className="plot-header">
          <span className="plot-eyebrow">Classification</span>
          <h1>Xususiyatlarni tanlang</h1>
          <p>Tanlangan signal xususiyatlari uchun 3 ta sinf bo&apos;yicha CSV fayl yaratiladi.</p>
        </header>

        <div className="cls-card">
          <div className="cls-toolbar">
            <div className="cls-counter">
              <span className="cls-counter-num">{selectedFeatures.length}</span>
              <span className="cls-counter-label">/ {FEATURES.length} tanlangan</span>
            </div>
            <div className="cls-toolbar-actions">
              <button type="button" className="cls-link-btn" onClick={selectAll}>
                Hammasini tanlash
              </button>
              <button type="button" className="cls-link-btn" onClick={clearAll}>
                Tozalash
              </button>
            </div>
          </div>

          <fieldset className="cls-features">
            <legend className="sr-only">Signal xususiyatlari ro&apos;yxati</legend>
            {FEATURES.map((feature) => (
              <label
                key={feature}
                className={`cls-feature ${selectedFeatures.includes(feature) ? 'is-checked' : ''}`}
              >
                <input
                  type="checkbox"
                  value={feature}
                  checked={selectedFeatures.includes(feature)}
                  onChange={() => toggleFeature(feature)}
                  aria-label={feature}
                />
                <span className="cls-feature-label">{feature}</span>
              </label>
            ))}
          </fieldset>

          {error && <p className="cls-error" role="alert">{error}</p>}

          <button
            type="button"
            className="cls-submit"
            onClick={handleSubmit}
            disabled={loading || selectedFeatures.length === 0}
          >
            {loading ? (
              <>
                <span className="cls-spinner" />
                <span>Yaratilmoqda...</span>
              </>
            ) : (
              <>
                <span>📥</span>
                <span>CSV yuklab olish</span>
              </>
            )}
          </button>
        </div>
      </div>
    </main>
  );
}

export default Classification;
