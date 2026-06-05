import os
import re
import sys
import pypdf

sys.stdout.reconfigure(encoding='utf-8')

pdf_dir = r"c:\Users\23353247239\Desktop\antigravity\campaña ferraro\maxi ferraro documentos"
output_file = r"c:\Users\23353247239\Desktop\antigravity\campaña ferraro\scratch\extracted_policies.txt"

def clean_text(text):
    # Remove weird double spaces or space between characters if any, but keep paragraphs
    return re.sub(r'\s+', ' ', text)

def search_policies():
    results = []
    terms = ["imei", "celular", "tributar", "pyme", "ingresos brutos", "fiscal", "seguridad de proximidad"]
    
    with open(output_file, "w", encoding="utf-8") as out:
        out.write("DETAILED POLICY EXTRACTIONS\n")
        out.write("========================================================================\n\n")
        
        for filename in os.listdir(pdf_dir):
            if not filename.endswith(".pdf"):
                continue
            filepath = os.path.join(pdf_dir, filename)
            
            try:
                reader = pypdf.PdfReader(filepath)
                out.write(f"\nFILE: {filename}\n")
                out.write("=" * 60 + "\n")
                
                for i, page in enumerate(reader.pages):
                    text = page.extract_text() or ""
                    # Split into sentences or lines
                    lines = text.split('\n')
                    for line in lines:
                        if any(t.lower() in line.lower() for t in terms):
                            out.write(f"[Page {i+1}] {line.strip()}\n")
                            
            except Exception as e:
                out.write(f"Error reading {filename}: {e}\n")
                
    print("Done. Written to", output_file)

if __name__ == "__main__":
    search_policies()
