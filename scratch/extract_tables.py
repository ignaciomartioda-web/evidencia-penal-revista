import pypdf
import os

pdf_path = r"c:\Users\23353247239\Desktop\antigravity\campaña ferraro\maxi ferraro documentos\Análisis Político de Maximiliano Ferraro.pdf"
reader = pypdf.PdfReader(pdf_path)

print("Total pages:", len(reader.pages))
for i, page in enumerate(reader.pages):
    text = page.extract_text() or ""
    if "foda" in text.lower() or "debilidades" in text.lower() or "fortalezas" in text.lower():
        print(f"--- Page {i+1} ---")
        lines = text.split('\n')
        for line in lines:
            if any(k in line.lower() for k in ["foda", "swot", "fortaleza", "debilidad", "oportunidades", "amenazas", "cuadro"]):
                print(line.strip())
