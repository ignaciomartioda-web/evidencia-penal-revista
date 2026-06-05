import os
import re
import sys
import pypdf

# Set standard output to UTF-8
sys.stdout.reconfigure(encoding='utf-8')

pdf_dir = r"c:\Users\23353247239\Desktop\antigravity\campaña ferraro\maxi ferraro documentos"
output_file = r"c:\Users\23353247239\Desktop\antigravity\campaña ferraro\scratch\pdf_detailed_extraction.txt"

def extract_pdf_content():
    results = []
    
    for filename in os.listdir(pdf_dir):
        if not filename.endswith(".pdf"):
            continue
        filepath = os.path.join(pdf_dir, filename)
        
        try:
            reader = pypdf.PdfReader(filepath)
            text = ""
            for i, page in enumerate(reader.pages):
                text += f"\n--- PAGE {i+1} ---\n"
                text += page.extract_text() or ""
            
            results.append((filename, text))
        except Exception as e:
            results.append((filename, f"Error reading: {e}"))
            
    with open(output_file, "w", encoding="utf-8") as out:
        out.write("========================================================================\n")
        out.write("DETAILED PDF EXTRACTION FOR FERRARO CAMPAIGN\n")
        out.write("========================================================================\n\n")
        
        # 1. Search for Corredores and Comunas in "Estrategia Política Ferraro CABA.pdf" or others
        out.write("=== SECTION 1: CORREDORES & COMUNAS ===\n")
        for fname, text in results:
            if "Estrategia" in fname or "ejemplos" in fname:
                out.write(f"\n--- From file: {fname} ---\n")
                # Look for Corredor lines and paragraphs
                corredor_matches = re.finditer(r'(?i)(corredor\s+(centro|norte|sur|oeste|centro-oeste|estratégico).{1,500})', text, re.DOTALL)
                for match in corredor_matches:
                    out.write(f"Match: {match.group(0).strip()}\n")
                    out.write("-" * 40 + "\n")
                    
        # 2. Search for "Bloqueo IMEI" / "Celulares" / "IMEI"
        out.write("\n\n=== SECTION 2: SEGURIDAD / IMEI / CELULARES ===\n")
        for fname, text in results:
            if any(t in fname.lower() for t in ["estrategia", "ejemplos", "politico"]):
                out.write(f"\n--- From file: {fname} ---\n")
                imei_matches = re.finditer(r'(?i)(.{1,100}(imei|celular|seguridad de proximidad|mercado negro).{1,400})', text, re.DOTALL)
                for match in imei_matches:
                    out.write(f"Match: {match.group(0).strip()}\n")
                    out.write("-" * 40 + "\n")
                    
        # 3. Search for "Alivio Tributario" / "PyME"
        out.write("\n\n=== SECTION 3: ALIVIO TRIBUTARIO / PYME ===\n")
        for fname, text in results:
            if any(t in fname.lower() for t in ["estrategia", "ejemplos", "politico", "campana"]):
                out.write(f"\n--- From file: {fname} ---\n")
                pyme_matches = re.finditer(r'(?i)(.{1,100}(pyme|tributario|ingresos brutos|alivio tributario|impuesto).{1,400})', text, re.DOTALL)
                for match in pyme_matches:
                    out.write(f"Match: {match.group(0).strip()}\n")
                    out.write("-" * 40 + "\n")

    print(f"Extraction complete. Written to {output_file}")

if __name__ == "__main__":
    extract_pdf_content()
