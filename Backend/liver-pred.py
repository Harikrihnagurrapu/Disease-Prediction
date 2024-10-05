import pickle
import numpy as np
from extract import extract_medical_data

# Load the model
with open('models/LiverDisease.pkl', 'rb') as model_file:
    liver_model = pickle.load(model_file)

# Predefined input data (now with all 10 features)
# input_data = [
#     45,    # Age
#     1,     # Gender (1 for Female, 0 for Male)
#     0.7,   # Total_Bilirubin
#     0.1,   # Direct_Bilirubin
#     187,   # Alkaline_Phosphotase
#     16,    # Alamine_Aminotransferase
#     18,    # Aspartate_Aminotransferase
#     6.8,   # Total_Protiens
#     3.3,   # Albumin
#     0.9    # Albumin_and_Globulin_Ratio
# ]

input_data = extract_medical_data("Sample_reports/Report2.pdf");
# Function to make prediction
def predict_liver_disease(input_data):
    # Ensure input_data is a 2D numpy array
    input_array = np.array(input_data).reshape(1, -1)
    
    # Make prediction
    prediction = liver_model.predict(input_array)
    probability = liver_model.predict_proba(input_array)
    
    return prediction[0], probability[0]

# Main execution
if __name__ == "__main__":
    # Make prediction
    prediction, probability = predict_liver_disease(input_data)
    
    # Print input data
    # print("Input Data:")
    # print(f"Age: {input_data[0]}")
    # print(f"Gender: {'Female' if input_data[1] == 1 else 'Male'}")
    # print(f"Total Bilirubin: {input_data[2]}")
    # print(f"Direct Bilirubin: {input_data[3]}")
    # print(f"Alkaline Phosphotase: {input_data[4]}")
    # print(f"Alamine Aminotransferase: {input_data[5]}")
    # print(f"Aspartate Aminotransferase: {input_data[6]}")
    # print(f"Total Proteins: {input_data[7]}")
    # print(f"Albumin: {input_data[8]}")
    # print(f"Albumin and Globulin Ratio: {input_data[9]}")
    # print()

    # Print result
    if prediction == 1:
        print("Prediction: Liver disease detected")
        print(f"Probability of liver disease: {probability[1]:.2f}")
    else:
        print("Prediction: No liver disease detected")
        print(f"Probability of no liver disease: {probability[0]:.2f}")

    # Print model feature names (corrected line)
    # print(f"Model feature names: {liver_model.feature_names_in_}")
