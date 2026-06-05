import pypdf
import sys

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r"c:\Users\23353247239\Desktop\antigravity\campaña ferraro\maxi ferraro documentos\Análisis Político de Maximiliano Ferraro.pdf"
reader = pypdf.PdfReader(pdf_path)

with open(r"c:\Users\23353247239\Desktop\antigravity\campaña ferraro\scratch\pages_extracted.txt", "w", encoding="utf-8") as out:
    for p in [10, 11, 12]:
        out.write(f"\n================ PAGE {p+1} ================\n")
        out.write(reader.pages[p].extract_text() or "")
print("Done. Saved to scratch/pages_extracted.txt")
