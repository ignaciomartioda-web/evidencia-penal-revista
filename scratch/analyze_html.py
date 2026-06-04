import re
import os

def analyze_html(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        lines = f.readlines()
    
    html = "".join(lines)
    
    # 1. Buscar comentarios HTML (<!-- -->)
    comments = re.findall(r'<!--(.*?)-->', html, re.DOTALL)
    large_comments = [c.strip() for c in comments if len(c.strip()) > 200]
    
    print(f"=== Analizando {os.path.basename(file_path)} ({len(lines)} líneas) ===")
    print(f"Encontrados {len(comments)} bloques de comentarios.")
    print(f"Comentarios grandes (>200 caracteres) que podrían ser código muerto:")
    for lc in large_comments:
        preview = lc[:120].replace('\n', ' ')
        print(f"  - [{len(lc)} chars] Preview: {preview}...")

    # 2. Buscar etiquetas script e inline CSS
    inline_styles = re.findall(r'<style>(.*?)</style>', html, re.DOTALL)
    script_blocks = re.findall(r'<script>(.*?)</script>', html, re.DOTALL)
    
    print(f"\nBloques <style> inline: {len(inline_styles)}")
    print(f"Bloques <script> inline: {len(script_blocks)}")

if __name__ == "__main__":
    analyze_html("c:\\Users\\23353247239\\Desktop\\antigravity\\campaña ferraro\\index.html")
