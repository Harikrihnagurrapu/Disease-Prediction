import React, { useState, useRef } from "react";
import { CircularProgress } from '@mui/material';
import '../../assets/styles/user-liver.css';

const LiverDiseasePrediction = () => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setResult(null); // Reset result when a new file is selected
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file to analyze.");
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 2000)); // 2 second delay

      // Simulated response
      const simulatedResult = {
        fileName: file.name,
        prediction: Math.random() > 0.5 ? "Likely not to have liver disease" : "May have liver disease"
      };

      setResult(simulatedResult);
    } catch (error) {
      console.error("Error analyzing report:", error);
      alert("An error occurred while analyzing the report. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="prediction-content">
      <h1>Liver Disease Prediction</h1>
      <div className="upload-card">
        <h2>Upload Blood Report</h2>
        <form onSubmit={handleSubmit}>
          <p>Select a PDF file</p>
          <div className="file-input-container">
            <label className="file-input-label" htmlFor="file-upload">
              Choose File
            </label>
            <input
              id="file-upload"
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
          </div>
          {file && (
            <p className="file-name">{file.name}</p>
          )}
          <button className="analyze-button" type="submit" disabled={isLoading}>
            {isLoading ? "Analyzing..." : "Analyze Report"}
          </button>
        </form>
      </div>
      
      {isLoading && (
        <div className="loading-indicator">
          <CircularProgress size={40} thickness={4} />
          <p>Analyzing report, please wait...</p>
        </div>
      )}
      
      {result && (
        <div className="result-container">
          <h3>Prediction Result</h3>
          <table className="prediction-table">
            <thead>
              <tr>
                <th>FILE NAME</th>
                <th>PREDICTION</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{result.fileName}</td>
                <td className={result.prediction.includes("not") ? "negative-prediction" : "positive-prediction"}>
                  {result.prediction}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LiverDiseasePrediction;