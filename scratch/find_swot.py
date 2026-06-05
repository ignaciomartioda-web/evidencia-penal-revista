import os
import re
import sys
import pypdf

pdf_dir = r"c:\Users\23353247239\Desktop\antigravity\campaña ferraro\maxi ferraro documentos"
output_file = r"c:\Users\23353247239\Desktop\antigravity\campaña ferraro\scratch\swot_finds.txt"

def find_swot():
    with open(output_file, "w", encoding="utf-8") as out:
        for filename in os.listdir(pdf_dir):
            if not filename.endswith(".pdf"):
                continue
            filepath = os.path.join(pdf_dir, filename)
            try:
                reader = pypdf.PdfReader(filepath)
                for i, page in enumerate(reader.pages):
                    text = page.extract_text() or ""
                    if "foda" in text.lower() or "swot" in text.lower() or "debilidades" in text.lower():
                        out.write(f"\n========================================\nFILE: {filename} - PAGE {i+1}\n========================================\n")
                        # Write the full page text or snippet
                        out.write(text)
                        out.write("\n\n")
            except Exception as e:
                out.write(f"Error reading {filename}: {e}\n")
    print("Done. Written to", output_file)

if __name__ == "__main__":
    find_swot()
