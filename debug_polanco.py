
import os
import sys
from bs4 import BeautifulSoup
from scraper.scrapers.polanco_scraper import PolancoScraper

# Mock logger
import logging
logging.basicConfig(level=logging.INFO)

def test_catalog_parsing():
    print("\n--- Testing Catalog Parsing ---")
    file_path = r"d:\Paginas_web\pagina\laboratorio-bienestar\polanco_test.html"
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        return

    with open(file_path, 'r', encoding='utf-8') as f:
        html = f.read()
    
    soup = BeautifulSoup(html, 'html.parser')
    scraper = PolancoScraper()
    
    # Manually call logic from scrape_studies_catalog
    cards = soup.select('li.item-study')
    print(f"Found {len(cards)} cards")
    
    for i, card in enumerate(cards[:5]):
        study = scraper._parse_study_card(card, "Test Category")
        print(f"Study {i+1}: {study}")

def test_detail_parsing():
    print("\n--- Testing Detail Parsing ---")
    file_path = r"d:\Paginas_web\pagina\laboratorio-bienestar\polanco_detail_test.html"
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        return

    with open(file_path, 'r', encoding='utf-8') as f:
        html = f.read()
        
    soup = BeautifulSoup(html, 'html.parser')
    scraper = PolancoScraper()
    
    # Mock detail extraction
    detail = {}
    
    # Logic copied/adapted from scrape_study_detail
    price_blue = soup.select_one('.price__study.price__blue p')
    if price_blue:
        detail['price_regular'] = scraper._extract_price(price_blue.get_text(strip=True))
        
    price_orange = soup.select_one('.price__study.price__orange p')
    if price_orange:
        detail['price_promo'] = scraper._extract_price(price_orange.get_text(strip=True))
        
    print(f"Extracted Detail: {detail}")

if __name__ == "__main__":
    # Add project root and scraper directory to path
    sys.path.append(r"d:\Paginas_web\pagina\laboratorio-bienestar")
    sys.path.append(r"d:\Paginas_web\pagina\laboratorio-bienestar\scraper")
    
    test_catalog_parsing()
    test_detail_parsing()
