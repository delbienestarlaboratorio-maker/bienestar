import json, urllib.request
try:
    resp = urllib.request.urlopen('http://localhost:11434/api/tags')
    data = json.loads(resp.read())
    print([m['name'] for m in data['models']])
except Exception as e:
    print('Error:', e)
