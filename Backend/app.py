from flask import Flask, request, jsonify
from flask_cors import CORS
from liver_prediction import  predict_liver_func  # Import your liver disease prediction logic

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/predict_liver', methods=['POST'])
def predict_liver():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
    
    if file and file.filename.endswith('.pdf'):
        # Process the PDF file and make a prediction
        # This is where you'd call your liver disease prediction function
        prediction = predict_liver_func(file)
        # print(type(prediction))
        return jsonify({'prediction': prediction})
    else:
        return jsonify({'error': 'Invalid file type. Please upload a PDF.'}), 400

if __name__ == '__main__':
    app.run(debug=True)
