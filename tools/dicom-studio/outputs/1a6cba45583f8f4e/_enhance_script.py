import sys, json, os
sys.path.insert(0, r"d:\\Paginas_web\\pagina\\laboratorio-bienestar\\tools\\dicom-studio")
from dicom_engine import generate_enhancement_variants
result = generate_enhancement_variants(r"C:\\Users\\Administrador\\Downloads\\20260309\\111736\\QY0UQAQO", r"d:\\Paginas_web\\pagina\\laboratorio-bienestar\\tools\\dicom-studio\\outputs\\1a6cba45583f8f4e")
if result:
    print("__ENHANCE_JSON_START__")
    print(json.dumps(result["manifest"], ensure_ascii=False))
    print("__ENHANCE_JSON_END__")
    print("ENHANCE_DIR:" + result["enhance_dir"])
else:
    print("ERROR: Could not generate variants")
    sys.exit(1)
