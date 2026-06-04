with open(r"c:\Users\23353247239\Desktop\antigravity\campaña ferraro\scratch\index_html_utf8_reconstructed.diff", "r", encoding="utf-8") as f:
    for i, line in enumerate(f):
        if line.startswith("@@"):
            print(f"Line {i+1}: {line.strip()}")
