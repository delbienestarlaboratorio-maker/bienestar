#!/usr/bin/env python3
"""
╔══════════════════════════════════════════════════════════════╗
║  TILDE DICOM STUDIO — Motor de Conversión Radiológica       ║
║  Laboratorio del Bienestar © 2026                           ║
║                                                              ║
║  Convierte archivos DICOM crudos (.dcm o sin extensión)      ║
║  a JPG/PNG de alta calidad médica con windowing automático,  ║
║  CLAHE adaptativo y extracción completa de metadatos.        ║
╚══════════════════════════════════════════════════════════════╝

Uso:
  python dicom_engine.py <carpeta_o_archivo_dicom> [--output <carpeta_salida>]
  python dicom_engine.py C:\\Users\\Administrador\\Downloads\\20260309
  python dicom_engine.py C:\\Users\\Administrador\\Downloads\\20260309 --output D:\\Salida --clahe --preset auto
"""

import os
import sys
import io

# Fix Windows console encoding (CP1252 can't handle Unicode box chars)
if sys.stdout.encoding and sys.stdout.encoding.lower() != 'utf-8':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')

import json
import argparse
import glob
from pathlib import Path
from datetime import datetime

import numpy as np

try:
    import pydicom
    from pydicom.pixel_data_handlers.util import apply_modality_lut, apply_voi_lut
except ImportError:
    print("ERROR: Instala pydicom → pip install pydicom")
    sys.exit(1)

try:
    import cv2
except ImportError:
    print("ERROR: Instala opencv → pip install opencv-python")
    sys.exit(1)

try:
    from PIL import Image
except ImportError:
    print("ERROR: Instala Pillow → pip install Pillow")
    sys.exit(1)


# ──────────────────────────────────────────────────────────────
# Windowing Presets (Window Center / Window Width)
# ──────────────────────────────────────────────────────────────
WINDOW_PRESETS = {
    "pulmon":        {"wc": -600, "ww": 1500, "desc": "Tórax — Campo Pulmonar"},
    "mediastino":    {"wc":   40, "ww":  400, "desc": "Tórax — Mediastino / Silueta Cardíaca"},
    "hueso":         {"wc":  400, "ww": 2000, "desc": "Hueso — Máximo Contraste Óseo"},
    "tejido_blando": {"wc":   40, "ww":  400, "desc": "Tejido Blando — Músculos / Órganos"},
    "abdomen":       {"wc":   60, "ww":  360, "desc": "Abdomen — Hígado, Riñones, Intestino"},
    "cerebro":       {"wc":   40, "ww":   80, "desc": "Cerebro — Sustancia Gris vs Blanca"},
    "columna":       {"wc":  300, "ww": 1500, "desc": "Columna Vertebral"},
    "extremidades":  {"wc":  200, "ww": 1000, "desc": "Extremidades — Manos, Pies, Rodilla"},
}

# Mapeo de BodyPartExamined del DICOM → preset automático
BODY_PART_TO_PRESET = {
    "CHEST":       "pulmon",
    "THORAX":      "pulmon",
    "LUNG":        "pulmon",
    "ABDOMEN":     "abdomen",
    "PELVIS":      "hueso",
    "SKULL":       "cerebro",
    "HEAD":        "cerebro",
    "BRAIN":       "cerebro",
    "SPINE":       "columna",
    "CSPINE":      "columna",
    "TSPINE":      "columna",
    "LSPINE":      "columna",
    "C SPINE":     "columna",
    "T SPINE":     "columna",
    "L SPINE":     "columna",
    "CERVICAL":    "columna",
    "LUMBAR":      "columna",
    "HAND":        "extremidades",
    "FOOT":        "extremidades",
    "KNEE":        "extremidades",
    "ANKLE":       "extremidades",
    "ELBOW":       "extremidades",
    "WRIST":       "extremidades",
    "SHOULDER":    "hueso",
    "HIP":         "hueso",
    "FEMUR":       "hueso",
    "TIBIA":       "hueso",
    "HUMERUS":     "hueso",
    "FINGER":      "extremidades",
    "TOE":         "extremidades",
    "RIB":         "hueso",
    "CLAVICLE":    "hueso",
}

# CLAHE params por preset
CLAHE_PARAMS = {
    "pulmon":        {"clipLimit": 2.0, "tileGridSize": (8, 8)},
    "mediastino":    {"clipLimit": 2.5, "tileGridSize": (8, 8)},
    "hueso":         {"clipLimit": 4.0, "tileGridSize": (4, 4)},
    "tejido_blando": {"clipLimit": 2.5, "tileGridSize": (16, 16)},
    "abdomen":       {"clipLimit": 2.5, "tileGridSize": (16, 16)},
    "cerebro":       {"clipLimit": 3.0, "tileGridSize": (8, 8)},
    "columna":       {"clipLimit": 3.0, "tileGridSize": (8, 8)},
    "extremidades":  {"clipLimit": 4.0, "tileGridSize": (4, 4)},
}


# ──────────────────────────────────────────────────────────────
# Tabla de Protocolo Radiográfico (kVp / mAs por parte del cuerpo)
# ──────────────────────────────────────────────────────────────
TECHNIQUE_CHART = {
    "KNEE":      {"kvp_min": 55, "kvp_max": 75, "kvp_ideal": 65, "mas_min": 3, "mas_max": 12},
    "HAND":      {"kvp_min": 46, "kvp_max": 60, "kvp_ideal": 52, "mas_min": 2, "mas_max": 6},
    "WRIST":     {"kvp_min": 50, "kvp_max": 62, "kvp_ideal": 57, "mas_min": 3, "mas_max": 8},
    "FOOT":      {"kvp_min": 50, "kvp_max": 65, "kvp_ideal": 60, "mas_min": 3, "mas_max": 8},
    "ANKLE":     {"kvp_min": 55, "kvp_max": 70, "kvp_ideal": 62, "mas_min": 4, "mas_max": 10},
    "ELBOW":     {"kvp_min": 55, "kvp_max": 68, "kvp_ideal": 60, "mas_min": 3, "mas_max": 8},
    "SHOULDER":  {"kvp_min": 65, "kvp_max": 80, "kvp_ideal": 72, "mas_min": 6, "mas_max": 16},
    "HUMERUS":   {"kvp_min": 60, "kvp_max": 75, "kvp_ideal": 68, "mas_min": 4, "mas_max": 12},
    "FOREARM":   {"kvp_min": 55, "kvp_max": 68, "kvp_ideal": 60, "mas_min": 3, "mas_max": 8},
    "FEMUR":     {"kvp_min": 65, "kvp_max": 80, "kvp_ideal": 75, "mas_min": 8, "mas_max": 25},
    "HIP":       {"kvp_min": 70, "kvp_max": 85, "kvp_ideal": 78, "mas_min": 15, "mas_max": 40},
    "PELVIS":    {"kvp_min": 70, "kvp_max": 85, "kvp_ideal": 80, "mas_min": 15, "mas_max": 40},
    "L SPINE":   {"kvp_min": 75, "kvp_max": 95, "kvp_ideal": 85, "mas_min": 15, "mas_max": 60},
    "LSPINE":    {"kvp_min": 75, "kvp_max": 95, "kvp_ideal": 85, "mas_min": 15, "mas_max": 60},
    "T SPINE":   {"kvp_min": 70, "kvp_max": 85, "kvp_ideal": 78, "mas_min": 10, "mas_max": 40},
    "C SPINE":   {"kvp_min": 65, "kvp_max": 80, "kvp_ideal": 72, "mas_min": 8, "mas_max": 20},
    "CHEST":     {"kvp_min": 100, "kvp_max": 130, "kvp_ideal": 120, "mas_min": 2, "mas_max": 8},
    "ABDOMEN":   {"kvp_min": 70, "kvp_max": 85, "kvp_ideal": 80, "mas_min": 20, "mas_max": 50},
    "SKULL":     {"kvp_min": 70, "kvp_max": 85, "kvp_ideal": 80, "mas_min": 15, "mas_max": 30},
    "CLAVICLE":  {"kvp_min": 65, "kvp_max": 78, "kvp_ideal": 72, "mas_min": 6, "mas_max": 16},
    "RIBS":      {"kvp_min": 65, "kvp_max": 78, "kvp_ideal": 70, "mas_min": 8, "mas_max": 20},
    "FINGER":    {"kvp_min": 44, "kvp_max": 55, "kvp_ideal": 50, "mas_min": 2, "mas_max": 4},
    "TOE":       {"kvp_min": 44, "kvp_max": 55, "kvp_ideal": 50, "mas_min": 2, "mas_max": 4},
}


# ──────────────────────────────────────────────────────────────
# Motor de Inteligencia DICOM (Sin IA)
# ──────────────────────────────────────────────────────────────

def validate_technique(meta):
    """Valida kVp/mAs contra la tabla de protocolo para la parte del cuerpo."""
    body = (meta.get("body_part", "") or "").upper().strip()
    kvp_raw = meta.get("kvp", "")
    mas_raw = meta.get("exposure", "")
    result = {"body_part": body, "status": "unknown", "messages": [], "kvp": None, "mas": None}

    try:
        kvp = float(kvp_raw) if kvp_raw else None
        mas = float(mas_raw) if mas_raw else None
    except (ValueError, TypeError):
        kvp, mas = None, None

    result["kvp"] = kvp
    result["mas"] = mas

    # Find matching protocol
    chart = None
    for key, vals in TECHNIQUE_CHART.items():
        if key in body:
            chart = vals
            break

    if not chart:
        result["status"] = "no_protocol"
        result["messages"].append(f"No hay protocolo definido para '{body}'")
        result["score"] = 50
        result["recommendations"] = []
        return result

    issues = []
    good = []
    recs = []

    if kvp is not None:
        if kvp < chart["kvp_min"]:
            pct = round((chart["kvp_min"] - kvp) / chart["kvp_ideal"] * 100)
            issues.append(f"kVp bajo ({kvp}) — protocolo: {chart['kvp_min']}-{chart['kvp_max']}. Subexposición -{pct}%")
            recs.append(f"💡 Subir kVp a {chart['kvp_ideal']} kVp para obtener exposición óptima en {body}")
        elif kvp > chart["kvp_max"]:
            pct = round((kvp - chart["kvp_max"]) / chart["kvp_ideal"] * 100)
            issues.append(f"kVp alto ({kvp}) — protocolo: {chart['kvp_min']}-{chart['kvp_max']}. Sobreexposición +{pct}%")
            recs.append(f"💡 Bajar kVp a {chart['kvp_ideal']} kVp. El exceso de kVp reduce el contraste óseo")
        else:
            good.append(f"kVp correcto ({kvp}) ✓ Rango: {chart['kvp_min']}-{chart['kvp_max']}")
    else:
        issues.append("kVp no registrado en DICOM")
        recs.append(f"💡 Para {body}: usar {chart['kvp_ideal']} kVp (rango aceptable: {chart['kvp_min']}-{chart['kvp_max']} kVp)")

    if mas is not None:
        if mas < chart["mas_min"]:
            issues.append(f"mAs bajo ({mas}) — protocolo: {chart['mas_min']}-{chart['mas_max']}")
            ideal_mas = round((chart['mas_min'] + chart['mas_max']) / 2)
            recs.append(f"💡 Subir mAs a {ideal_mas} mAs. Paciente normal {body}: {chart['mas_min']}-{chart['mas_max']} mAs")
        elif mas > chart["mas_max"]:
            issues.append(f"mAs alto ({mas}) — protocolo: {chart['mas_min']}-{chart['mas_max']}")
            recs.append(f"💡 Bajar mAs a {chart['mas_max']} mAs máximo. El exceso de mAs aumenta la dosis sin beneficio")
        else:
            good.append(f"mAs correcto ({mas}) ✓ Rango: {chart['mas_min']}-{chart['mas_max']}")
    else:
        issues.append("mAs no registrado en DICOM")
        ideal_mas = round((chart['mas_min'] + chart['mas_max']) / 2)
        recs.append(f"💡 Para {body}: usar {ideal_mas} mAs (rango aceptable: {chart['mas_min']}-{chart['mas_max']} mAs)")

    if not issues:
        recs.append(f"✅ Técnica excelente para {body}. kVp y mAs dentro del protocolo estándar.")

    result["messages"] = good + issues
    result["recommendations"] = recs
    result["ideal_kvp"] = chart["kvp_ideal"]
    result["ideal_mas"] = round((chart['mas_min'] + chart['mas_max']) / 2)
    result["protocol"] = chart
    result["issues"] = len(issues)
    result["status"] = "ok" if len(issues) == 0 else ("warn" if len(issues) == 1 else "danger")
    result["score"] = 100 if not issues else max(0, 100 - len(issues) * 30)
    return result


def interpret_exposure_index(meta):
    """Interpreta el Exposure Index y Deviation Index del Carestream DRX-1."""
    ei_raw = meta.get("exposure_index", "")
    di_raw = meta.get("deviation_index", "")
    eit_raw = meta.get("target_exposure_index", "")

    result = {"ei": None, "di": None, "ei_target": None, "status": "no_data",
              "message": "Índices de exposición no disponibles en DICOM", "score": 50}

    try:
        if di_raw:
            di = float(di_raw)
            result["di"] = round(di, 2)
            if abs(di) <= 1:
                result["status"] = "optimal"
                result["message"] = f"Exposición óptima (DI={di:.1f}). Técnica perfecta."
                result["score"] = 100
                result["recommendation"] = "✅ DI entre -1 y +1. Exposición ideal — no cambiar nada."
            elif abs(di) <= 2:
                result["status"] = "acceptable"
                d = "sobreexpuesto" if di > 0 else "subexpuesto"
                result["message"] = f"Exposición aceptable (DI={di:.1f}). Ligeramente {d}."
                result["score"] = 80
                adj = "reducir" if di > 0 else "aumentar"
                result["recommendation"] = f"💡 Para DI=0 (perfecto): {adj} los mAs un ~{abs(di)*10:.0f}%. Meta: DI entre -1 y +1."
            elif abs(di) <= 3:
                result["status"] = "warn"
                d = "sobreexpuesto" if di > 0 else "subexpuesto"
                result["message"] = f"Exposición fuera del rango ideal (DI={di:.1f}). {d.capitalize()}."
                result["score"] = 55
                adj = "reducir" if di > 0 else "aumentar"
                result["recommendation"] = f"⚠️ {adj.capitalize()} mAs significativamente (~{abs(di)*15:.0f}%). DI ideal: 0. Aceptable: -1 a +1."
            else:
                result["status"] = "danger"
                d = "Sobreexposición" if di > 0 else "Subexposición"
                result["message"] = f"{d} significativa (DI={di:.1f}). Considerar repetir."
                result["score"] = 20
                adj = "reducir" if di > 0 else "aumentar"
                result["recommendation"] = f"🔴 Repetir estudio. {adj.capitalize()} mAs al doble o más. DI={di:.1f} está muy fuera de rango (ideal: 0, aceptable: -1 a +1)."
        if ei_raw:
            result["ei"] = round(float(ei_raw), 1)
        if eit_raw:
            result["ei_target"] = round(float(eit_raw), 1)
    except (ValueError, TypeError):
        pass

    if "recommendation" not in result:
        result["recommendation"] = "💡 Para score 100: DI debe estar entre -1 y +1. Ajustar mAs según el EI Target del equipo."

    return result


def analyze_histogram(pixel_array):
    """Análisis estadístico del histograma sin IA."""
    pixels = pixel_array.flatten().astype(np.float64)
    total = len(pixels)
    if total == 0:
        return {"status": "error", "message": "Sin datos de píxeles", "score": 0}

    p_min, p_max = float(np.min(pixels)), float(np.max(pixels))
    p_mean = float(np.mean(pixels))
    p_std = float(np.std(pixels))
    p5 = float(np.percentile(pixels, 5))
    p95 = float(np.percentile(pixels, 95))
    bits = int(np.ceil(np.log2(max(p_max, 1) + 1)))
    max_possible = (2 ** bits) - 1 if bits > 0 else 255

    # Dynamic range utilization
    dynamic_range = ((p95 - p5) / max_possible * 100) if max_possible > 0 else 0

    # Skewness (simplified)
    if p_std > 0:
        skewness = float(np.mean(((pixels - p_mean) / p_std) ** 3))
    else:
        skewness = 0.0

    # Build histogram (256 bins)
    hist, _ = np.histogram(pixels, bins=256)
    hist_normalized = (hist / hist.max() * 100).tolist() if hist.max() > 0 else [0]*256

    # Score calculation
    score = 50
    if dynamic_range >= 60:
        score += 25
    elif dynamic_range >= 40:
        score += 15
    elif dynamic_range >= 20:
        score += 5
    if abs(skewness) < 1.0:
        score += 15
    elif abs(skewness) < 2.0:
        score += 5
    # Penalize clipping
    clipped_low = float(np.sum(pixels <= p_min + 1)) / total * 100
    clipped_high = float(np.sum(pixels >= p_max - 1)) / total * 100
    if clipped_low > 5 or clipped_high > 5:
        score -= 15
    score = max(0, min(100, int(score + 10)))

    status = "good" if score >= 70 else ("warn" if score >= 50 else "danger")

    return {
        "status": status, "score": score,
        "dynamic_range_pct": round(dynamic_range, 1),
        "mean": round(p_mean, 1), "std_dev": round(p_std, 1),
        "skewness": round(skewness, 2),
        "percentile_5": round(p5, 1), "percentile_95": round(p95, 1),
        "pixel_min": round(p_min), "pixel_max": round(p_max),
        "clipped_low_pct": round(clipped_low, 2), "clipped_high_pct": round(clipped_high, 2),
        "bits_effective": bits,
        "histogram": [round(v, 1) for v in hist_normalized],
        "message": f"Rango dinámico: {dynamic_range:.0f}% · Asimetría: {skewness:.1f} · Bits efectivos: {bits}"
    }


def detect_collimation(pixel_array):
    """Detecta colimación analizando bordes oscuros de la imagen."""
    h, w = pixel_array.shape[:2]
    border = max(1, int(min(h, w) * 0.05))

    top = float(np.mean(pixel_array[:border, :]))
    bottom = float(np.mean(pixel_array[-border:, :]))
    left = float(np.mean(pixel_array[:, :border]))
    right = float(np.mean(pixel_array[:, -border:]))
    center = float(np.mean(pixel_array[h//4:3*h//4, w//4:3*w//4]))

    border_avg = (top + bottom + left + right) / 4
    ratio = border_avg / center if center > 0 else 1.0

    if ratio < 0.3:
        return {"detected": True, "status": "good", "ratio": round(ratio, 3),
                "message": "Colimación excelente ✅ — Bordes oscuros, menor dosis al paciente", "score": 100,
                "recommendation": "✅ Colimación correcta. El campo de radiación está bien delimitado."}
    elif ratio < 0.6:
        return {"detected": True, "status": "partial", "ratio": round(ratio, 3),
                "message": "Colimación parcial ⚠️ — Bordes moderadamente oscuros", "score": 70,
                "recommendation": "💡 Para score 100: cerrar más los colimadores del equipo. La colimación reduce la dosis y mejora el contraste por reducción de radiación dispersa."}
    else:
        return {"detected": False, "status": "none", "ratio": round(ratio, 3),
                "message": "Sin colimación detectada ❌ — Campo abierto, mayor dosis", "score": 30,
                "recommendation": "⚠️ Cerrar los colimadores al área de interés. La colimación reduce hasta un 50% la dosis al paciente y mejora significativamente el contraste de la imagen."}


def check_nom_229(meta):
    """Verifica cumplimiento con NOM-229-SSA1-2002."""
    checks = []
    score = 0
    total = 0

    def chk(field, label, weight=1):
        nonlocal score, total
        total += weight
        val = meta.get(field, "")
        passed = bool(val and str(val).strip())
        checks.append({"field": label, "status": "ok" if passed else "missing", "present": passed})
        if passed:
            score += weight

    chk("patient_name", "Nombre del paciente", 2)
    chk("patient_id", "ID del paciente", 2)
    chk("patient_sex", "Sexo del paciente", 1)
    chk("patient_age", "Edad del paciente", 1)
    chk("study_date", "Fecha del estudio", 2)
    chk("institution", "Institución", 1)
    chk("referring_physician", "Médico referente", 1)
    chk("body_part", "Parte del cuerpo", 2)
    chk("view_position", "Proyección/Vista", 1)
    chk("image_laterality", "Marcador L/R", 2)
    chk("kvp", "kVp registrado", 1)
    chk("exposure", "mAs registrado", 1)

    pct = round(score / total * 100) if total > 0 else 0
    status = "compliant" if pct >= 90 else ("partial" if pct >= 70 else "non_compliant")
    n_passed = sum(1 for c in checks if c["present"])

    return {
        "checks": checks, "score": pct, "status": status,
        "passed": n_passed, "total": len(checks),
        "message": f"{n_passed}/{len(checks)} campos presentes — {'Cumple' if pct >= 90 else 'Parcial' if pct >= 70 else 'No cumple'} NOM-229-SSA1"
    }


def calculate_quality_score(technique, exposure, histogram, collimation, nom):
    """Calcula el score de calidad integral (0-100)."""
    w = {"technique": 0.25, "exposure": 0.25, "histogram": 0.15, "collimation": 0.15, "nom": 0.20}
    weighted = (
        technique.get("score", 50) * w["technique"] +
        exposure.get("score", 50) * w["exposure"] +
        histogram.get("score", 50) * w["histogram"] +
        collimation.get("score", 50) * w["collimation"] +
        nom.get("score", 50) * w["nom"]
    )
    score = int(round(weighted))
    if score >= 85:
        status, label = "excellent", "Excelente"
    elif score >= 70:
        status, label = "good", "Buena"
    elif score >= 50:
        status, label = "acceptable", "Aceptable"
    else:
        status, label = "poor", "Deficiente"

    return {
        "score": score, "status": status, "label": label,
        "breakdown": {
            "technique": technique.get("score", 50),
            "exposure": exposure.get("score", 50),
            "histogram": histogram.get("score", 50),
            "collimation": collimation.get("score", 50),
            "nom": nom.get("score", 50),
        }
    }


# ═══════════════════════════════════════════════════════════
# ANOMALY DETECTION (Sin IA — Classical Image Processing)
# ═══════════════════════════════════════════════════════════
def detect_anomalies(pixel_array, meta=None):
    """
    Detecta anomalías radiográficas usando procesamiento de imagen clásico.
    NO es un diagnóstico médico. Es una herramienta de screening/alerta.
    """
    findings = []
    regions = []  # Coordinated regions for frontend overlay
    h, w = pixel_array.shape[:2]
    pixels = pixel_array.astype(np.float64)
    
    # Normalize to 0-1 for consistent analysis
    p_min, p_max = float(np.min(pixels)), float(np.max(pixels))
    if p_max > p_min:
        normalized = (pixels - p_min) / (p_max - p_min)
    else:
        normalized = np.zeros_like(pixels, dtype=np.float64)
    
    p_mean = float(np.mean(normalized))
    p_std = float(np.std(normalized))
    
    severity_score = 0  # 0=normal, accumulates with findings
    
    # ── 1. METAL / FOREIGN BODY DETECTION ──────────────────────
    # Very bright regions (>97th percentile with significant area)
    threshold_metal = float(np.percentile(normalized, 97))
    metal_mask = normalized > max(threshold_metal, 0.92)
    metal_pixels = int(np.sum(metal_mask))
    metal_pct = metal_pixels / (h * w) * 100
    
    metal_detected = False
    metal_regions = []
    
    if metal_pct > 0.05 and metal_pct < 15:  # Between 0.05% and 15% (not just noise, not entire image)
        # Find connected components of metal
        from scipy import ndimage
        labeled, num_features = ndimage.label(metal_mask)
        
        for i in range(1, min(num_features + 1, 6)):  # Max 5 regions
            component = labeled == i
            comp_size = int(np.sum(component))
            if comp_size < 20:  # Too small, likely noise
                continue
            
            # Get bounding box
            rows = np.any(component, axis=1)
            cols = np.any(component, axis=0)
            rmin, rmax = np.where(rows)[0][[0, -1]]
            cmin, cmax = np.where(cols)[0][[0, -1]]
            
            # Calculate region intensity
            region_mean = float(np.mean(normalized[component]))
            
            # Determine quadrant
            cy, cx = (rmin + rmax) / 2, (cmin + cmax) / 2
            quadrant = get_quadrant(cy, cx, h, w)
            
            metal_detected = True
            metal_regions.append({
                "x": int(cmin), "y": int(rmin),
                "w": int(cmax - cmin), "h": int(rmax - rmin),
                "quadrant": quadrant,
                "intensity": round(region_mean, 3),
                "pixels": comp_size,
            })
    
    if metal_detected:
        quadrants = list(set(r["quadrant"] for r in metal_regions))
        findings.append({
            "type": "metal",
            "severity": "alert",
            "icon": "🔩",
            "title": "Material de alta densidad detectado",
            "message": f"Se detecta{'n' if len(metal_regions) > 1 else ''} {len(metal_regions)} región{'es' if len(metal_regions) > 1 else ''} de densidad extremadamente alta en {', '.join(quadrants)}. Puede ser material metálico, implante o artefacto.",
            "regions": metal_regions,
        })
        severity_score += 30
        regions.extend(metal_regions)
    else:
        findings.append({
            "type": "metal",
            "severity": "normal",
            "icon": "✅",
            "title": "Sin material metálico",
            "message": "No se detectan regiones de densidad extrema compatibles con material metálico o cuerpos extraños.",
        })
    
    # ── 2. DENSITY ANOMALY PER QUADRANT ────────────────────────
    # Divide image into 4 quadrants and compare densities
    mid_h, mid_w = h // 2, w // 2
    quadrants_data = {
        "Superior Izquierdo": normalized[:mid_h, :mid_w],
        "Superior Derecho": normalized[:mid_h, mid_w:],
        "Inferior Izquierdo": normalized[mid_h:, :mid_w],
        "Inferior Derecho": normalized[mid_h:, mid_w:],
    }
    
    q_means = {k: float(np.mean(v)) for k, v in quadrants_data.items()}
    q_stds = {k: float(np.std(v)) for k, v in quadrants_data.items()}
    global_mean = float(np.mean(list(q_means.values())))
    global_std = float(np.std(list(q_means.values())))
    
    density_anomalies = []
    if global_std > 0.01:  # There's meaningful variation between quadrants
        for qname, qmean in q_means.items():
            z_score = abs(qmean - global_mean) / max(global_std, 0.001)
            if z_score > 2.0:  # Significant deviation
                direction = "más densa" if qmean > global_mean else "menos densa"
                density_anomalies.append({
                    "quadrant": qname,
                    "z_score": round(z_score, 2),
                    "direction": direction,
                    "mean": round(qmean, 4),
                })
    
    if density_anomalies:
        msgs = [f"{d['quadrant']}: {d['direction']} (Z={d['z_score']})" for d in density_anomalies]
        findings.append({
            "type": "density",
            "severity": "warn",
            "icon": "📊",
            "title": "Anomalía de densidad entre cuadrantes",
            "message": f"Se detecta variación significativa de densidad: {'; '.join(msgs)}. Podría indicar patología, posición incorrecta o anatomía asimétrica.",
            "details": density_anomalies,
        })
        severity_score += 15 * len(density_anomalies)
    else:
        findings.append({
            "type": "density",
            "severity": "normal",
            "icon": "✅",
            "title": "Densidad uniforme",
            "message": "La distribución de densidad entre cuadrantes es homogénea. No se detectan áreas con desviación significativa.",
        })
    
    # ── 3. ASYMMETRY ANALYSIS (Left vs Right) ──────────────────
    left_half = normalized[:, :mid_w]
    right_half = normalized[:, mid_w:]
    # Flip right half for proper comparison
    right_flipped = np.fliplr(right_half)
    
    # Resize to match if needed
    min_w_half = min(left_half.shape[1], right_flipped.shape[1])
    left_crop = left_half[:, :min_w_half]
    right_crop = right_flipped[:, :min_w_half]
    
    # Compare histograms (Bhattacharyya-like distance)
    left_hist, _ = np.histogram(left_crop, bins=64, range=(0, 1))
    right_hist, _ = np.histogram(right_crop, bins=64, range=(0, 1))
    
    left_norm = left_hist / max(left_hist.sum(), 1)
    right_norm = right_hist / max(right_hist.sum(), 1)
    
    # Bhattacharyya coefficient (1 = identical, 0 = completely different)
    bc = float(np.sum(np.sqrt(left_norm * right_norm)))
    asymmetry_pct = round((1 - bc) * 100, 1)
    
    # Also compare mean absolute difference pixel by pixel
    if left_crop.shape == right_crop.shape:
        pixel_diff = np.abs(left_crop - right_crop)
        mean_diff = float(np.mean(pixel_diff))
        max_diff_region = float(np.percentile(pixel_diff, 95))
    else:
        mean_diff = 0
        max_diff_region = 0
    
    if asymmetry_pct > 15 or mean_diff > 0.15:
        severity_label = "alta" if asymmetry_pct > 30 else "moderada"
        findings.append({
            "type": "asymmetry",
            "severity": "warn" if asymmetry_pct <= 30 else "alert",
            "icon": "🪞",
            "title": f"Asimetría {severity_label} detectada",
            "message": f"Diferencia izquierda-derecha: {asymmetry_pct}%. Las mitades de la imagen muestran distribución de densidad significativamente diferente. En estudios simétricos (tórax, pelvis) esto puede indicar patología unilateral.",
            "asymmetry_pct": asymmetry_pct,
            "mean_pixel_diff": round(mean_diff, 4),
        })
        severity_score += 10 if asymmetry_pct <= 30 else 20
    else:
        findings.append({
            "type": "asymmetry",
            "severity": "normal",
            "icon": "✅",
            "title": "Simetría adecuada",
            "message": f"Diferencia izquierda-derecha: {asymmetry_pct}%. La distribución de densidad es razonablemente simétrica.",
            "asymmetry_pct": asymmetry_pct,
        })
    
    # ── 4. EDGE DISCONTINUITY (Potential fracture lines) ───────
    # Use Canny-like edge detection to find sharp edges
    # Then analyze contour regularity
    try:
        # Downsample for performance
        scale = max(1, min(h, w) // 512)
        small = normalized[::scale, ::scale]
        sh, sw = small.shape
        
        # Sobel gradients
        from scipy.ndimage import sobel, gaussian_filter
        smoothed = gaussian_filter(small, sigma=1.5)
        gx = sobel(smoothed, axis=1)
        gy = sobel(smoothed, axis=0)
        magnitude = np.sqrt(gx**2 + gy**2)
        
        # Threshold to get strong edges
        edge_threshold = float(np.percentile(magnitude, 92))
        strong_edges = magnitude > edge_threshold
        
        # Look for unusual edge patterns: clusters of strong edges
        # in areas that should be smooth (interior of bone/tissue)
        # Divide into a grid and check edge density
        grid_rows, grid_cols = 8, 8
        cell_h, cell_w = sh // grid_rows, sw // grid_cols
        
        edge_densities = []
        for gi in range(grid_rows):
            for gj in range(grid_cols):
                cell = strong_edges[gi*cell_h:(gi+1)*cell_h, gj*cell_w:(gj+1)*cell_w]
                density = float(np.mean(cell))
                edge_densities.append({
                    "row": gi, "col": gj,
                    "density": density,
                    "x": gj * cell_w * scale,
                    "y": gi * cell_h * scale,
                    "w": cell_w * scale,
                    "h": cell_h * scale,
                })
        
        mean_edge_density = float(np.mean([e["density"] for e in edge_densities]))
        std_edge_density = float(np.std([e["density"] for e in edge_densities]))
        
        # Find cells with unusually high edge density (potential fractures, foreign bodies)
        suspicious_cells = []
        if std_edge_density > 0.005:
            for cell in edge_densities:
                z = (cell["density"] - mean_edge_density) / max(std_edge_density, 0.001)
                if z > 2.5 and cell["density"] > 0.15:
                    quadrant = get_quadrant(cell["y"] + cell["h"]//2, cell["x"] + cell["w"]//2, h, w)
                    suspicious_cells.append({
                        "quadrant": quadrant,
                        "z_score": round(z, 2),
                        "x": cell["x"], "y": cell["y"],
                        "w": cell["w"], "h": cell["h"],
                    })
        
        if suspicious_cells and len(suspicious_cells) <= 8:
            quadrants_affected = list(set(c["quadrant"] for c in suspicious_cells))
            findings.append({
                "type": "edge_discontinuity",
                "severity": "warn",
                "icon": "📐",
                "title": "Discontinuidad de bordes detectada",
                "message": f"Se detectan {len(suspicious_cells)} zona(s) con concentración inusual de bordes en {', '.join(quadrants_affected)}. Podría indicar fractura, calcificación, o variante anatómica. Verificar con radiólogo.",
                "regions": suspicious_cells,
            })
            severity_score += 15
            regions.extend(suspicious_cells)
        else:
            findings.append({
                "type": "edge_discontinuity",
                "severity": "normal",
                "icon": "✅",
                "title": "Contornos regulares",
                "message": "No se detectan concentraciones inusuales de bordes que pudieran sugerir discontinuidad ósea.",
            })
    except Exception as e:
        findings.append({
            "type": "edge_discontinuity",
            "severity": "info",
            "icon": "ℹ️",
            "title": "Análisis de bordes no disponible",
            "message": f"No se pudo completar el análisis de bordes: {str(e)[:100]}",
        })
    
    # ── 5. SUSPICIOUS BRIGHT/DARK SPOTS ────────────────────────
    # Detect isolated very bright or very dark spots (possible lesions)
    try:
        from scipy.ndimage import uniform_filter
        local_mean = uniform_filter(normalized, size=min(h, w) // 8)
        deviation = np.abs(normalized - local_mean)
        
        # Find pixels that deviate significantly from local average
        dev_threshold = float(np.percentile(deviation, 98))
        suspicious_mask = deviation > max(dev_threshold, 0.2)
        suspicious_pct = float(np.sum(suspicious_mask)) / (h * w) * 100
        
        if suspicious_pct > 0.5 and suspicious_pct < 20:
            # Find the most suspicious region
            labeled_spots, n_spots = ndimage.label(suspicious_mask)
            spot_sizes = ndimage.sum(suspicious_mask, labeled_spots, range(1, n_spots + 1))
            
            significant_spots = []
            for idx, size in enumerate(spot_sizes):
                if size > 50:  # Minimum size
                    component = labeled_spots == (idx + 1)
                    rows_s = np.any(component, axis=1)
                    cols_s = np.any(component, axis=0)
                    if np.any(rows_s) and np.any(cols_s):
                        rmin, rmax = np.where(rows_s)[0][[0, -1]]
                        cmin, cmax = np.where(cols_s)[0][[0, -1]]
                        
                        spot_mean = float(np.mean(normalized[component]))
                        spot_type = "brillante" if spot_mean > p_mean else "oscura"
                        quadrant = get_quadrant((rmin+rmax)/2, (cmin+cmax)/2, h, w)
                        
                        significant_spots.append({
                            "type": spot_type,
                            "quadrant": quadrant,
                            "x": int(cmin), "y": int(rmin),
                            "w": int(cmax - cmin), "h": int(rmax - rmin),
                            "size_px": int(size),
                        })
                        if len(significant_spots) >= 5:
                            break
            
            if significant_spots:
                bright = [s for s in significant_spots if s["type"] == "brillante"]
                dark = [s for s in significant_spots if s["type"] == "oscura"]
                parts = []
                if bright:
                    parts.append(f"{len(bright)} zona(s) brillante(s)")
                if dark:
                    parts.append(f"{len(dark)} zona(s) oscura(s)")
                
                findings.append({
                    "type": "spots",
                    "severity": "warn",
                    "icon": "🔍",
                    "title": "Zonas de densidad inusual",
                    "message": f"Se detectan {' y '.join(parts)} que difieren significativamente de su entorno local. Las zonas brillantes podrían indicar calcificaciones, esclerosis o artefactos. Las zonas oscuras podrían indicar lesiones líticas, aire o tejido blando.",
                    "regions": significant_spots,
                })
                severity_score += 10
                regions.extend(significant_spots)
        
        if not any(f["type"] == "spots" for f in findings):
            findings.append({
                "type": "spots",
                "severity": "normal",
                "icon": "✅",
                "title": "Sin focos sospechosos",
                "message": "No se detectan zonas aisladas con densidad anormalmente diferente a su entorno.",
            })
    except Exception:
        pass
    
    # ── BUILD RESULT ───────────────────────────────────────────
    total_alerts = sum(1 for f in findings if f["severity"] in ("warn", "alert"))
    
    if total_alerts == 0:
        overall_status = "normal"
        overall_label = "Sin hallazgos significativos"
        overall_icon = "✅"
    elif severity_score < 25:
        overall_status = "minor"
        overall_label = "Hallazgos menores"
        overall_icon = "🟡"
    elif severity_score < 50:
        overall_status = "moderate"
        overall_label = "Hallazgos moderados — Verificar"
        overall_icon = "🟠"
    else:
        overall_status = "significant"
        overall_label = "Hallazgos significativos — Requiere revisión"
        overall_icon = "🔴"
    
    return {
        "status": overall_status,
        "label": overall_label,
        "icon": overall_icon,
        "severity_score": min(severity_score, 100),
        "total_findings": len(findings),
        "alerts": total_alerts,
        "findings": findings,
        "regions": regions,
        "disclaimer": "⚕️ AVISO: Este análisis utiliza procesamiento de imagen clásico (no IA). NO constituye un diagnóstico médico. Los hallazgos son indicativos y deben ser verificados por un médico radiólogo calificado. Nunca sustituye la interpretación profesional.",
    }


def get_quadrant(y, x, h, w):
    """Determina el cuadrante de un punto en la imagen."""
    top = y < h / 2
    left = x < w / 2
    if top and left: return "Superior Izquierdo"
    if top and not left: return "Superior Derecho"
    if not top and left: return "Inferior Izquierdo"
    return "Inferior Derecho"

def run_dicom_intelligence(meta, pixel_array):
    """Ejecuta todo el motor de inteligencia DICOM."""
    technique = validate_technique(meta)
    exposure = interpret_exposure_index(meta)
    histogram = analyze_histogram(pixel_array)
    collimation = detect_collimation(pixel_array)
    nom = check_nom_229(meta)
    quality = calculate_quality_score(technique, exposure, histogram, collimation, nom)
    anomalies = detect_anomalies(pixel_array, meta)

    return {
        "quality_score": quality,
        "technique": technique,
        "exposure_index": exposure,
        "histogram": histogram,
        "collimation": collimation,
        "nom_229": nom,
        "anomalies": anomalies,
    }


# ──────────────────────────────────────────────────────────────
# Funciones de utilidad
# ──────────────────────────────────────────────────────────────

def is_dicom_file(filepath):
    """Verifica si un archivo es DICOM leyendo la firma mágica 'DICM' en byte 128."""
    try:
        with open(filepath, 'rb') as f:
            f.seek(128)
            return f.read(4) == b'DICM'
    except (IOError, OSError):
        return False


def find_dicom_files(path):
    """Encuentra recursivamente todos los archivos DICOM en un directorio."""
    path = Path(path)
    dicom_files = []

    if path.is_file():
        if is_dicom_file(path):
            dicom_files.append(str(path))
        return dicom_files

    for root, dirs, files in os.walk(str(path)):
        for filename in files:
            filepath = os.path.join(root, filename)
            if is_dicom_file(filepath):
                dicom_files.append(filepath)

    return sorted(dicom_files)


def extract_metadata(ds):
    """Extrae metadatos clínicos y técnicos del dataset DICOM."""
    def safe_get(ds, tag, default=""):
        try:
            val = getattr(ds, tag, default)
            if val is None:
                return default
            return str(val).strip()
        except Exception:
            return default

    meta = {
        # Datos del paciente
        "patient_name":   safe_get(ds, "PatientName"),
        "patient_id":     safe_get(ds, "PatientID"),
        "patient_birth":  safe_get(ds, "PatientBirthDate"),
        "patient_sex":    safe_get(ds, "PatientSex"),
        "patient_age":    safe_get(ds, "PatientAge"),

        # Datos del estudio
        "study_date":        safe_get(ds, "StudyDate"),
        "study_time":        safe_get(ds, "StudyTime"),
        "study_description": safe_get(ds, "StudyDescription"),
        "accession_number":  safe_get(ds, "AccessionNumber"),
        "institution":       safe_get(ds, "InstitutionName"),
        "referring_physician": safe_get(ds, "ReferringPhysicianName"),

        # Datos de la serie / imagen
        "modality":          safe_get(ds, "Modality"),
        "body_part":         safe_get(ds, "BodyPartExamined"),
        "view_position":     safe_get(ds, "ViewPosition"),
        "patient_position":  safe_get(ds, "PatientPosition"),
        "series_description": safe_get(ds, "SeriesDescription"),
        "image_laterality":  safe_get(ds, "ImageLaterality"),

        # Parámetros técnicos
        "kvp":               safe_get(ds, "KVP"),
        "exposure":          safe_get(ds, "Exposure"),
        "exposure_time":     safe_get(ds, "ExposureTime"),
        "tube_current":      safe_get(ds, "XRayTubeCurrent"),
        "sensitivity":       safe_get(ds, "Sensitivity"),
        "detector_type":     safe_get(ds, "DetectorType"),

        # Índices de Exposición (IEC 62494-1) — Carestream DRX-1
        "exposure_index":    safe_get(ds, "ExposureIndex"),
        "target_exposure_index": safe_get(ds, "TargetExposureIndex"),
        "deviation_index":   safe_get(ds, "DeviationIndex"),

        # Temporal (para detección de repeticiones)
        "acquisition_time":  safe_get(ds, "AcquisitionTime"),
        "acquisition_date":  safe_get(ds, "AcquisitionDate"),
        "series_number":     safe_get(ds, "SeriesNumber"),

        # Equipo
        "manufacturer":      safe_get(ds, "Manufacturer"),
        "model":             safe_get(ds, "ManufacturerModelName"),
        "station_name":      safe_get(ds, "StationName"),
        "software_version":  safe_get(ds, "SoftwareVersions"),

        # Geometría de la imagen
        "rows":              safe_get(ds, "Rows"),
        "columns":           safe_get(ds, "Columns"),
        "bits_stored":       safe_get(ds, "BitsStored"),
        "bits_allocated":    safe_get(ds, "BitsAllocated"),
        "pixel_spacing":     safe_get(ds, "PixelSpacing"),
        "photometric":       safe_get(ds, "PhotometricInterpretation"),
        "rescale_slope":     safe_get(ds, "RescaleSlope", "1"),
        "rescale_intercept": safe_get(ds, "RescaleIntercept", "0"),
        "window_center":     safe_get(ds, "WindowCenter"),
        "window_width":      safe_get(ds, "WindowWidth"),
    }

    return meta


def detect_preset(meta):
    """Detecta automáticamente el preset de windowing basándose en metadatos DICOM."""
    body_part = meta.get("body_part", "").upper()
    if body_part and body_part in BODY_PART_TO_PRESET:
        return BODY_PART_TO_PRESET[body_part]

    # Fallback: intentar con la descripción del estudio
    desc = (meta.get("study_description", "") + " " + meta.get("series_description", "")).upper()
    for keyword, preset in [
        ("TORAX", "pulmon"), ("CHEST", "pulmon"), ("THORAX", "pulmon"), ("PULMON", "pulmon"),
        ("ABDOMEN", "abdomen"), ("PELVIS", "hueso"),
        ("CRANEO", "cerebro"), ("SKULL", "cerebro"), ("HEAD", "cerebro"), ("BRAIN", "cerebro"),
        ("COLUMNA", "columna"), ("SPINE", "columna"), ("VERTEBR", "columna"),
        ("MANO", "extremidades"), ("HAND", "extremidades"), ("PIE", "extremidades"), 
        ("FOOT", "extremidades"), ("RODILLA", "extremidades"), ("KNEE", "extremidades"),
        ("TOBILLO", "extremidades"), ("ANKLE", "extremidades"),
        ("HOMBRO", "hueso"), ("SHOULDER", "hueso"), ("CADERA", "hueso"), ("HIP", "hueso"),
        ("FEMUR", "hueso"), ("TIBIA", "hueso"),
    ]:
        if keyword in desc:
            return preset

    return None  # No se detectó → usaremos el windowing del DICOM o un default


def apply_windowing(pixel_array, ds, preset_name=None):
    """
    Aplica windowing (LUT de ventana) al array de píxeles DICOM.
    
    Si se especifica un preset, usa esos valores WC/WW.
    Si no, intenta usar los valores del DICOM mismo.
    Si no hay ninguno, usa normalización automática.
    """
    # Primero: aplicar la LUT de modalidad (Rescale Slope/Intercept → Hounsfield Units en CT)
    try:
        img = apply_modality_lut(pixel_array, ds)
    except Exception:
        img = pixel_array.astype(np.float64)

    # Intentar VOI LUT del DICOM primero (si no hay preset manual)
    if preset_name is None or preset_name == "dicom":
        try:
            img = apply_voi_lut(img, ds)
            # Normalizar a 0-255
            img = img.astype(np.float64)
            img_min, img_max = img.min(), img.max()
            if img_max > img_min:
                img = (img - img_min) / (img_max - img_min) * 255.0
            return img.astype(np.uint8)
        except Exception:
            pass

    # Usar preset de windowing
    if preset_name and preset_name in WINDOW_PRESETS:
        wc = WINDOW_PRESETS[preset_name]["wc"]
        ww = WINDOW_PRESETS[preset_name]["ww"]
    else:
        # Intentar leer del DICOM
        try:
            wc = float(ds.WindowCenter[0] if isinstance(ds.WindowCenter, (list, pydicom.multival.MultiValue)) else ds.WindowCenter)
            ww = float(ds.WindowWidth[0] if isinstance(ds.WindowWidth, (list, pydicom.multival.MultiValue)) else ds.WindowWidth)
        except (AttributeError, TypeError, ValueError, IndexError):
            # Fallback: normalización automática
            img = img.astype(np.float64)
            p2, p98 = np.percentile(img, [2, 98])
            img = np.clip(img, p2, p98)
            if p98 > p2:
                img = (img - p2) / (p98 - p2) * 255.0
            return img.astype(np.uint8)

    # Aplicar windowing manual con WC/WW
    img = img.astype(np.float64)
    low = wc - ww / 2.0
    high = wc + ww / 2.0
    img = np.clip(img, low, high)
    img = (img - low) / (high - low) * 255.0

    return img.astype(np.uint8)


def apply_clahe(image_8bit, preset_name="hueso"):
    """Aplica CLAHE adaptativo con parámetros calibrados por tipo de imagen."""
    params = CLAHE_PARAMS.get(preset_name, {"clipLimit": 3.0, "tileGridSize": (8, 8)})
    clahe = cv2.createCLAHE(
        clipLimit=params["clipLimit"],
        tileGridSize=params["tileGridSize"]
    )
    return clahe.apply(image_8bit)


def apply_unsharp_mask(image_8bit, sigma=2.0, strength=1.5):
    """Unsharp Masking: resalta bordes óseos para detectar fracturas sutiles."""
    blurred = cv2.GaussianBlur(image_8bit, (0, 0), sigma)
    sharpened = cv2.addWeighted(image_8bit, 1.0 + strength, blurred, -strength, 0)
    return np.clip(sharpened, 0, 255).astype(np.uint8)


def fix_photometric(image_8bit, ds):
    """Si la interpretación fotométrica es MONOCHROME1, invierte (el hueso aparece blanco)."""
    photometric = getattr(ds, "PhotometricInterpretation", "MONOCHROME2")
    if photometric == "MONOCHROME1":
        return 255 - image_8bit
    return image_8bit


def generate_output_filename(meta, index=0):
    """Genera un nombre de archivo descriptivo basado en los metadatos del paciente."""
    parts = []

    # Nombre del paciente (limpio)
    name = meta.get("patient_name", "DESCONOCIDO")
    name = name.replace("^", "_").replace(" ", "_").replace(",", "_")
    name = "".join(c for c in name if c.isalnum() or c == "_")
    if name:
        parts.append(name[:40])

    # Parte del cuerpo
    body = meta.get("body_part", "") or meta.get("study_description", "")
    body = body.replace(" ", "_").upper()[:20]
    if body:
        parts.append(body)

    # Vista
    view = meta.get("view_position", "")
    if view:
        parts.append(view.upper())

    # Fecha
    date = meta.get("study_date", "")
    if date and len(date) == 8:
        parts.append(date)

    # Índice (si hay múltiples imágenes)
    if index > 0:
        parts.append(f"{index:03d}")

    filename = "_".join(parts) if parts else f"DICOM_{index:03d}"
    return filename


# ──────────────────────────────────────────────────────────────
# Función principal: Procesar un archivo DICOM
# ──────────────────────────────────────────────────────────────

def process_dicom_file(filepath, output_dir, preset="auto", apply_clahe_flag=True, 
                        apply_unsharp_flag=False, index=0):
    """
    Procesa un archivo DICOM y genera una imagen de salida de alta calidad.
    
    Retorna un diccionario con los metadatos y la ruta del archivo generado.
    """
    print(f"\n{'─'*60}")
    print(f"📂 Procesando: {os.path.basename(filepath)}")

    # 1. Leer el archivo DICOM
    try:
        ds = pydicom.dcmread(filepath, force=True)
    except Exception as e:
        print(f"  ❌ Error leyendo DICOM: {e}")
        return None

    # 2. Verificar que tiene píxeles
    if not hasattr(ds, 'pixel_array'):
        try:
            ds.decompress()
        except Exception:
            print(f"  ❌ No se pueden leer los píxeles (transfer syntax no soportado)")
            return None

    try:
        pixel_array = ds.pixel_array
    except Exception as e:
        print(f"  ❌ Error extrayendo píxeles: {e}")
        return None

    # 3. Extraer metadatos
    meta = extract_metadata(ds)
    print(f"  👤 Paciente: {meta['patient_name'] or 'Anónimo'}")
    print(f"  📋 Estudio:  {meta['study_description'] or meta['body_part'] or meta['modality']}")
    print(f"  🏥 Equipo:   {meta['manufacturer']} {meta['model']}")
    print(f"  📐 Imagen:   {meta['rows']}×{meta['columns']} px, {meta['bits_stored']} bits")
    if meta['kvp']:
        print(f"  ⚡ Técnica:  {meta['kvp']} kVp, {meta['exposure']} mAs")

    # 4. Detectar preset de windowing
    if preset == "auto":
        detected = detect_preset(meta)
        if detected:
            preset_name = detected
            print(f"  🎯 Preset detectado: {WINDOW_PRESETS[detected]['desc']}")
        else:
            preset_name = None
            print(f"  🎯 Preset: Automático (usando valores del DICOM)")
    elif preset == "dicom":
        preset_name = None
        print(f"  🎯 Preset: Valores originales del DICOM")
    else:
        preset_name = preset
        print(f"  🎯 Preset: {WINDOW_PRESETS.get(preset, {}).get('desc', preset)}")

    # 5. Aplicar windowing
    image_8bit = apply_windowing(pixel_array, ds, preset_name)

    # 6. Corregir interpretación fotométrica
    image_8bit = fix_photometric(image_8bit, ds)

    # 7. Aplicar CLAHE (mejora de contraste adaptativo)
    if apply_clahe_flag:
        clahe_preset = preset_name or "hueso"
        image_8bit = apply_clahe(image_8bit, clahe_preset)
        print(f"  ✨ CLAHE aplicado (preset: {clahe_preset})")

    # 8. Aplicar Unsharp Masking (opcional)
    if apply_unsharp_flag:
        image_8bit = apply_unsharp_mask(image_8bit)
        print(f"  🔍 Unsharp Masking aplicado")

    # 9. Generar nombre del archivo y guardar
    output_name = generate_output_filename(meta, index)
    output_path_jpg = os.path.join(output_dir, f"{output_name}.jpg")
    output_path_json = os.path.join(output_dir, f"{output_name}.json")

    # Guardar JPG con calidad máxima
    cv2.imwrite(output_path_jpg, image_8bit, [cv2.IMWRITE_JPEG_QUALITY, 95])
    print(f"  💾 JPG guardado: {output_path_jpg}")

    # Guardar metadatos como JSON
    meta["_source_file"] = os.path.basename(filepath)
    meta["_preset_used"] = preset_name or "auto/dicom"
    meta["_clahe_applied"] = apply_clahe_flag
    meta["_unsharp_applied"] = apply_unsharp_flag
    meta["_output_file"] = os.path.basename(output_path_jpg)
    meta["_processed_at"] = datetime.now().isoformat()

    with open(output_path_json, 'w', encoding='utf-8') as f:
        json.dump(meta, f, indent=2, ensure_ascii=False)
    print(f"  📋 Metadatos: {output_path_json}")

    # También generar una versión con cada preset para comparar (si se pide)
    result = {
        "filepath": filepath,
        "output_jpg": output_path_jpg,
        "output_json": output_path_json,
        "metadata": meta,
        "preset": preset_name,
        "dimensions": f"{meta['rows']}×{meta['columns']}",
    }

    return result


# ──────────────────────────────────────────────────────────────
# Modo batch: Generar todas las variantes de windowing
# ──────────────────────────────────────────────────────────────

def generate_all_presets(filepath, output_dir):
    """Genera una imagen por cada preset de windowing para comparación."""
    ds = pydicom.dcmread(filepath, force=True)
    pixel_array = ds.pixel_array
    meta = extract_metadata(ds)
    base_name = generate_output_filename(meta)

    print(f"\n{'═'*60}")
    print(f"🗂️  Generando TODOS los presets para: {meta['patient_name'] or 'Anónimo'}")
    print(f"{'═'*60}")

    preset_dir = os.path.join(output_dir, f"{base_name}_PRESETS")
    os.makedirs(preset_dir, exist_ok=True)

    for preset_name, preset_info in WINDOW_PRESETS.items():
        img = apply_windowing(pixel_array, ds, preset_name)
        img = fix_photometric(img, ds)
        img = apply_clahe(img, preset_name)

        out_path = os.path.join(preset_dir, f"{base_name}_{preset_name}.jpg")
        cv2.imwrite(out_path, img, [cv2.IMWRITE_JPEG_QUALITY, 95])
        print(f"  ✅ {preset_info['desc']:45s} → {preset_name}.jpg")

    # También sin CLAHE ni windowing para referencia
    img_raw = apply_windowing(pixel_array, ds, None)
    img_raw = fix_photometric(img_raw, ds)
    out_raw = os.path.join(preset_dir, f"{base_name}_ORIGINAL.jpg")
    cv2.imwrite(out_raw, img_raw, [cv2.IMWRITE_JPEG_QUALITY, 95])
    print(f"  ✅ {'Original (sin filtros)':45s} → ORIGINAL.jpg")

    print(f"\n📁 Carpeta de presets: {preset_dir}")
    return preset_dir

# ──────────────────────────────────────────────────────────────
# Modo Enhance: Generar variantes inteligentes de mejora
# ──────────────────────────────────────────────────────────────

def generate_enhancement_variants(filepath, output_dir, source_dicom_path=None):
    """
    Genera 4 variantes de mejora inteligentes para una imagen DICOM.
    
    Variantes:
    1. Original (tal como sale del equipo)
    2. Estándar Clínico (windowing + CLAHE moderado) — NOM-229-SSA1
    3. Hueso (alto contraste óseo + CLAHE fuerte + unsharp)
    4. Tejido Blando (windowing suave + CLAHE leve)
    
    Si el estudio es de tórax, genera variantes de pulmón y mediastino.
    """
    # Read the DICOM source
    dicom_path = source_dicom_path or filepath
    
    try:
        ds = pydicom.dcmread(dicom_path, force=True)
        pixel_array = ds.pixel_array
    except Exception as e:
        print(f"  ❌ Error: {e}")
        return None

    meta = extract_metadata(ds)
    detected_preset = detect_preset(meta) or "hueso"
    body_part = (meta.get("body_part", "") or "").upper()
    base_name = generate_output_filename(meta)
    
    # Create enhance output subdirectory
    enhance_dir = os.path.join(output_dir, f"{base_name}_ENHANCE")
    os.makedirs(enhance_dir, exist_ok=True)
    
    print(f"\n{'═'*60}")
    print(f"🎨 GENERANDO VARIANTES DE MEJORA")
    print(f"{'═'*60}")
    print(f"  👤 {meta['patient_name'] or 'Anónimo'}")
    print(f"  📋 {meta.get('study_description', '') or body_part}")
    print(f"  🎯 Preset detectado: {detected_preset}")

    variants = []
    equipo = f"{meta.get('manufacturer', '')} {meta.get('model', '')}".strip()
    img_base = apply_windowing(pixel_array, ds, None)
    img_base = fix_photometric(img_base, ds)

    variant_specs = [
        {"id":1,"nombre":"Original del Equipo","archivo":"1_original.jpg","icono":"📷",
         "clip":0,"grid":0,"unsharp":False,"blur":False,"heq":False,"inv":False,
         "desc":f"Imagen tal como la genera tu {equipo}. Sin procesamiento.",
         "tag":"ORIGINAL","tag_class":"","norma":"Sin procesamiento — referencia base del detector"},
        {"id":2,"nombre":"Suavizado Leve","archivo":"2_suavizado.jpg","icono":"🌫️",
         "clip":1.5,"grid":16,"unsharp":False,"blur":True,"heq":False,"inv":False,
         "desc":"CLAHE suave + reducción de ruido. Para tejidos blandos, edema, masas.",
         "tag":"SUAVE","tag_class":"soft","norma":"CLAHE 1.5 (16×16) + Gaussiano. Partes blandas"},
        {"id":3,"nombre":"Estándar Clínico","archivo":"3_estandar.jpg","icono":"⭐",
         "clip":2.0,"grid":8,"unsharp":False,"blur":False,"heq":False,"inv":False,
         "recomendado":True,
         "desc":f"CLAHE moderado sobre calibración {equipo}. Ideal para entrega al paciente.",
         "tag":"RECOMENDADO","tag_class":"rec","norma":f"NOM-229-SSA1 — CLAHE 2.0 (8×8) sobre windowing {equipo}"},
        {"id":4,"nombre":"Contraste Medio","archivo":"4_medio.jpg","icono":"◑",
         "clip":3.0,"grid":8,"unsharp":False,"blur":False,"heq":False,"inv":False,
         "desc":"Balance entre tejido blando y óseo. Mayor detalle que el estándar.",
         "tag":"MEDIO","tag_class":"","norma":"CLAHE 3.0 (8×8). Balance óseo-blando"},
        {"id":5,"nombre":"Alto Contraste","archivo":"5_alto.jpg","icono":"🔆",
         "clip":4.0,"grid":4,"unsharp":False,"blur":False,"heq":False,"inv":False,
         "desc":"Contraste agresivo. Para estudios óseos y calcificaciones.",
         "tag":"FUERTE","tag_class":"bone","norma":"CLAHE 4.0 (4×4). Máximo contraste"},
        {"id":6,"nombre":"Bordes Realzados","archivo":"6_bordes.jpg","icono":"🦴",
         "clip":4.0,"grid":4,"unsharp":True,"blur":False,"heq":False,"inv":False,
         "desc":"CLAHE fuerte + Unsharp. Para fracturas sutiles y cortical ósea.",
         "tag":"BORDES","tag_class":"bone","norma":"CLAHE 4.0 + Unsharp σ=2.0. Fracturas"},
        {"id":7,"nombre":"Ecualización Completa","archivo":"7_equalizado.jpg","icono":"📊",
         "clip":0,"grid":0,"unsharp":False,"blur":False,"heq":True,"inv":False,
         "desc":"Ecualización de histograma global. Maximiza rango dinámico.",
         "tag":"HEQ","tag_class":"","norma":"Ecualización global (equalizeHist)"},
        {"id":8,"nombre":"Negativo (Inversión)","archivo":"8_negativo.jpg","icono":"🔄",
         "clip":2.0,"grid":8,"unsharp":False,"blur":False,"heq":False,"inv":True,
         "desc":"Inversión + CLAHE. Para lesiones líticas, gas y cuerpos extraños.",
         "tag":"NEGATIVO","tag_class":"neg","norma":"Inversión + CLAHE 2.0. Lesiones líticas"},
    ]

    for spec in variant_specs:
        img = img_base.copy()
        if spec["clip"] > 0:
            clahe = cv2.createCLAHE(clipLimit=spec["clip"], tileGridSize=(spec["grid"], spec["grid"]))
            img = clahe.apply(img)
        if spec["blur"]:
            img = cv2.GaussianBlur(img, (3, 3), 0.5)
        if spec["unsharp"]:
            img = apply_unsharp_mask(img, sigma=2.0, strength=1.5)
        if spec["heq"]:
            img = cv2.equalizeHist(img)
        if spec["inv"]:
            img = cv2.bitwise_not(img)
        out_path = os.path.join(enhance_dir, spec["archivo"])
        cv2.imwrite(out_path, img, [cv2.IMWRITE_JPEG_QUALITY, 95])
        vd = {"id":spec["id"],"nombre":spec["nombre"],"descripcion":spec["desc"],
              "icono":spec["icono"],"archivo":spec["archivo"],"tag":spec["tag"],
              "tag_class":spec["tag_class"],"norma":spec["norma"]}
        if spec.get("recomendado"):
            vd["recomendado"] = True
        variants.append(vd)
        m = "⭐" if spec.get("recomendado") else "✅"
        print(f"  {m} Variante {spec['id']}: {spec['nombre']}")

    # Printing guide by body part
    body_part = (meta.get("body_part", "") or "").upper()
    view = (meta.get("view_position", "") or "").upper()
    pg = {"region": body_part or "GENERAL", "placa": "14×17\"", "vistas": 1,
          "layout": "1 imagen por placa", "orientacion": "Vertical",
          "marcadores": "L/R obligatorio (NOM-229-SSA1)",
          "instrucciones": "Imprimir con datos del paciente. Verificar marcador.",
          "nota": "",
          "proyecciones": [
              {"nombre": "AP (Anteroposterior)", "requerida": True,
               "desc": "Proyección estándar con el rayo entrando por delante del paciente."}
          ]}
    if any(x in body_part for x in ["SPINE","LUMBAR","CERVIC","COLUMN","L SPINE","C SPINE","T SPINE"]):
        proys = [
            {"nombre": "AP (Anteroposterior)", "requerida": True,
             "desc": "Vista frontal. Evalúa alineación vertebral, espacios intervertebrales y pedículos."},
            {"nombre": "Lateral", "requerida": True,
             "desc": "Vista de perfil. Evalúa cuerpos vertebrales, lordosis/cifosis y canal raquídeo."},
        ]
        if "CERVIC" in body_part or "C SPINE" in body_part:
            proys.append({"nombre": "Odontoides (Boca Abierta)", "requerida": False,
                          "desc": "AP transoral. Evalúa apófisis odontoides de C2 y articulaciones atlantoaxiales."})
            proys.append({"nombre": "Oblicua Derecha e Izquierda", "requerida": False,
                          "desc": "Evalúa forámenes intervertebrales. Se piden en sospecha de estenosis."})
        if "LUMBAR" in body_part or "L SPINE" in body_part:
            proys.append({"nombre": "Oblicua (Perritos de Lachapelle)", "requerida": False,
                          "desc": "Evalúa pars interarticularis. Imagen del 'perrito escocés' para espondilolistesis."})
        pg.update({"placa":"14×17\"","vistas":2,"layout":"AP + Lateral juntas en UNA placa",
                   "orientacion":"Vertical",
                   "instrucciones":"Columna: AP izquierda, Lateral derecha. Misma placa 14×17. Marcador L/R obligatorio.",
                   "nota":"Escoliosis: panorámica completa. Inestabilidad: funcionales flexión/extensión.",
                   "proyecciones": proys})
    elif any(x in body_part for x in ["CHEST","THORAX","LUNG","PULM"]):
        pg.update({"placa":"14×17\"","vistas":1,"layout":"PA frontal individual",
                   "orientacion":"Vertical",
                   "instrucciones":"Tórax PA: placa individual. Lateral aparte si se pide. Desde ápices a senos costofrénicos.",
                   "nota":"Usar variante Suavizado para evaluar mediastino/silueta cardíaca.",
                   "proyecciones": [
                       {"nombre": "PA (Posteroanterior)", "requerida": True,
                        "desc": "Proyección estándar de tórax. El rayo entra por la espalda. Minimiza magnificación cardíaca."},
                       {"nombre": "Lateral (Perfil Izquierdo)", "requerida": False,
                        "desc": "Vista lateral. Evalúa espacio retroesternal, columna torácica y lóbulos pulmonares."},
                       {"nombre": "AP (Anteroposterior)", "requerida": False,
                        "desc": "Alternativa si el paciente no puede ponerse de pie. Corazón se ve más grande."},
                   ]})
    elif any(x in body_part for x in ["HAND","MANO"]):
        pg.update({"placa":"10×12\"","vistas":3,"layout":"PA + Oblicua + Lateral en UNA placa",
                   "orientacion":"Horizontal",
                   "instrucciones":"Mano: 3 proyecciones en fila horizontal en placa 10×12. Todos los dedos visibles.",
                   "nota":"Trauma: verificar alineación de falanges y metacarpianos.",
                   "proyecciones": [
                       {"nombre": "PA (Posteroanterior)", "requerida": True,
                        "desc": "Mano completa extendida, palma abajo. Evalúa falanges, metacarpianos y carpo."},
                       {"nombre": "Oblicua", "requerida": True,
                        "desc": "Mano rotada 45°. Separa metacarpianos superpuestos y ve fracturas ocultas."},
                       {"nombre": "Lateral", "requerida": True,
                        "desc": "Vista de perfil. Evalúa desplazamiento anterior/posterior y luxaciones."},
                   ]})
    elif any(x in body_part for x in ["FOOT","PIE"]):
        pg.update({"placa":"10×12\"","vistas":3,"layout":"AP + Oblicua + Lateral en UNA placa",
                   "orientacion":"Horizontal",
                   "instrucciones":"Pie: 3 proyecciones en fila horizontal en placa 10×12. Con carga si es posible.",
                   "nota":"Trauma: verificar articulación de Lisfranc y alineación de metatarsianos.",
                   "proyecciones": [
                       {"nombre": "AP (Dorsoplantar)", "requerida": True,
                        "desc": "Vista superior del pie. Evalúa metatarsianos, falanges y articulaciones."},
                       {"nombre": "Oblicua Medial", "requerida": True,
                        "desc": "Pie rotado 30-45° internamente. Separa tarsianos y metatarsianos superpuestos."},
                       {"nombre": "Lateral (Con carga)", "requerida": True,
                        "desc": "Vista de perfil con peso del paciente. Evalúa arco plantar y calcáneo."},
                   ]})
    elif any(x in body_part for x in ["WRIST","MUÑECA","CARPAL"]):
        pg.update({"placa":"10×12\"","vistas":3,"layout":"PA + Oblicua + Lateral en UNA placa",
                   "orientacion":"Horizontal",
                   "instrucciones":"Muñeca: 3 proyecciones. Incluir apófisis estiloides de radio y cúbito.",
                   "nota":"Escafoides: proyección especial con desviación cubital si se sospecha fractura.",
                   "proyecciones": [
                       {"nombre": "PA (Posteroanterior)", "requerida": True,
                        "desc": "Muñeca extendida, palma abajo. Evalúa radio distal, cúbito y huesos del carpo."},
                       {"nombre": "Lateral", "requerida": True,
                        "desc": "Vista de perfil. Evalúa alineación radiocarpal y luxación del semilunar."},
                       {"nombre": "Oblicua", "requerida": True,
                        "desc": "Muñeca rotada 45°. Complementa la evaluación del escafoides y trapecio."},
                       {"nombre": "PA con Desviación Cubital", "requerida": False,
                        "desc": "Especial para escafoides. Abre la articulación y muestra fracturas ocultas."},
                   ]})
    elif any(x in body_part for x in ["KNEE","RODILLA"]):
        pg.update({"placa":"10×12\" o 14×17\"","vistas":2,"layout":"AP + Lateral juntas en UNA placa",
                   "orientacion":"Vertical",
                   "instrucciones":"Rodilla: AP con extensión completa, Lateral a 20-30° de flexión. Incluir rótula.",
                   "nota":"Traumatismos: agregar proyección axial de rótula (Merchant/Sunrise) si se solicita.",
                   "proyecciones": [
                       {"nombre": "AP (Anteroposterior)", "requerida": True,
                        "desc": "Vista frontal con pierna extendida. Evalúa espacio articular, cóndilos y meseta tibial."},
                       {"nombre": "Lateral", "requerida": True,
                        "desc": "Vista de perfil a 20-30° de flexión. Evalúa rótula, grasa suprapatelar y fémur distal."},
                       {"nombre": "Axial de Rótula (Merchant)", "requerida": False,
                        "desc": "Rodilla flexionada 45°, rayo tangencial. Evalúa articulación patelofemoral."},
                   ]})
    elif any(x in body_part for x in ["ANKLE","TOBILLO"]):
        pg.update({"placa":"10×12\"","vistas":3,"layout":"AP + Lateral + Mortaja en UNA placa",
                   "orientacion":"Vertical",
                   "instrucciones":"Tobillo: 3 proyecciones. La mortaja es obligatoria para evaluar la articulación.",
                   "nota":"Reglas de Ottawa: si dolor en maléolo posterior o imposibilidad de dar 4 pasos, siempre radiografía.",
                   "proyecciones": [
                       {"nombre": "AP (Anteroposterior)", "requerida": True,
                        "desc": "Vista frontal del tobillo. Evalúa tibia distal, peroné y articulación tibioastragalina."},
                       {"nombre": "Lateral", "requerida": True,
                        "desc": "Vista de perfil. Evalúa astrágalo, calcáneo, articulación por detrás y derrame."},
                       {"nombre": "Mortaja (AP con Rotación Interna 15°)", "requerida": True,
                        "desc": "Pie rotado 15° internamente. Abre la mortaja tibioastragalina para ver fracturas de maléolos."},
                   ]})
    elif any(x in body_part for x in ["SHOULDER","HOMBRO","HUMERUS","HUMERO"]):
        pg.update({"placa":"10×12\" o 14×17\"","vistas":2,"layout":"AP + Lateral (Y de Escapula o Axilar)",
                   "orientacion":"Vertical",
                   "instrucciones":"Hombro: AP en rotación neutra + Y escapular o axilar. Incluir acromion.",
                   "nota":"Luxación: la Y escapular confirma la dirección. Manguito rotador: AP en rotación interna y externa.",
                   "proyecciones": [
                       {"nombre": "AP (Rotación Neutra)", "requerida": True,
                        "desc": "Vista frontal con brazo al costado. Evalúa articulación glenohumeral y acromion."},
                       {"nombre": "Y de Escápula (Lateral Escapular)", "requerida": True,
                        "desc": "Vista lateral verdadera del hombro. Confirma luxación anterior o posterior."},
                       {"nombre": "Axilar (Infero-superior)", "requerida": False,
                        "desc": "Brazo abducido, rayo desde abajo. Evalúa glenoide, coracoides y espacio subacromial."},
                       {"nombre": "AP en Rotación Interna", "requerida": False,
                        "desc": "Brazo rotado internamente. Evalúa troquíter y manguito rotador."},
                   ]})
    elif any(x in body_part for x in ["ELBOW","CODO","FOREARM","ANTEBRAZO"]):
        pg.update({"placa":"10×12\"","vistas":2,"layout":"AP + Lateral en UNA placa",
                   "orientacion":"Vertical",
                   "instrucciones":"Codo: AP con extensión completa, Lateral a 90° de flexión.",
                   "nota":"Trauma pediátrico: comparar con lado sano. Adulto: buscar signo de la almohadilla grasa en Lateral.",
                   "proyecciones": [
                       {"nombre": "AP (Anteroposterior)", "requerida": True,
                        "desc": "Brazo extendido. Evalúa olécranon, epicóndilos y espacio articular radiocubital."},
                       {"nombre": "Lateral", "requerida": True,
                        "desc": "Codo a 90°. Evalúa cabeza radial, apófisis coronoides y almohadilla grasa."},
                       {"nombre": "Oblicua", "requerida": False,
                        "desc": "Complementaria. Separa cabeza radial de olécranon para fracturas sutiles."},
                   ]})
    elif any(x in body_part for x in ["PELVIS","HIP","CADERA"]):
        pg.update({"placa":"14×17\"","vistas":1,"layout":"AP pelvis completa individual",
                   "orientacion":"Horizontal",
                   "instrucciones":"Pelvis AP: horizontal. Desde crestas ilíacas a trocánteres menores.",
                   "nota":"Verificar simetría de obturadores. Cadera: incluir Lowenstein.",
                   "proyecciones": [
                       {"nombre": "AP de Pelvis", "requerida": True,
                        "desc": "Vista frontal completa. Evalúa ambas caderas, sacro, sínfisis púbica y acetábulos."},
                       {"nombre": "Lateral de Cadera (Rana/Lowenstein)", "requerida": False,
                        "desc": "Cadera en abducción y rotación externa. Evalúa cuello femoral y Legg-Calvé-Perthes."},
                       {"nombre": "Axial Quirúrgica (Cross-table)", "requerida": False,
                        "desc": "Rayo horizontal con paciente supino. Para fractura de cadera cuando no puede mover la pierna."},
                   ]})
    elif any(x in body_part for x in ["SKULL","HEAD","SINUS","CRANEO"]):
        if "SINUS" in body_part:
            pg.update({"placa":"10×12\"","vistas":2,"layout":"Waters + Lateral en UNA placa",
                       "orientacion":"Vertical",
                       "instrucciones":"Senos paranasales: Waters (mentonasoplaca) + Lateral. Paciente erguido para ver niveles.",
                       "nota":"Buscar niveles hidroaéreos en senos frontales, maxilares y etmoidales.",
                       "proyecciones": [
                           {"nombre": "Waters (Occipitomentoniana)", "requerida": True,
                            "desc": "Mentón en la placa, rayo a 37°. Vista estrella para senos maxilares y frontales."},
                           {"nombre": "Lateral", "requerida": True,
                            "desc": "Vista de perfil. Evalúa seno esfenoidal, frontal y adenoides."},
                           {"nombre": "Caldwell (Occipitofrontal)", "requerida": False,
                            "desc": "Frente en la placa, rayo a 15°. Complementa evaluación de senos frontales y etmoidales."},
                       ]})
        else:
            pg.update({"placa":"10×12\"","vistas":2,"layout":"AP (Caldwell) + Lateral en UNA placa",
                       "orientacion":"Vertical",
                       "instrucciones":"Cráneo: AP (Caldwell) y Lateral. Senos paranasales: incluir Waters.",
                       "nota":"Verificar superposición de peñascos del temporal.",
                       "proyecciones": [
                           {"nombre": "AP Caldwell (Occipitofrontal)", "requerida": True,
                            "desc": "Frente en la placa, rayo a 15° caudal. Evalúa frontal, órbitas y peñasco."},
                           {"nombre": "Lateral", "requerida": True,
                            "desc": "Vista de perfil. Evalúa silla turca, suturas, hueso temporal y occipital."},
                           {"nombre": "Towne (Occipitofrontal invertida)", "requerida": False,
                            "desc": "Rayo a 30° caudal. Evalúa hueso occipital, foramen magno y peñascos."},
                       ]})
    print(f"\n  🖨️ Guía: {pg['layout']} — Placa {pg['placa']}")

    # ═══ Run DICOM Intelligence Engine ═══
    print(f"\n{'─'*60}")
    print(f"🧠 ANALIZANDO CALIDAD (Motor de Inteligencia DICOM)")
    print(f"{'─'*60}")
    intelligence = run_dicom_intelligence(meta, pixel_array)
    qs = intelligence["quality_score"]
    print(f"  📊 Score de Calidad: {qs['score']}/100 ({qs['label']})")
    print(f"  ⚡ Técnica: {intelligence['technique']['status']}")
    print(f"  📈 Histograma: Rango dinámico {intelligence['histogram'].get('dynamic_range_pct', '?')}%")
    print(f"  🔳 Colimación: {intelligence['collimation']['message']}")
    print(f"  📋 NOM-229: {intelligence['nom_229']['message']}")

    manifest = {"paciente":meta.get("patient_name",""),"estudio":meta.get("study_description","") or body_part,
                "fecha":meta.get("study_date",""),"equipo":equipo,"modalidad":meta.get("modality",""),
                "region":body_part,"vista":view,"variantes":variants,"guia_impresion":pg,
                "inteligencia": intelligence,
                "dicom_source":os.path.basename(dicom_path),"generado_at":datetime.now().isoformat(),
                "norma_referencia":"NOM-229-SSA1-2002"}
    manifest_path = os.path.join(enhance_dir, "_manifest.json")
    with open(manifest_path, 'w', encoding='utf-8') as f:
        json.dump(manifest, f, indent=2, ensure_ascii=False)
    print(f"\n  📁 {len(variants)} variantes guardadas en: {enhance_dir}")
    return {"enhance_dir": enhance_dir, "manifest": manifest, "variants": variants}








# ──────────────────────────────────────────────────────────────
# CLI Principal
# ──────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description="🩻 Tilde DICOM Studio — Motor de Conversión Radiológica",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Ejemplos:
  python dicom_engine.py C:\\Users\\Administrador\\Downloads\\20260309
  python dicom_engine.py archivo.dcm --preset hueso --clahe
  python dicom_engine.py carpeta/ --output D:\\Salida --all-presets
  python dicom_engine.py carpeta/ --preset pulmon --no-clahe
        """
    )
    parser.add_argument("input", help="Archivo DICOM o carpeta con archivos DICOM")
    parser.add_argument("--output", "-o", default=None, help="Carpeta de salida (default: junto al input)")
    parser.add_argument("--preset", "-p", default="auto",
                        choices=["auto", "dicom"] + list(WINDOW_PRESETS.keys()),
                        help="Preset de windowing (default: auto)")
    parser.add_argument("--clahe", action="store_true", default=True, help="Aplicar CLAHE (default: sí)")
    parser.add_argument("--no-clahe", action="store_true", help="No aplicar CLAHE")
    parser.add_argument("--unsharp", action="store_true", help="Aplicar Unsharp Masking (realce de bordes)")
    parser.add_argument("--all-presets", action="store_true", help="Generar una imagen por cada preset de windowing")

    args = parser.parse_args()

    # Validar input
    input_path = Path(args.input)
    if not input_path.exists():
        print(f"❌ No se encontró: {args.input}")
        sys.exit(1)

    # Determinar carpeta de salida
    if args.output:
        output_dir = args.output
    elif input_path.is_file():
        output_dir = str(input_path.parent / "dicom_output")
    else:
        output_dir = str(input_path / "dicom_output")

    os.makedirs(output_dir, exist_ok=True)

    # Encontrar archivos DICOM
    dicom_files = find_dicom_files(str(input_path))

    if not dicom_files:
        print(f"❌ No se encontraron archivos DICOM en: {args.input}")
        sys.exit(1)

    print(f"""
╔══════════════════════════════════════════════════════════════╗
║              🩻 TILDE DICOM STUDIO v1.0                     ║
║           Motor de Conversión Radiológica                    ║
╚══════════════════════════════════════════════════════════════╝

  📂 Entrada:    {args.input}
  📁 Salida:     {output_dir}
  🔍 Archivos:   {len(dicom_files)} archivo(s) DICOM encontrado(s)
  🎯 Preset:     {args.preset}
  ✨ CLAHE:      {'Sí' if args.clahe and not args.no_clahe else 'No'}
  🔍 Unsharp:    {'Sí' if args.unsharp else 'No'}
""")

    # Modo: Generar todos los presets (para comparación)
    if args.all_presets:
        for filepath in dicom_files:
            generate_all_presets(filepath, output_dir)
        print(f"\n🎉 ¡Todos los presets generados!")
        return

    # Modo normal: Procesar todos los archivos
    results = []
    for i, filepath in enumerate(dicom_files):
        result = process_dicom_file(
            filepath=filepath,
            output_dir=output_dir,
            preset=args.preset,
            apply_clahe_flag=args.clahe and not args.no_clahe,
            apply_unsharp_flag=args.unsharp,
            index=i,
        )
        if result:
            results.append(result)

    # Resumen final
    print(f"\n{'═'*60}")
    print(f"🎉 CONVERSIÓN COMPLETADA")
    print(f"{'═'*60}")
    print(f"  ✅ {len(results)}/{len(dicom_files)} archivos procesados exitosamente")
    print(f"  📁 Carpeta de salida: {output_dir}")

    if results:
        print(f"\n  Archivos generados:")
        for r in results:
            print(f"    📷 {os.path.basename(r['output_jpg'])} ({r['dimensions']})")

    # Guardar resumen general
    summary_path = os.path.join(output_dir, "_RESUMEN.json")
    summary = {
        "processed_at": datetime.now().isoformat(),
        "input_path": str(input_path),
        "total_files": len(dicom_files),
        "successful": len(results),
        "preset": args.preset,
        "files": [
            {
                "source": os.path.basename(r["filepath"]),
                "output": os.path.basename(r["output_jpg"]),
                "patient": r["metadata"]["patient_name"],
                "study": r["metadata"]["study_description"] or r["metadata"]["body_part"],
                "preset": r["preset"],
            }
            for r in results
        ]
    }
    with open(summary_path, 'w', encoding='utf-8') as f:
        json.dump(summary, f, indent=2, ensure_ascii=False)

    print(f"\n  📋 Resumen guardado en: {summary_path}")


if __name__ == "__main__":
    main()
