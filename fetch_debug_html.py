
import requests
import os

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

def fetch_and_save(url, filename):
    print(f"Fetching {url}...")
    try:
        response = requests.get(url, headers=headers, timeout=30)
        response.raise_for_status()
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(response.text)
        print(f"Saved to {filename} ({len(response.text)} bytes)")
    except Exception as e:
        print(f"Error fetching {url}: {e}")

if __name__ == "__main__":
    # Polanco - Try a department page that usually has items
    fetch_and_save("https://lmpolanco.com/estudios?department=ANÁLISIS+CLÍNICOS", "polanco_test.html")
    
    # Olab - Try a search or category
    fetch_and_save("https://olab.com.mx/estudios", "olab_test.html")
