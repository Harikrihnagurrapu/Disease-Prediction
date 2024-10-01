import React, { useState } from "react";
import axios from 'axios';

const KidneyDiseasePrediction = () => {
  const [formData, setFormData] = useState({
    age: '',
    blood_pressure: '',
    specific_gravity: '',
    albumin: '',
    sugar: '',
    red_blood_cells: '',
    pus_cell: '',
    pus_cell_clumps: '',
    bacteria: '',
    blood_glucose_random: '',
    blood_urea: '',
    serum_creatinine: '',
    sodium: '',
    potassium: '',
    hemoglobin: '',
    packed_cell_volume: '',
    white_blood_cell_count: '',
    red_blood_cell_count: '',
    hypertension: '',
    diabetes_mellitus: '',
    coronary_artery_disease: '',
    appetite: '',
    pedal_edema: '',
    anemia: '',
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
      const response = await axios.post('/api/predict-kidney-disease', formData);
      setPrediction(response.data);
    } catch (error) {
      console.error('Error predicting kidney disease:', error);
      alert('An error occurred while analyzing the data. Please try again.');
    }
  };

  return (
    <div className="prediction-content">
      <h1>Kidney Disease Prediction</h1>
      <div className="card">
        <h3>Enter Patient Data</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input type="number" id="age" name="age" value={formData.age} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="blood_pressure">Blood Pressure</label>
            <input type="number" id="blood_pressure" name="blood_pressure" value={formData.blood_pressure} onChange={handleInputChange} required />
          </div>
          {/* Add more form inputs for other kidney disease factors */}
          <button type="submit" className="btn-primary">Predict</button>
        </form>
      </div>
      {prediction && (
        <div className="card result-card">
          <h3>Prediction Result</h3>
          <p>
            {prediction.prediction
              ? "The patient may have kidney disease."
              : "The patient is likely not to have kidney disease."}
          </p>
          <p>Probability: {(prediction.probability * 100).toFixed(2)}%</p>
        </div>
      )}
    </div>
  );
};

export default KidneyDiseasePrediction;