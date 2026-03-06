
import requests

def probe_urls():
    urls = [
        "https://olab.com.mx/estudios/biometria-hematica",
        "https://olab.com.mx/estudios/analisis-clinicos/biometria-hematica",
        "https://olab.com.mx/olab/biometria-hematica",
        "https://olab.com.mx/estudio/biometria-hematica",
        "https://olab.com.mx/biometria-hematica",
        "https://olab.com.mx/estudios/mastografia",
        "https://olab.com.mx/olab/mastografia"
    ]
    
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
    
    for url in urls:
        print(f"Fetching {url}...")
        try:
            response = requests.get(url, headers=headers, timeout=10)
            print(f"Status: {response.status_code}")
            if response.status_code == 200:
                print(f"Length: {len(response.text)}")
                if "precio" in response.text.lower() or "$" in response.text:
                    print("FOUND PRICE/PRECIO in content!")
                    with open("olab_detail_probe.html", "w", encoding="utf-8") as f:
                        f.write(response.text)
                    break
        except Exception as e:
            print(f"Error: {e}")

if __name__ == "__main__":
    probe_urls()
