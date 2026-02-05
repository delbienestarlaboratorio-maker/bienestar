#!/usr/bin/env python3
"""
Generador de imágenes únicas para estudios médicos
Usa PIL para crear imágenes con gradientes, iconos y patrones
"""

from PIL import Image, ImageDraw, ImageFont
import colorsys
import random
from pathlib import Path

class StudyImageGenerator:
    """Genera imágenes únicas para cada estudio"""
    
    # Paletas de colores por tipo de estudio
    COLOR_PALETTES = {
        'sangre': [(239, 68, 68), (220, 38, 38)],      # Rojo
        'orina': [(245, 158, 11), (217, 119, 6)],      # Naranja
        'hormonal': [(139, 92, 246), (124, 58, 237)],  # Púrpura
        'radiologia': [(59, 130, 246), (37, 99, 235)], # Azul
        'tomografia': [(14, 165, 233), (2, 132, 199)], # Cyan
        'resonancia': [(168, 85, 247), (147, 51, 234)],# Violeta
        'microbiologia': [(34, 197, 94), (22, 163, 74)], # Verde
        'inmunologia': [(236, 72, 153), (219, 39, 119)], # Rosa
        'genetica': [(99, 102, 241), (79, 70, 229)],   # Indigo
        'cardiologia': [(239, 68, 68), (185, 28, 28)], # Rojo oscuro
        'default': [(107, 114, 128), (75, 85, 99)]     # Gris
    }
    
    def __init__(self, output_dir: str = "public/images/studies"):
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(parents=True, exist_ok=True)
        
    def _classify_study_type(self, study_name: str) -> str:
        """Clasifica el tipo de estudio"""
        name_upper = study_name.upper()
        
        if any(word in name_upper for word in ['ORINA', 'EGO', 'URINÁLISIS']):
            return 'orina'
        elif any(word in name_upper for word in ['HORMONA', 'PROGESTERONA', 'TESTOSTERONA']):
            return 'hormonal'
        elif any(word in name_upper for word in ['RAYOS X', 'RADIOGRAFÍA', 'RX']):
            return 'radiologia'
        elif any(word in name_upper for word in ['TOMOGRAFÍA', 'TAC', 'CT']):
            return 'tomografia'
        elif any(word in name_upper for word in ['RESONANCIA', 'RM', 'MRI']):
            return 'resonancia'
        elif any(word in name_upper for word in ['CULTIVO', 'BACTERIA']):
            return 'microbiologia'
        elif any(word in name_upper for word in ['ANTICUERPO', 'IGG', 'IGM']):
            return 'inmunologia'
        elif any(word in name_upper for word in ['ADN', 'GENÉTICO']):
            return 'genetica'
        elif any(word in name_upper for word in ['ECG', 'ELECTROCARDIOGRAMA']):
            return 'cardiologia'
        else:
            return 'sangre'
    
    def _create_gradient(self, width: int, height: int, color1: tuple, color2: tuple) -> Image:
        """Crea un gradiente diagonal"""
        base = Image.new('RGB', (width, height), color1)
        top = Image.new('RGB', (width, height), color2)
        mask = Image.new('L', (width, height))
        mask_data = []
        
        for y in range(height):
            for x in range(width):
                # Gradiente diagonal
                distance = ((x / width) + (y / height)) / 2
                mask_data.append(int(255 * distance))
        
        mask.putdata(mask_data)
        base.paste(top, (0, 0), mask)
        return base
    
    def _draw_pattern(self, draw: ImageDraw, width: int, height: int, study_type: str):
        """Dibuja patrón decorativo según tipo de estudio"""
        
        if study_type in ['sangre', 'orina']:
            # Círculos (gotas)
            for _ in range(15):
                x = random.randint(0, width)
                y = random.randint(0, height)
                r = random.randint(10, 40)
                draw.ellipse([x-r, y-r, x+r, y+r], fill=None, outline=(255, 255, 255, 30), width=2)
        
        elif study_type in ['radiologia', 'tomografia', 'resonancia']:
            # Líneas (ondas)
            for i in range(0, width, 40):
                draw.line([(i, 0), (i, height)], fill=(255, 255, 255, 20), width=1)
            for i in range(0, height, 40):
                draw.line([(0, i), (width, i)], fill=(255, 255, 255, 20), width=1)
        
        elif study_type in ['genetica', 'microbiologia']:
            # Hexágonos (células)
            for _ in range(10):
                x = random.randint(50, width-50)
                y = random.randint(50, height-50)
                r = random.randint(20, 50)
                points = []
                for angle in range(0, 360, 60):
                    import math
                    px = x + r * math.cos(math.radians(angle))
                    py = y + r * math.sin(math.radians(angle))
                    points.append((px, py))
                draw.polygon(points, fill=None, outline=(255, 255, 255, 30))
    
    def _draw_icon(self, draw: ImageDraw, width: int, height: int, study_type: str):
        """Dibuja icono central según tipo de estudio"""
        cx, cy = width // 2, height // 2
        
        if study_type == 'orina':
            # Icono de vaso/tubo
            draw.rectangle([cx-30, cy-50, cx+30, cy+50], fill=None, outline=(255, 255, 255, 150), width=4)
            draw.ellipse([cx-30, cy-55, cx+30, cy-45], fill=None, outline=(255, 255, 255, 150), width=4)
        
        elif study_type == 'sangre':
            # Icono de gota
            points = [(cx, cy-40), (cx-25, cy+10), (cx, cy+40), (cx+25, cy+10)]
            draw.polygon(points, fill=(255, 255, 255, 150))
        
        elif study_type in ['radiologia', 'tomografia']:
            # Icono de scanner
            draw.rectangle([cx-40, cy-30, cx+40, cy+30], fill=None, outline=(255, 255, 255, 150), width=4)
            draw.line([(cx-20, cy-30), (cx-20, cy+30)], fill=(255, 255, 255, 150), width=2)
            draw.line([(cx, cy-30), (cx, cy+30)], fill=(255, 255, 255, 150), width=2)
            draw.line([(cx+20, cy-30), (cx+20, cy+30)], fill=(255, 255, 255, 150), width=2)
        
        else:
            # Icono genérico (cruz médica)
            draw.rectangle([cx-10, cy-40, cx+10, cy+40], fill=(255, 255, 255, 150))
            draw.rectangle([cx-40, cy-10, cx+40, cy+10], fill=(255, 255, 255, 150))
    
    def generate_image(self, study_name: str, study_id: str = None) -> str:
        """Genera imagen única para un estudio"""
        
        # Clasificar tipo
        study_type = self._classify_study_type(study_name)
        
        # Obtener colores
        colors = self.COLOR_PALETTES.get(study_type, self.COLOR_PALETTES['default'])
        
        # Crear imagen base (512x512)
        width, height = 512, 512
        img = self._create_gradient(width, height, colors[0], colors[1])
        
        # Dibujar en la imagen
        draw = ImageDraw.Draw(img, 'RGBA')
        
        # Patrón de fondo
        self._draw_pattern(draw, width, height, study_type)
        
        # Icono central
        self._draw_icon(draw, width, height, study_type)
        
        # Texto del nombre (parte inferior)
        try:
            # Intentar cargar fuente
            font = ImageFont.truetype("arial.ttf", 24)
        except:
            font = ImageFont.load_default()
        
        # Fondo semitransparente para texto
        draw.rectangle([0, height-80, width, height], fill=(0, 0, 0, 100))
        
        # Texto del estudio (truncado si es muy largo)
        text = study_name[:40] + "..." if len(study_name) > 40 else study_name
        
        # Calcular posición centrada
        bbox = draw.textbbox((0, 0), text, font=font)
        text_width = bbox[2] - bbox[0]
        text_x = (width - text_width) // 2
        
        draw.text((text_x, height-50), text, fill=(255, 255, 255, 255), font=font)
        
        # Guardar imagen
        filename = f"{study_id or study_name.lower().replace(' ', '_')}.png"
        output_path = self.output_dir / filename
        img.save(output_path, 'PNG')
        
        print(f"✅ Imagen generada: {output_path}")
        return str(output_path)


if __name__ == '__main__':
    # Prueba con EXAMEN GENERAL DE ORINA
    generator = StudyImageGenerator()
    
    print("🎨 Generando imagen de prueba...")
    print()
    
    image_path = generator.generate_image(
        study_name="EXAMEN GENERAL DE ORINA",
        study_id="examen-general-orina"
    )
    
    print()
    print(f"📁 Imagen guardada en: {image_path}")
    print()
    print("💡 Para generar imágenes para todos los estudios:")
    print("   python generate_study_images.py --all")
