import re

def analyze_css():
    print("=== CSS ANALYSIS ===")
    with open("css/styles.css", encoding="utf-8") as f:
        content = f.read()
    
    print(f"Total characters: {len(content)}")
    print(f"Total lines: {len(content.splitlines())}")
    
    # Let's find major sections (comments starting with /* ===)
    sections = re.findall(r'(/\* =+.*?\n.*?\n.*?\*+/)', content)
    for section in sections[:15]:
        print(section.splitlines()[1] if len(section.splitlines()) > 1 else section)

def analyze_js():
    print("\n=== JS ANALYSIS ===")
    with open("js/app.js", encoding="utf-8") as f:
        content = f.read()
        
    print(f"Total characters: {len(content)}")
    print(f"Total lines: {len(content.splitlines())}")
    
    # Find all top-level functions or major blocks
    functions = re.findall(r'function\s+(\w+)\s*\(', content)
    print("Functions:", functions)
    
    # Find self-invoking function blocks (IIFE names/comments)
    iife = re.findall(r'/\*\s*=+.*?\n\s*\*\s*(\w+)?', content)
    print("Possible modules:", iife)

def analyze_html():
    print("\n=== HTML ANALYSIS ===")
    with open("index.html", encoding="utf-8") as f:
        content = f.read()
        
    print(f"Total characters: {len(content)}")
    print(f"Total lines: {len(content.splitlines())}")
    
    # Let's count page-views
    page_views = re.findall(r'class="[^"]*page-view[^"]*"[^>]*id="([^"]*)"', content)
    print("Page views (SPA paths):", page_views)

analyze_css()
analyze_js()
analyze_html()
