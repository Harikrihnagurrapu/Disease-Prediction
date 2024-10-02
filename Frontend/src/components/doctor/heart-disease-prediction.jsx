import React, { useState } from "react";
import axios from 'axios';

const HeartDiseasePrediction = () => {
  const [formData, setFormData] = useState({
    age: '',
    sex: '',
    cp: '',
    trestbps: '',
    chol: '',
    fbs: '',
    restecg: '',
    thalach: '',
    exang: '',
    oldpeak: '',
    slope: '',
    ca: '',
    thal: '',
  });
  const [prediction, setPrediction] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/predict-heart-disease', formData);
      setPrediction(response.data);
    } catch (error) {
      console.error('Error predicting heart disease:', error);
      alert('An error occurred while analyzing the data. Please try again.');
    }
  };

  return (
    <div className="prediction-content">
      <h1>Heart Disease Prediction</h1>
      <div className="card">
        <h3>Enter Patient Data</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input type="number" id="age" name="age" value={formData.age} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="sex">Sex</label>
            <select id="sex" name="sex" value={formData.sex} onChange={handleInputChange} required>
              <option value="">Select</option>
              <option value="1">Male</option>
              <option value="0">Female</option>
            </select>
          </div>
          {/* Add more form inputs for other heart disease factors */}
          <button type="submit" className="btn-primary">Predict</button>
        </form>
      </div>
      {prediction && (
        <div className="card result-card">
          <h3>Prediction Result</h3>
          <p>
            {prediction.prediction
              ? "The patient may have heart disease."
              : "The patient is likely not to have heart disease."}
          </p>
          <p>Probability: {(prediction.probability * 100).toFixed(2)}%</p>
        </div>
      )}
    </div>
  );
};

export default HeartDiseasePrediction;