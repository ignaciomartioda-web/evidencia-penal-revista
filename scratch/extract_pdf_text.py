import os
import sys
import re

try:
    import pypdf
    print("pypdf available")
except ImportError:
    try:
        import PyPDF2 as pypdf
        print("PyPDF2 available")
    except ImportError:
        pypdf = None
        print("No PDF reader available directly")

# Let's search inside the PDFs
pdf_dir = r"c:\Users\23353247239\Desktop\antigravity\campaña ferraro\maxi ferraro documentos"

search_terms = ["imei", "celular", "tributario", "pyme", "comuna", "corredor", "hotspot", "seguridad de proximidad", "alivio"]

if pypdf:
    for filename in os.listdir(pdf_dir):
        if filename.endswith(".pdf"):
            filepath = os.path.join(pdf_dir, filename)
            try:
                reader = pypdf.PdfReader(filepath)
                text = ""
                for page in reader.pages:
                    text += page.extract_text() or ""
                
                print(f"\n========================================\nFILE: {filename}\n========================================")
                print(f"Length of text: {len(text)}")
                
                # Check for search terms
                found = []
                for term in search_terms:
                    matches = list(re.finditer(r'(?i)' + re.escape(term), text))
                    if matches:
                        found.append(f"{term} ({len(matches)})")
                print("Found terms:", ", ".join(found))
                
                # Let's print snippets containing some terms
                lines = text.split('\n')
                snippets_shown = 0
                for line in lines:
                    if any(t.lower() in line.lower() for t in ["imei", "celular", "tributario", "pyme", "comuna", "corredor", "hotspot"]):
                        if snippets_shown < 15:
                            print("  Snippet:", line.strip())
                            snippets_shown += 1
            except Exception as e:
                print(f"Error reading {filename}: {e}")
else:
    print("Cannot read PDFs without a PDF library. Let's install pypdf.")
