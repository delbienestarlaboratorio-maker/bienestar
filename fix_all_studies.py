
file_path = r"d:\Paginas_web\pagina\laboratorio-bienestar\src\data\studies.ts"

def count_quotes(line):
    # Simple count of single quotes
    # Note: This is a heuristic. It might fail if there are apostrophes in the text like "patient's".
    # But the scraped data seems to use simple text.
    # Let's check if there are escaped quotes?
    return line.count("'")

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
i = 0
while i < len(lines):
    line = lines[i].rstrip('\r\n')
    
    # Check if this line looks like a property definition that is incomplete
    # e.g. "        turnaroundTime: 'Start of text"
    # It usually ends with neither comma nor quote.
    
    # Heuristic: If it has an odd number of quotes, it's likely open.
    # But wait, "patient's" would trigger this.
    # Better heuristic: If it starts with a key (e.g. "        key: '") and doesn't end with "',"
    
    stripped = line.strip()
    if (stripped.startswith("description: '") or 
        stripped.startswith("preparation: '") or 
        stripped.startswith("turnaroundTime: '") or
        stripped.startswith("name: '")):
        
        if not stripped.endswith("',"):
            # It's broken.
            # Merge with next line(s) until we find the closing "',"
            merged_line = line
            j = i + 1
            while j < len(lines):
                next_line = lines[j].strip()
                merged_line += " " + next_line
                j += 1
                if next_line.endswith("',"):
                    break
            
            new_lines.append(merged_line + "\n")
            i = j
            continue

    new_lines.append(lines[i])
    i += 1

with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("Fixed all broken lines.")
