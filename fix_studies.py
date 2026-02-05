
file_path = r"d:\Paginas_web\pagina\laboratorio-bienestar\src\data\studies.ts"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Try multiple variations
fixed_content = content.replace("estudio.\nUn técnico", "estudio. Un técnico")
fixed_content = fixed_content.replace("estudio.\r\nUn técnico", "estudio. Un técnico")

if content != fixed_content:
    print("Fixed content.")
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(fixed_content)
else:
    print("No changes made.")
    # Debug again with more precision
    import re
    match = re.search(r"estudio\.(?:\r\n|\n)Un técnico", content)
    if match:
        print(f"Found match with regex: {repr(match.group(0))}")
        # Apply regex fix
        fixed_content = re.sub(r"estudio\.(?:\r\n|\n)Un técnico", "estudio. Un técnico", content)
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(fixed_content)
        print("Fixed with regex.")
    else:
        print("Could not find pattern even with regex.")
