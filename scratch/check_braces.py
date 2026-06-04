import re

with open("js/router.js", "r", encoding="utf-8") as f:
    lines = f.readlines()

# Remove single-line strings and comments to avoid false positives
depth = 0
for i, line in enumerate(lines, 1):
    # Strip single-line comments
    stripped = re.sub(r'//.*$', '', line)
    # Strip strings (simple approach)
    stripped = re.sub(r'"[^"]*"', '""', stripped)
    stripped = re.sub(r"'[^']*'", "''", stripped)
    stripped = re.sub(r'`[^`]*`', '``', stripped)
    
    opens = stripped.count('{')
    closes = stripped.count('}')
    old_depth = depth
    depth += opens - closes
    if opens > 0 or closes > 0:
        print(f"L{i:4d}: depth {old_depth} -> {depth}  |  {line.rstrip()[:100]}")

print(f"\nFinal brace depth: {depth}")
if depth != 0:
    print(f"ERROR: {abs(depth)} unclosed brace(s)!" if depth > 0 else f"ERROR: {abs(depth)} extra closing brace(s)!")
else:
    print("OK: All braces balanced.")
