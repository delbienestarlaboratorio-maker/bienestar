
import os
import re

file_path = r"d:\Paginas_web\pagina\laboratorio-bienestar\olab_test.html"
output_path = r"d:\Paginas_web\pagina\laboratorio-bienestar\analysis_olab.txt"

try:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
except UnicodeDecodeError:
    with open(file_path, 'r', encoding='latin-1') as f:
        content = f.read()

with open(output_path, 'w', encoding='utf-8') as out:
    out.write(f"File length: {len(content)}\n")

    keywords = ["precio", "$", "study", "card", "product", "item"]

    for keyword in keywords:
        out.write(f"\n--- Searching for: {keyword} ---\n")
        matches = [m.start() for m in re.finditer(re.escape(keyword), content)]
        out.write(f"Found {len(matches)} occurrences.\n")
        
        for i, index in enumerate(matches):
            if i >= 5: 
                out.write("... (more matches truncated)\n")
                break
            
            start = max(0, index - 300)
            end = min(len(content), index + 300)
            context = content[start:end].replace('\n', ' ').replace('\r', '')
            out.write(f"Match {i+1} at {index}:\n...{context}...\n\n")
