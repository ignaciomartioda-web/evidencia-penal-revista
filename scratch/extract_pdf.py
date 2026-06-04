import os
from pypdf import PdfReader

docs_dir = "maxi ferraro documentos"
pdf_files = [f for f in os.listdir(docs_dir) if f.endswith(".pdf")]

print("Found PDFs:", pdf_files)

for pdf_file in pdf_files:
    path = os.path.join(docs_dir, pdf_file)
    reader = PdfReader(path)
    print(f"\n=== File: {pdf_file} (Pages: {len(reader.pages)}) ===")
    
    # Extract first 500 chars and search for tables
    full_text = ""
    for idx, page in enumerate(reader.pages):
        text = page.extract_text()
        full_text += text
        
        # Look for table-like structures (multiple spaces, numbers, headers)
        lines = text.splitlines()
        for line in lines:
            if "|" in line or "  " in line:
                # possible table row
                pass
                
    # Save extracted text to a text file for deep analysis
    out_name = pdf_file.replace(".pdf", "_extracted.txt")
    out_path = os.path.join("scratch", out_name)
    with open(out_path, "w", encoding="utf-8") as out_f:
        out_f.write(full_text)
        
    print(f"Extracted {len(full_text)} characters to {out_path}")
