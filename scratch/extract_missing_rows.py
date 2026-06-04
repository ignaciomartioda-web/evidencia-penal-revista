import os

path = "scratch/Campaña Austera_ Políticos y Estrategias_extracted.txt"
with open(path, "r", encoding="utf-8") as f:
    text = f.read()

terms = ["Moran", "Nenshi", "Villacis", "Villacís"]

out_path = "scratch/missing_rows_output.txt"
with open(out_path, "w", encoding="utf-8") as out_f:
    for t in terms:
        out_f.write(f"\n=== ALL MATCHES FOR '{t}' ===\n")
        pos = 0
        count = 0
        while True:
            idx = text.lower().find(t.lower(), pos)
            if idx == -1:
                break
            out_f.write(f"Match {count} at {idx}:\n")
            out_f.write(text[max(0, idx-100):min(len(text), idx+400)])
            out_f.write("\n" + "-" * 30 + "\n")
            pos = idx + len(t)
            count += 1

print("Matches written to scratch/missing_rows_output.txt")
