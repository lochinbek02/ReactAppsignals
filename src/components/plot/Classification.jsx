import React, { useState } from 'react';
import axios from 'axios';
import './Classifications.css';

function Classification() {
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedFeatures([...selectedFeatures, value]);
    } else {
      setSelectedFeatures(selectedFeatures.filter(feature => feature !== value));
    }
  };

  const handleSubmit = async () => {
    setLoading(true); // Set loading to true when the submit button is clicked
    try {
      const response = await axios.post('https://signalpro-production.up.railway.app/api/classification/', {
        features: selectedFeatures,
      }, {
        responseType: 'blob', // CSV file ni olish uchun
      });

      // CSV faylni yuklab olish
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'results.csv'); // Fayl nomi
      document.body.appendChild(link);
      link.click();

      // Checkboxlarni tozalash
      setSelectedFeatures([]);
      document.querySelectorAll('.inputClassification').forEach(input => input.checked = false);

    } catch (error) {
      console.error('Error during feature submission:', error);
    } finally {
      setLoading(false); // Set loading to false after the request is finished
    }
  };

  const features = ['MAV', 'G', 'MAV1', 'MAV2', 'SSI', 'VAR', 'TM3', 'TM5', 'RMS', 'LOG', 'WL', 'ZC', 'AAC', 'DASDV', 'FFT', 'PSR', 'MNF', 'WAMP', 'IEMG', 'logDetect'];

  return (
    <div className="classificationform">
      <h1>Classifications</h1>
      <form className='formClassification'>
        {features.map((feature) => (
          <div className='divClassification' key={feature}>
            <input
              className="inputClassification"
              type="checkbox"
              value={feature}
              onChange={handleCheckboxChange}
              aria-label={`Select ${feature}`}
            />
            <label>{feature}</label>
          </div>
        ))}
      </form>
      <button
        className={`buttonClassification ${loading ? 'loading' : ''}`} // Add the loading class when loading
        onClick={handleSubmit}
        disabled={loading} // Disable button during loading
      >
        {loading ? (
          <span className="spinner"></span> // Show spinner when loading
        ) : (
          'Submit'
        )}
      </button>
    </div>
  );
}

export default Classification;
