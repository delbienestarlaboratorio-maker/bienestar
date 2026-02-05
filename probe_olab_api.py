
import requests

def probe_api():
    base_url = "https://olab.com.mx"
    endpoints = [
        "/api/estudios",
        "/api/studies",
        "/api/catalog",
        "/api/products",
        "/api/v1/estudios",
        "/estudios.json",
        "/data/estudios.json",
        "/_nuxt/payload.json" # Generic Nuxt payload
    ]
    
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json'
    }
    
    for endpoint in endpoints:
        url = base_url + endpoint
        print(f"Probing {url}...")
        try:
            response = requests.get(url, headers=headers, timeout=5)
            print(f"Status: {response.status_code}")
            if response.status_code == 200:
                print(f"Success! Content-Type: {response.headers.get('Content-Type')}")
                print(f"Preview: {response.text[:200]}")
        except Exception as e:
            print(f"Error: {e}")

if __name__ == "__main__":
    probe_api()
