import { useEffect, useRef, useState } from 'react';
import apiClient from '../../api';
import './Results.css';

function Results() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');
  const [modelResults, setModelResults] = useState([]);
  const [bestModel, setBestModel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const safeSet = (setter) => (value) => {
    if (mountedRef.current) setter(value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && !file.name.endsWith('.csv')) {
      setError('Faqat CSV fayl tanlash mumkin');
      setSelectedFile(null);
      return;
    }
    setError('');
    setSelectedFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setError('Avval CSV fayl tanlang');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    setLoading(true);
    setError('');
    setMessage('');
    setModelResults([]);
    setBestModel(null);

    try {
      const { data } = await apiClient.post('/api/upload-csv/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      safeSet(setMessage)(data.message || 'Fayl muvaffaqiyatli qayta ishlandi');
      safeSet(setModelResults)(data.results || []);
      safeSet(setBestModel)(data.best_model || null);
      safeSet(setSelectedFile)(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err) {
      safeSet(setError)(err.response?.data?.error || "Faylni yuklashda xato. Qayta urinib ko'ring.");
    } finally {
      safeSet(setLoading)(false);
    }
  };

  return (
    <main className="res-page page">
      <div className="container">
        <header className="plot-header">
          <span className="plot-eyebrow">ML Modellar</span>
          <h1>CSV yuklang va modellarni sinab ko&apos;ring</h1>
          <p>Tayyorlangan CSV faylni yuklab, 4 xil ML modelning aniqligini ko&apos;ring.</p>
        </header>

        <div className="res-card">
          <form className="res-form" onSubmit={handleSubmit}>
            <label htmlFor="csv-upload" className="res-dropzone">
              <input
                id="csv-upload"
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                aria-label="CSV faylni tanlash"
              />
              <span className="res-dropzone-icon" aria-hidden="true">📂</span>
              <span className="res-dropzone-text">
                {selectedFile ? selectedFile.name : 'CSV faylni tanlang'}
              </span>
              <span className="res-dropzone-hint">
                {selectedFile
                  ? `Hajmi: ${(selectedFile.size / 1024).toFixed(1)} KB`
                  : 'Bosing va CSV faylni tanlang'}
              </span>
            </label>

            <button type="submit" className="res-submit" disabled={loading || !selectedFile}>
              {loading ? (
                <>
                  <span className="cls-spinner" aria-hidden="true" />
                  <span>Modellar o&apos;qitilmoqda...</span>
                </>
              ) : (
                <>
                  <span aria-hidden="true">🚀</span>
                  <span>Yuklab tahlil qilish</span>
                </>
              )}
            </button>

            {error && <p className="res-error" role="alert">{error}</p>}
            {message && !error && <p className="res-success" role="status">{message}</p>}
          </form>
        </div>

        {modelResults.length > 0 && (
          <section className="res-results fade-in-up">
            {bestModel && (
              <div className="res-best">
                <span className="res-best-label">Eng yaxshi model</span>
                <h3 className="res-best-name">{bestModel.model}</h3>
                <div className="res-best-accuracy">
                  {(bestModel.accuracy * 100).toFixed(2)}%
                </div>
              </div>
            )}

            <div className="res-models">
              {modelResults.map((result) => (
                <div
                  key={result.model}
                  className={`res-model ${bestModel?.model === result.model ? 'is-best' : ''}`}
                >
                  <div className="res-model-header">
                    <h4>{result.model}</h4>
                    <span className="res-model-accuracy">
                      {(result.accuracy * 100).toFixed(2)}%
                    </span>
                  </div>
                  <details className="res-model-report">
                    <summary>Batafsil hisobot</summary>
                    <pre>{JSON.stringify(result.classification_report, null, 2)}</pre>
                  </details>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

export default Results;
