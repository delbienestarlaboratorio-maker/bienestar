
file_path = r"d:\Paginas_web\pagina\laboratorio-bienestar\src\data\studies.ts"

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

start = 490
end = 505

for i in range(start, min(len(lines), end)):
    print(f"{i+1}: {repr(lines[i])}")
