import React, { useState, useRef } from "react";
import '../../assets/styles/liver-disease-prediction.css';

const LiverDiseasePrediction = () => {
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handleRemoveFile = (index) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Implement your file submission logic here
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
            <span className="files-selected">{files.length} files</span>
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
          <button className="analyze-button" type="submit">Analyze Reports</button>
        </form>
      </div>
    </div>
  );
};

export default LiverDiseasePrediction;