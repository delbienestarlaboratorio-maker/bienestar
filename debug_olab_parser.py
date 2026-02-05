
import json
import sys
from bs4 import BeautifulSoup

def resolve_ref(ref, all_data):
    """Resolve a reference index to its value in the data array."""
    if isinstance(ref, int):
        if 0 <= ref < len(all_data):
            return all_data[ref]
    return ref

def recursive_resolve(obj, all_data, depth=0):
    """Recursively resolve references in an object."""
    if depth > 10: return obj # Prevent infinite loops
    
    if isinstance(obj, int):
        return resolve_ref(obj, all_data)
        
    if isinstance(obj, list):
        return [recursive_resolve(item, all_data, depth+1) for item in obj]
        
    if isinstance(obj, dict):
        new_obj = {}
        for k, v in obj.items():
            # Keys might be indices too? Usually not in JSON, but in Nuxt serialization keys are strings.
            # But values are definitely indices.
            resolved_v = recursive_resolve(v, all_data, depth+1)
            new_obj[k] = resolved_v
        return new_obj
        
    return obj

def parse_olab_nuxt():
    file_path = r"d:\Paginas_web\pagina\laboratorio-bienestar\olab_test.html"
    with open(file_path, 'r', encoding='utf-8') as f:
        html = f.read()
        
    soup = BeautifulSoup(html, 'html.parser')
    script = soup.find('script', id='__NUXT_DATA__')
    
    if not script:
        print("No __NUXT_DATA__ found")
        return

    try:
        raw_data = json.loads(script.string)
        print(f"Loaded JSON data. Total items: {len(raw_data)}")
        
        # Nuxt 3 data structure: [types, meta, data, ...]
        # The 'data' part usually contains the page state.
        # But the whole array is a pool of values.
        
        # We look for objects that have 'precio_web' or 'slug' and 'name'
        # We iterate through the WHOLE array to find study-like objects.
        
        studies = []
        
        for i, item in enumerate(raw_data):
            if isinstance(item, dict):
                # Check signature of a study
                # Based on analysis: {"@name":..., "precio_web":..., "slug":...}
                # Note: The keys are strings, but values are indices.
                
                # We need to check if keys exist.
                if 'precio_web' in item and 'slug' in item:
                    # This is a candidate. Resolve it.
                    resolved = {}
                    for k, v in item.items():
                        resolved[k] = resolve_ref(v, raw_data)
                    
                    studies.append(resolved)
        
        print(f"Found {len(studies)} study candidates.")
        
        for i, study in enumerate(studies):
            print(f"\nStudy {i+1}:")
            print(f"  Name: {study.get('@name')}") # Might be another object
            print(f"  Slug: {study.get('slug')}")
            print(f"  Price Web: {study.get('precio_web')}")
            print(f"  Price Membresia: {study.get('precio_membresia')}")
            
            # If name is an object, print it
            if isinstance(study.get('@name'), dict):
                 print(f"  Name (resolved): {study.get('@name')}")

    except Exception as e:
        print(f"Error parsing: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    parse_olab_nuxt()
