import re
import PyPDF2

# Function to extract text from the PDF
def extract_text_from_pdf(pdf_file_path):
    with open(pdf_file_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        text = ''
        for page in reader.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text
    return text

# Function to extract necessary data using regular expressions
# Function to extract necessary data using regular expressions
def extract_data_from_text(text):
    data = {}

    # Use regular expressions to find the required fields
    age_match = re.search(r"(\d+)\s*Years", text, re.IGNORECASE)
    gender_match = re.search(r"(Male|Female)", text, re.IGNORECASE)
    total_bilirubin_match = re.search(r"(\d+\.\d+)\s*Bilirubin\s*Total", text, re.IGNORECASE)
    direct_bilirubin_match = re.search(r"(\d+\.\d+)\s*Bilirubin\s*Direct", text, re.IGNORECASE)
    alkaline_phosphatase_match = re.search(r"(\d+\.\d+)\s*Alkaline\s*Phosphatase", text, re.IGNORECASE)
    alt_match = re.search(r"(\d+\.\d+)\s*ALT\s*\(SGPT\)", text, re.IGNORECASE)
    ast_match = re.search(r"(\d+\.\d+)\s*AST\s*\(SGOT\)", text, re.IGNORECASE)
    
    # Adjusted regex for Total Proteins
    total_proteins_match = re.search(r"(\d+\.\d+)\s*Total\s*Protein", text, re.IGNORECASE)
    
    albumin_match = re.search(r"(\d+\.\d+)\s*Albumin", text, re.IGNORECASE)
    ag_ratio_match = re.search(r"(\d+\.\d+)\s*A\s*:\s*G\s*Ratio", text, re.IGNORECASE)

    # Store extracted data in a dictionary
    data['Age'] = age_match.group(1) if age_match else "Not found"
    data['Gender'] = gender_match.group(1) if gender_match else "Not found"
    data['Total Bilirubin'] = total_bilirubin_match.group(1) if total_bilirubin_match else "Not found"
    data['Direct Bilirubin'] = direct_bilirubin_match.group(1) if direct_bilirubin_match else "Not found"
    data['Alkaline Phosphatase'] = alkaline_phosphatase_match.group(1) if alkaline_phosphatase_match else "Not found"
    data['ALT (SGPT)'] = alt_match.group(1) if alt_match else "Not found"
    data['AST (SGOT)'] = ast_match.group(1) if ast_match else "Not found"
    data['Total Proteins'] = total_proteins_match.group(1) if total_proteins_match else "Not found"
    data['Albumin'] = albumin_match.group(1) if albumin_match else "Not found"
    data['Albumin and Globulin Ratio'] = ag_ratio_match.group(1) if ag_ratio_match else "Not found"

    return data


# Main function to extract and display the data
def main():
    pdf_file_path = r'..\first_try\sample_report.pdf'  # Path to your PDF file
    text = extract_text_from_pdf(pdf_file_path)
    extracted_data = extract_data_from_text(text)

    # Display the extracted data
    print("Extracted Data:")
    for key, value in extracted_data.items():
        print(f"{key}: {value}")

if __name__ == "__main__":
    main()
