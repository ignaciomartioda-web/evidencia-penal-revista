import os
import re

# Read data.js content
with open("js/data.js", "r", encoding="utf-8") as f:
    data_content = f.read()

# Helper to remove HTML tags and normalize text
def normalize(text):
    text = re.sub(r'<[^>]*>', ' ', text)
    text = re.sub(r'\s+', ' ', text)
    return text.strip().lower()

normalized_data = normalize(data_content)

extracted_files = [f for f in os.listdir("scratch") if f.endswith("_extracted.txt") and f != "missing_rows_output.txt"]

print("=== RUNNING RAG DATA INTEGRITY AUDIT ===")
for filename in extracted_files:
    path = os.path.join("scratch", filename)
    with open(path, "r", encoding="utf-8") as f:
        text = f.read()
    
    # Let's check sections or major headers
    # Find all numbered headings in the text file like "1. Resumen", "2.1. Gestión", "Módulo 1", etc.
    headings = re.findall(r'(?:\d+\.|\d+\.\d+\.|\bMódulo\s+\d+)\s+([A-ZÁÉÍÓÚÑa-záéíóúñ\s:,\-\(\)\&]+)', text)
    
    print(f"\nDocument: {filename}")
    missing_count = 0
    total_checked = 0
    for h in headings:
        h_clean = h.strip()
        if len(h_clean) < 10:
            continue
        total_checked += 1
        h_norm = normalize(h_clean)
        # Check if heading exists in data.js
        if h_norm not in normalized_data:
            # Try searching with sub-components to account for formatting changes
            words = h_norm.split()
            found_words = True
            for i in range(len(words)-2):
                phrase = " ".join(words[i:i+3])
                if phrase not in normalized_data:
                    found_words = False
                    break
            if not found_words:
                print(f"  [MISSING/MISMATCH] Header: '{h_clean}'")
                missing_count += 1
    print(f"  Checked {total_checked} headers. Missing/Mismatch: {missing_count}")
