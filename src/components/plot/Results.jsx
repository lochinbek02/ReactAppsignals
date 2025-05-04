import React, { useState } from 'react';
import axios from 'axios';
import './Results.css';

function Results() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [modelResults, setModelResults] = useState([]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      setUploadMessage("Please select a file before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('https://signalpro-production.up.railway.app/api/upload-csv/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // API natijalarini o‘rnatish
      setUploadMessage(response.data.message || "File uploaded successfully.");
      setModelResults(response.data.results || []);
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadMessage("An error occurred while uploading the file.");
    }
  };

  return (
    <>
      <div className="results-form-c">
        <h1>Upload CSV File</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="file-input-c"
          />
          <button type="submit" className="upload-button-c">
            Upload
          </button>
        </form>
        {uploadMessage && <p className="upload-message-c">{uploadMessage}</p>}
      </div>
      {modelResults.length > 0 && (
        <div className="model-results">
          <h2>Model natijalari:</h2>
          <table className="results-table">
            <thead>
              <tr>
                <th>Model</th>
                <th>Aniqlik</th>
                <th>Klassifikatsiya Hisoboti</th>
              </tr>
            </thead>
            <tbody>
              {modelResults.map((result, index) => (
                <tr key={index}>
                  <td>{result.model}</td>
                  <td>{result.accuracy.toFixed(2)*100}%</td>
                  <td>
                    <pre>{JSON.stringify(result.classification_report, null, 2)}</pre>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default Results;
