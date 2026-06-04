import sys
import os

diff_path = r"C:\Users\23353247239\.gemini\antigravity\brain\028b0ace-ae85-4d3a-9d1d-c7eae96e6ecb\scratch\index_html.diff"
out_path = r"c:\Users\23353247239\Desktop\antigravity\campaña ferraro\scratch\index_html_utf8_reconstructed.diff"

try:
    with open(diff_path, "r", encoding="utf-16le") as f:
        content = f.read()
    
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(content)
        
    print("Successfully converted diff file to UTF-8.")
    print("Diff size in chars:", len(content))
except Exception as e:
    print("Error:", e)
