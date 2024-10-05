import pdfplumber
import re
import sys
import io

# Path to the blood test PDF
pdf_path = "Sample_reports/Report2.pdf"  
# Change the standard output encoding to utf-8 to handle special characters
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# Function to extract text from each page of a PDF
def extract_text_from_pdf(pdf_path):
    text = ""
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text += page.extract_text() + "\n"
    return text

# Update the find_test_value function to handle the specific format in this report
def find_test_value(test_name, text):
    print(f"Searching for: {test_name}")  # Debug print
    
    test_name_mapping = {
        'Total_Bilirubin': ['Total Bilirubin', 'Bilirubin Total'],
        'Direct_Bilirubin': ['Direct Bilirubin', 'Conjugated Bilirubin', 'Bilirubin Direct'],
        'Alkaline_Phosphotase': ['Alkaline Phosphatase (ALP)', 'ALP', 'Alkaline Phosphatase', 'Alk Phos'],
        'Alamine_Aminotransferase': ['ALT (SGPT)', 'SGPT', 'ALT'],
        'Aspartate_Aminotransferase': ['AST (SGOT)', 'SGOT', 'AST'],
        'Total_Protiens': ['Total Protein', 'Total Proteins'],
        'Albumin': ['Albumin'],
        'Albumin_and_Globulin_Ratio': ['A : G Ratio', 'Albumin Globulin Ratio', 'A/G Ratio']
    }

    for possible_name in test_name_mapping.get(test_name, [test_name]):
        pattern = rf"{re.escape(possible_name)}.*?(\d+\.?\d*)\s*(?:mg/dL|g/dL|U/L|IU/L)"
        matches = re.findall(pattern, text, re.IGNORECASE | re.DOTALL)
        if matches:
            value = float(matches[-1])  # Take the last match
            print(f"Found {test_name}: {value}")  # Debug print
            return value

    print(f"Test '{test_name}' not found in the text.")  # Debug print
    return None

# Extract text from the PDF
extracted_text = extract_text_from_pdf(pdf_path)

# List of tests to search for (based on the model features)
tests_to_search = [
    'Age', 'Gender', 'Total_Bilirubin', 'Direct_Bilirubin',
    'Alkaline_Phosphotase', 'Alamine_Aminotransferase',
    'Aspartate_Aminotransferase', 'Total_Protiens', 'Albumin',
    'Albumin_and_Globulin_Ratio'
]

# Search for each test
results = []
for test in tests_to_search:
    if test == 'Age':
        age_match = re.search(r'(?:Age|DOB|Date of Birth).*?(\d+)', extracted_text, re.IGNORECASE | re.DOTALL)
        value = int(age_match.group(1)) if age_match else 0
        print(f"Age: {value}")  # Debug print
        results.append(value)
    elif test == 'Gender':
        gender_match = re.search(r'(?:Gender|Sex)\s*:?\s*(\w+)', extracted_text, re.IGNORECASE)
        value = 1 if gender_match and gender_match.group(1).lower() == 'female' else 0
        print(f"Gender: {'Female' if value == 1 else 'Male'}")  # Debug print
        results.append(value)
    else:
        value = find_test_value(test, extracted_text)
        results.append(value if value is not None else 0)

print(f"Final results: {results}")  # Debug print
