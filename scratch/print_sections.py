import os

extracted_files = [f for f in os.listdir("scratch") if f.endswith("_extracted.txt")]

keywords = ["FODA", "SWOT", "Cuadro Analítico", "Tabla", "Matriz", "Comparado"]

for filename in extracted_files:
    path = os.path.join("scratch", filename)
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
        
    print(f"\n========================================\nFILE: {filename}\n========================================\n")
    for keyword in keywords:
        pos = 0
        while True:
            idx = content.lower().find(keyword.lower(), pos)
            if idx == -1:
                break
            
            # Print 300 characters around the match
            start = max(0, idx - 100)
            end = min(len(content), idx + 400)
            print(f"--- Found '{keyword}' ---")
            print(content[start:end])
            print("-" * 40)
            pos = idx + len(keyword)
            if pos >= len(content):
                break
        # limit to a couple of matches per file to avoid huge output
