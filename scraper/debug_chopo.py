
from bs4 import BeautifulSoup
import sys
import os

# Add scraper dir to path
sys.path.append(os.path.join(os.path.dirname(__file__)))

from scrapers.chopo_scraper import ChopoScraper

def debug_parsing():
    file_path = r"d:\Paginas_web\pagina\laboratorio-bienestar\chopo_test.html"
    if not os.path.exists(file_path):
        print(f"File {file_path} not found")
        return

    with open(file_path, 'r', encoding='utf-8') as f:
        html = f.read()

    soup = BeautifulSoup(html, 'html.parser')
    
    # Try catalog-grid-name (new strategy)
    cards = soup.select('.catalog-grid-name')
    if not cards:
        cards = soup.select('.product-item-info')
        
    print(f"Found {len(cards)} cards")

    scraper = ChopoScraper()

    for i, card in enumerate(cards):
        print(f"\n--- Card {i+1} ---")
        # print(card.prettify()[:500]) 
        
        parsed = scraper._parse_study_card(card)
        if parsed:
            print("SUCCESS:", parsed)
        else:
            print("FAILED to parse")
            # Debug why
            name_elem = card.select_one('.catalog-grid-item__name-link')
            print(f"Name elem (.catalog-grid-item__name-link): {name_elem}")
            
            price_elem = card.select_one('.catalog-grid-item__price')
            print(f"Price elem (.catalog-grid-item__price): {price_elem}")

if __name__ == "__main__":
    debug_parsing()
