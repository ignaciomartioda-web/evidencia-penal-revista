import os
import re

def analyze_codebase(workspace_dir):
    js_files = []
    css_files = []
    for root, dirs, files in os.walk(workspace_dir):
        if ".git" in root or ".gemini" in root or "scratch" in root:
            continue
        for file in files:
            if file.endswith(".js"):
                js_files.append(os.path.join(root, file))
            elif file.endswith(".css"):
                css_files.append(os.path.join(root, file))

    print(f"=== Analizando {len(js_files)} archivos JavaScript y {len(css_files)} archivos CSS ===")

    for js_path in js_files:
        with open(js_path, "r", encoding="utf-8") as f:
            content = f.read()
        
        # Buscar funciones definidas
        functions = re.findall(r'function\s+([a-zA-Z0-9_]+)\s*\(', content)
        arrow_functions = re.findall(r'const\s+([a-zA-Z0-9_]+)\s*=\s*(?:\([^)]*\)|[a-zA-Z0-9_]+)\s*=>', content)
        all_funcs = set(functions + arrow_functions)
        
        # Buscar variables globales
        vars_defined = re.findall(r'(?:let|const|var)\s+([a-zA-Z0-9_]+)\s*=\s*', content)
        all_vars = set(vars_defined)

        print(f"\nArchivo: {os.path.relpath(js_path, workspace_dir)}")
        print(f"  - Total de caracteres: {len(content)}")
        print(f"  - Funciones encontradas: {len(all_funcs)}")
        print(f"  - Variables/Constantes declaradas: {len(all_vars)}")

        # Buscar funciones vacías
        empty_funcs = re.findall(r'function\s+([a-zA-Z0-9_]+)\s*\([^)]*\)\s*\{\s*\}', content)
        if empty_funcs:
            print(f"    * Funciones vacías: {empty_funcs}")

    for css_path in css_files:
        with open(css_path, "r", encoding="utf-8") as f:
            css_content = f.read()
        
        # Buscar bloques de comentarios grandes
        comment_blocks = re.findall(r'/\*.*?\*/', css_content, re.DOTALL)
        # Buscar selectores vacíos
        empty_selectors = re.findall(r'([^{}\n]+)\s*\{\s*\}', css_content)
        
        print(f"\nArchivo CSS: {os.path.relpath(css_path, workspace_dir)}")
        print(f"  - Total de caracteres: {len(css_content)}")
        print(f"  - Comentarios: {len(comment_blocks)} bloques")
        if empty_selectors:
            print(f"    * Selectores vacíos: {[s.strip() for s in empty_selectors if s.strip()]}")

if __name__ == "__main__":
    dir_path = "c:\\Users\\23353247239\\Desktop\\antigravity\\campaña ferraro"
    analyze_codebase(dir_path)
