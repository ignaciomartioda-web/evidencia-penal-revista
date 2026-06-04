import os

filepath = r"C:\Users\23353247239\.gemini\antigravity\brain\028b0ace-ae85-4d3a-9d1d-c7eae96e6ecb\scratch\ejemplos de políticos y estrategias.txt"
output_file = r"C:\Users\23353247239\.gemini\antigravity\brain\028b0ace-ae85-4d3a-9d1d-c7eae96e6ecb\scratch\risks_full.txt"

if not os.path.exists(filepath):
    print("Source file not found")
    exit(1)

with open(filepath, "r", encoding="utf-8") as f:
    lines = f.read().splitlines()

with open(output_file, "w", encoding="utf-8") as out:
    for idx in range(9479, min(len(lines), 10200)):
        out.write(f"{idx+1}: {lines[idx]}\n")

print("Risks full updated up to line 10200")
