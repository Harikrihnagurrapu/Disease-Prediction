import React, { useState, useRef } from "react";
import '../../assets/styles/doctor-liver.css';

// Add this import at the top of your file
import { CircularProgress } from '@mui/material';

const LiverDiseasePrediction = () => {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const uniqueFiles = selectedFiles.filter(file => 
      !files.some(existingFile => existingFile.name === file.name)
    );
    setFiles(prevFiles => [...prevFiles, ...uniqueFiles]);
    setResults([]); // Reset results when new files are added
  };

  const handleRemoveFile = (index) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    setResults([]); // Reset results when a file is removed
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0) {
      alert("Please select at least one file to analyze.");
      return;
    }

    setIsLoading(true);
    setResults([]);

    // Simulating API call
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 2000)); // 2 second delay

      // Simulated response
      const simulatedResults = files.map(file => ({
        fileName: file.name,
        prediction: Math.random() > 0.2 ? "Likely not to have liver disease" : "May have liver disease"
      }));

      setResults(simulatedResults);
    } catch (error) {
      console.error("Error analyzing reports:", error);
      alert("An error occurred while analyzing the reports. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="prediction-content">
      <h1>Liver Disease Prediction</h1>
      <div className="upload-card">
        <h2>Upload Multiple Blood Reports</h2>
        <form onSubmit={handleSubmit}>
          <p>Select PDF files</p>
          <div className="file-input-container">
            <label className="file-input-label" htmlFor="file-upload">
              Choose Files
            </label>
            <input
              id="file-upload"
              type="file"
              accept=".pdf"
              multiple
              onChange={handleFileChange}
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
          </div>
          {files.length > 0 && (
            <p className="files-count">{files.length} file(s) selected</p>
          )}
          {files.length > 0 && (
            <div className="uploaded-files">
              <h3>Uploaded Files ({files.length})</h3>
              <ul>
                {files.map((file, index) => (
                  <li key={index}>
                    <span>{file.name}</span>
                    <button type="button" className="remove-file" onClick={() => handleRemoveFile(index)}>×</button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <button className="analyze-button" type="submit" disabled={isLoading}>
            {isLoading ? "Analyzing..." : "Analyze Reports"}
          </button>
        </form>
      </div>
      
      {isLoading && (
        <div className="loading-indicator">
          <CircularProgress size={40} thickness={4} />
          <p>Analyzing reports, please wait...</p>
        </div>
      )}
      
      {results.length > 0 && (
        <div className="result-container">
          <h3>Prediction Results</h3>
          <table className="prediction-table">
            <thead>
              <tr>
                <th>FILE NAME</th>
                <th>PREDICTION</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={index}>
                  <td>{result.fileName}</td>
                  <td className={result.prediction.includes("not") ? "negative-prediction" : "positive-prediction"}>
                    {result.prediction}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LiverDiseasePrediction;