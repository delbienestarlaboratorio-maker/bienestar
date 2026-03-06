
file_path = r"d:\Paginas_web\pagina\laboratorio-bienestar\src\data\studies.ts"

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

found_idx = -1
for i, line in enumerate(lines):
    if "turnaroundTime" in line and "Realizarle un cuestionario" in line:
        found_idx = i
        break

if found_idx != -1:
    print(f"Found at index {found_idx}")
    print(f"Line: {lines[found_idx]}")
    print(f"Next: {lines[found_idx+1]}")
    
    # Merge
    lines[found_idx] = lines[found_idx].rstrip('\r\n') + " " + lines[found_idx+1].lstrip()
    del lines[found_idx+1]
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.writelines(lines)
    print("Fixed.")
else:
    print("Could not find line.")
