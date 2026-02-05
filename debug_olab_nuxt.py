
import json
import re
from bs4 import BeautifulSoup

def parse_nuxt_data():
    file_path = r"d:\Paginas_web\pagina\laboratorio-bienestar\olab_test.html"
    with open(file_path, 'r', encoding='utf-8') as f:
        html = f.read()
        
    soup = BeautifulSoup(html, 'html.parser')
    script = soup.find('script', id='__NUXT_DATA__')
    
    if not script:
        print("No __NUXT_DATA__ found")
        return

    try:
        data = json.loads(script.string)
        print("Loaded JSON data")
        print(f"Type: {type(data)}")
        print(f"Length: {len(data)}")
        
        # Usually data is [type, meta, values...]
        # We want to find objects that have 'precio_web' keys
        
        # Flatten the list if it's nested or just search recursively
        def find_studies(obj, all_data):
            studies = []
            if isinstance(obj, dict):
                # Check if this object looks like a study
                # Based on analysis: {"@name":..., "precio_web": index, ...}
                if 'precio_web' in obj and 'slug' in obj:
                    studies.append(obj)
                
                for k, v in obj.items():
                    studies.extend(find_studies(v, all_data))
            elif isinstance(obj, list):
                for item in obj:
                    studies.extend(find_studies(item, all_data))
            return studies

        # The data structure in Nuxt 3 is often: [ ... ] where the first few elements describe the structure
        # and subsequent elements are the values.
        # But looking at the analysis, it seems the keys like "precio_web" are present in the objects.
        
        # Let's try to find all dicts with 'precio_web'
        studies_refs = find_studies(data, data)
        print(f"Found {len(studies_refs)} potential study objects (references)")
        
        if studies_refs:
            print("Sample object:", studies_refs[0])
            
            # Try to resolve values
            # If "precio_web": 75, then the value is at data[75] (if data is the flat array)
            # Or data[index] if data is the array.
            
            sample = studies_refs[0]
            if isinstance(sample.get('precio_web'), int):
                idx = sample['precio_web']
                if idx < len(data):
                    print(f"Resolved precio_web ({idx}): {data[idx]}")
            
            if isinstance(sample.get('@name'), int):
                idx = sample['@name']
                if idx < len(data):
                    print(f"Resolved name ({idx}): {data[idx]}")

    except Exception as e:
        print(f"Error parsing JSON: {e}")

if __name__ == "__main__":
    parse_nuxt_data()
