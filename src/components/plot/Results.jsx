import React, { useState } from 'react';
import axios from 'axios';
import './Results.css';

function Results() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [modelResults, setModelResults] = useState(null);

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
      const response = await axios.post('https://singanlspro-production.up.railway.app/api/upload-csv/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      // Set the success message and model results
      setUploadMessage(response.data.message || "File uploaded successfully.");
      setModelResults({
        accuracy: response.data.accuracy,
        classificationReport: response.data.classification_report
      });
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
    {modelResults && (
        <div className="model-results">
          <h2>Model natijasi:</h2>
          <table className="results-table">
            <thead>
              <tr>
                <th></th>
                <th>Qiymatlar</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Aniqlik</td>
                <td>{modelResults.accuracy}</td>
              </tr>
              <tr>
                <td>Klassifikatsiya hisoboti</td>
                <td><pre>{modelResults.classificationReport}</pre></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
    
  );
}

export default Results;
