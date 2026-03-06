import json
import csv
from pathlib import Path

def get_counts():
    scraping_path = Path(r"scraper/data/processed/studies_enriched.json")
    csv_path = Path(r"D:\Paginas_web\pagina\laboratorio-bienestar\csv_bienestar\LISTA DE PRECIOS HP33 CILAB.csv")
    ts_path = Path(r"src/data/studies.ts")
    
    scraping_count = 0
    if scraping_path.exists():
        with open(scraping_path, 'r', encoding='utf-8') as f:
            scraping_count = len(json.load(f))
            
    csv_count = 0
    if csv_path.exists():
        with open(csv_path, 'r', encoding='latin-1') as f:
            csv_count = len(list(csv.reader(f))) - 1
            
    ts_count = 0
    if ts_path.exists():
        with open(ts_path, 'r', encoding='utf-8') as f:
            ts_count = f.read().count('id:')
            
    print(f"SCRAPING_COUNT: {scraping_count}")
    print(f"CSV_COUNT: {csv_count}")
    print(f"TOTAL_COUNT: {ts_count}")

if __name__ == "__main__":
    get_counts()
