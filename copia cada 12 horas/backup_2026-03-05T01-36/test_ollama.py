import json, urllib.request

req = urllib.request.Request(
    'http://localhost:11434/api/generate',
    data=json.dumps({
        'model': 'llama3.2:latest',
        'prompt': 'Hola, responde con un JSON que tenga una llave mensaje y valor hola.',
        'format': 'json',
        'stream': False
    }).encode('utf-8')
)
resp = urllib.request.urlopen(req)
print(json.loads(resp.read())['response'])
