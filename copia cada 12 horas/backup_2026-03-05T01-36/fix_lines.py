
file_path = r"d:\Paginas_web\pagina\laboratorio-bienestar\src\data\studies.ts"

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Line 496 (index 495) and 497 (index 496)
# Check if line 495 looks like the broken one
if "turnaroundTime" in lines[495] and "Un técnico" in lines[496]:
    print("Found broken lines.")
    # Remove newline from 495
    lines[495] = lines[495].rstrip('\r\n') + " " + lines[496].lstrip()
    # Remove line 496 (now merged)
    del lines[496]
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.writelines(lines)
    print("Fixed.")
else:
    print("Lines do not match expected pattern.")
    print(f"496: {lines[495]}")
    print(f"497: {lines[496]}")
