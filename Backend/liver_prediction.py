import pickle
import numpy as np
from extract import extract_medical_data

# Load the model
def predict_liver_func(file):
    with open('models/LiverDisease.pkl', 'rb') as model_file:
        liver_model = pickle.load(model_file)

    input_data = extract_medical_data(file)

    def predict_liver_disease(input_data):
        input_array = np.array(input_data).reshape(1, -1)
        prediction = liver_model.predict(input_array)
        probability = liver_model.predict_proba(input_array)
        
        if prediction[0] == 1:
            result = f"Prediction: Liver disease detected\n Probability of liver disease: {probability[0][1]:.2f}"
        else:
            result = f"Prediction: No liver disease detected\n Probability of no liver disease: {probability[0][0]:.2f}"
        
        return result

    return predict_liver_disease(input_data)
