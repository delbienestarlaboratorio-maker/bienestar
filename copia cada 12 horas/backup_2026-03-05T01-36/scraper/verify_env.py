
import sys
import os

print(f"Python Executable: {sys.executable}")
print(f"Current Directory: {os.getcwd()}")

try:
    import requests
    print("✅ requests installed")
except ImportError:
    print("❌ requests NOT installed")

try:
    from bs4 import BeautifulSoup
    print("✅ beautifulsoup4 installed")
except ImportError:
    print("❌ beautifulsoup4 NOT installed")

try:
    import playwright
    print("✅ playwright installed")
except ImportError:
    print("❌ playwright NOT installed")
