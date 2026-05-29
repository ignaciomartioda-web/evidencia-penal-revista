import os
import re
import sys

def extract_spa_valid_hashes(app_js_path):
    valid_hashes = {"inicio", "publicaciones", "nosotros", "participacion", "secciones", "visor-seccion", "sobre-nosotros", "biografia-seccion", "ejes-partidarios", "voluntariado", "dashboard", "radiografia", "radiografia-red", "radiografia-analisis", "radiografia-territorio"}
    
    data_js_path = os.path.join(os.path.dirname(app_js_path), "data.js")
    for path in [app_js_path, data_js_path]:
        if os.path.exists(path):
            with open(path, "r", encoding="utf-8") as f:
                content = f.read()
            doc_keys = re.findall(r'["\'](doc[a-zA-Z0-9_-]*)["\']\s*:', content)
            for key in doc_keys:
                valid_hashes.add(key)
        
    return valid_hashes

def audit_html(file_path, valid_spa_hashes=None):
    print(f"=== Auditing: {file_path} ===")
    if not os.path.exists(file_path):
        print(f"Error: File {file_path} does not exist!")
        return False

    with open(file_path, "r", encoding="utf-8") as f:
        html = f.read()

    # Find all IDs defined in the document
    ids = set(re.findall(r'id=["\']([^"\']+)["\']', html))
    print(f"Found {len(ids)} unique IDs in {os.path.basename(file_path)}.")

    # Find all hrefs
    hrefs = re.findall(r'href=["\']([^"\']+)["\']', html)
    # Find all srcs
    srcs = re.findall(r'src=["\']([^"\']+)["\']', html)

    errors = 0
    warnings = 0

    print("\n--- Auditing Anchor Links ---")
    for href in hrefs:
        if href.startswith("#"):
            anchor = href[1:]
            if not anchor:
                continue
            
            # Check if it is a physical ID or a valid SPA route hash
            is_valid_id = anchor in ids
            is_valid_spa = valid_spa_hashes and anchor in valid_spa_hashes
            
            if not is_valid_id and not is_valid_spa:
                print(f"Error: Anchor reference '{href}' does not match any ID in the document nor any valid SPA router endpoint.")
                errors += 1
            else:
                status = "ID Match" if is_valid_id else "SPA Route Match"
                # print(f"Success: Anchor reference '{href}' is valid ({status}).")
        elif href.startswith("http://") or href.startswith("https://") or href.startswith("mailto:") or href.startswith("tel:"):
            # External link
            pass
        else:
            # Local file reference
            local_path = href.split("?")[0].split("#")[0]
            if not local_path:
                continue
            full_local_path = os.path.join(os.path.dirname(file_path), local_path)
            if not os.path.exists(full_local_path):
                print(f"Error: Local file referenced in href '{href}' ({local_path}) does not exist on disk!")
                errors += 1
            else:
                pass

    print("\n--- Auditing Source (src) Resources ---")
    for src in srcs:
        if src.startswith("http://") or src.startswith("https://"):
            # External source
            pass
        else:
            # Local source file
            local_path = src.split("?")[0].split("#")[0]
            if not local_path:
                continue
            full_local_path = os.path.join(os.path.dirname(file_path), local_path)
            if not os.path.exists(full_local_path):
                print(f"Error: Local resource referenced in src '{src}' ({local_path}) does not exist on disk!")
                errors += 1
            else:
                pass

    print(f"\nAudit completed for {os.path.basename(file_path)}: {errors} Errors, {warnings} Warnings\n")
    return errors == 0

if __name__ == "__main__":
    dir_path = os.path.dirname(os.path.abspath(__file__))
    app_js_path = os.path.join(dir_path, "js", "data.js")
    
    valid_spa_hashes = extract_spa_valid_hashes(app_js_path)
    print(f"SPA Router Valid Hashes: {sorted(list(valid_spa_hashes))}\n")
    
    index_ok = audit_html(os.path.join(dir_path, "index.html"), valid_spa_hashes)
    dash_ok = audit_html(os.path.join(dir_path, "dashboard.html"), valid_spa_hashes)
    
    if not index_ok or not dash_ok:
        sys.exit(1)
    else:
        sys.exit(0)
