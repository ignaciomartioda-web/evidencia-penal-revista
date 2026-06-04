import os, re, json

filepath = r"C:\Users\23353247239\.gemini\antigravity\brain\028b0ace-ae85-4d3a-9d1d-c7eae96e6ecb\scratch\ejemplos de políticos y estrategias.txt"
output_file = r"C:\Users\23353247239\.gemini\antigravity\brain\028b0ace-ae85-4d3a-9d1d-c7eae96e6ecb\scratch\extracted_tables.json"

if not os.path.exists(filepath):
    print("Source file not found")
    exit(1)

with open(filepath, "r", encoding="utf-8") as f:
    text = f.read()

# Let's write a script to dump the text around each matrix start
lines = text.splitlines()

# We will write the lines to an output file for inspection
with open(os.path.join(os.path.dirname(output_file), "tables_raw_sections.txt"), "w", encoding="utf-8") as out:
    
    # 1. Extrapolación Operativa CABA (around 4512)
    out.write("=== EXTRAPOLACION OPERATIVA (around 4512) ===\n")
    for idx in range(4510, min(len(lines), 4600)):
        out.write(f"{idx+1}: {lines[idx]}\n")
    out.write("\n\n")

    # 2. Reencuadre Biográfico (around 4888)
    out.write("=== REENCUADRE BIOGRAFICO (around 4888) ===\n")
    # Let's search where the table actually starts
    found_idx = -1
    for idx, l in enumerate(lines):
        if "Perfil Biográfico Comparado" in l or "Identidad Biográfica" in l:
            found_idx = idx
            break
    start = found_idx - 10 if found_idx != -1 else 4880
    for idx in range(start, min(len(lines), start + 100)):
        out.write(f"{idx+1}: {lines[idx]}\n")
    out.write("\n\n")

    # 3. Mapeo de Comunas / Infiltración Territorial (around 5287)
    out.write("=== INFILTRACION TERRITORIAL COMUNAS (around 5287) ===\n")
    found_idx2 = -1
    for idx, l in enumerate(lines):
        if "Corredor" in l and "Socio-Urbano" in l:
            found_idx2 = idx
            break
    start = found_idx2 - 10 if found_idx2 != -1 else 5280
    for idx in range(start, min(len(lines), start + 120)):
        out.write(f"{idx+1}: {lines[idx]}\n")
    out.write("\n\n")

    # 4. Hoja de ruta semanal / Cronograma (around 8764)
    out.write("=== HOJA DE RUTA OPERATIVA (around 8764) ===\n")
    found_idx3 = -1
    for idx, l in enumerate(lines):
        if "Cronograma Ejecutivo" in l or "Semanas 1" in l or "Período Temporal" in l:
            found_idx3 = idx
            break
    start = found_idx3 - 10 if found_idx3 != -1 else 8760
    for idx in range(start, min(len(lines), start + 100)):
        out.write(f"{idx+1}: {lines[idx]}\n")
    out.write("\n\n")

    # 5. Riesgos y Mitigación (around 9486)
    out.write("=== RIESGOS Y MITIGACION (around 9486) ===\n")
    found_idx4 = -1
    for idx, l in enumerate(lines):
        if "MATRIZ DE MITIGACIÓN DE RIESGOS" in l or "MATRIZ DE MITIGACION" in l:
            found_idx4 = idx
            break
    start = found_idx4 - 5 if found_idx4 != -1 else 9480
    for idx in range(start, min(len(lines), start + 100)):
        out.write(f"{idx+1}: {lines[idx]}\n")
    out.write("\n\n")

print("Raw sections written to tables_raw_sections.txt")
