from openai import OpenAI

client = OpenAI(
    base_url="http://192.168.20.143:10106/v1", # Ajustado para compatibilidad si la lib lo requiere, aunque probaremos
    api_key="sk-1234"
)

try:
    response = client.chat.completions.create(
        model="qwen2.5:14b",
        messages=[{"role": "user", "content": "Hola mundo"}],
        timeout=10
    )
    print("EXITO:", response.choices[0].message.content)
except Exception as e:
    print("ERROR PYTHON:", e)
