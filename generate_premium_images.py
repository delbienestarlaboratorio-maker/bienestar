#!/usr/bin/env python3
"""
Generador MEJORADO de imágenes para estudios médicos
Diseño profesional con gradientes avanzados, sombras, y elementos modernos
"""

from PIL import Image, ImageDraw, ImageFont, ImageFilter
import math
import random
from pathlib import Path

class PremiumStudyImageGenerator:
    """Generador de imágenes premium para estudios médicos"""
    
    # Paletas mejoradas con 3 colores para gradientes más ricos
    COLOR_PALETTES = {
        'sangre': [(220, 38, 38), (239, 68, 68), (252, 165, 165)],      # Rojo profundo
        'orina': [(217, 119, 6), (245, 158, 11), (254, 215, 170)],      # Naranja dorado
        'hormonal': [(109, 40, 217), (139, 92, 246), (196, 181, 253)],  # Púrpura elegante
        'radiologia': [(29, 78, 216), (59, 130, 246), (147, 197, 253)], # Azul tecnológico
        'tomografia': [(6, 95, 70), (16, 185, 129), (167, 243, 208)],   # Verde azulado
        'resonancia': [(126, 34, 206), (168, 85, 247), (233, 213, 255)], # Violeta brillante
        'microbiologia': [(21, 128, 61), (34, 197, 94), (187, 247, 208)], # Verde vida
        'inmunologia': [(190, 18, 60), (236, 72, 153), (251, 207, 232)], # Rosa médico
        'genetica': [(67, 56, 202), (99, 102, 241), (199, 210, 254)],   # Índigo científico
        'cardiologia': [(153, 27, 27), (220, 38, 38), (254, 202, 202)], # Rojo cardíaco
        'default': [(55, 65, 81), (107, 114, 128), (209, 213, 219)]     # Gris profesional
    }
    
    def __init__(self, output_dir: str = "public/images/studies"):
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(parents=True, exist_ok=True)
        
    def _classify_study_type(self, study_name: str) -> str:
        """Clasifica el tipo de estudio"""
        name_upper = study_name.upper()
        
        if any(word in name_upper for word in ['ORINA', 'EGO', 'URINÁLISIS']):
            return 'orina'
        elif any(word in name_upper for word in ['HORMONA', 'PROGESTERONA', 'TESTOSTERONA', 'ESTRADIOL', 'TIROIDES']):
            return 'hormonal'
        elif any(word in name_upper for word in ['RAYOS X', 'RADIOGRAFÍA', 'RX']):
            return 'radiologia'
        elif any(word in name_upper for word in ['TOMOGRAFÍA', 'TAC', 'CT']):
            return 'tomografia'
        elif any(word in name_upper for word in ['RESONANCIA', 'RM', 'MRI']):
            return 'resonancia'
        elif any(word in name_upper for word in ['CULTIVO', 'BACTERIA', 'ANTIBIOGRAMA']):
            return 'microbiologia'
        elif any(word in name_upper for word in ['ANTICUERPO', 'IGG', 'IGM', 'INMUNO']):
            return 'inmunologia'
        elif any(word in name_upper for word in ['ADN', 'GENÉTICO', 'CROMOSOMA']):
            return 'genetica'
        elif any(word in name_upper for word in ['ECG', 'ELECTROCARDIOGRAMA', 'CARDIACO']):
            return 'cardiologia'
        else:
            return 'sangre'
    
    def _create_advanced_gradient(self, width: int, height: int, colors: tuple) -> Image:
        """Crea gradiente radial avanzado con 3 colores"""
        img = Image.new('RGB', (width, height))
        pixels = img.load()
        
        cx, cy = width // 2, height // 2
        max_dist = math.sqrt(cx**2 + cy**2)
        
        for y in range(height):
            for x in range(width):
                # Distancia desde el centro
                dx = x - cx
                dy = y - cy
                dist = math.sqrt(dx**2 + dy**2) / max_dist
                
                # Gradiente de 3 colores
                if dist < 0.5:
                    # Centro a medio (color1 a color2)
                    t = dist * 2
                    r = int(colors[0][0] * (1-t) + colors[1][0] * t)
                    g = int(colors[0][1] * (1-t) + colors[1][1] * t)
                    b = int(colors[0][2] * (1-t) + colors[1][2] * t)
                else:
                    # Medio a borde (color2 a color3)
                    t = (dist - 0.5) * 2
                    r = int(colors[1][0] * (1-t) + colors[2][0] * t)
                    g = int(colors[1][1] * (1-t) + colors[2][1] * t)
                    b = int(colors[1][2] * (1-t) + colors[2][2] * t)
                
                pixels[x, y] = (r, g, b)
        
        return img
    
    def _draw_modern_pattern(self, draw: ImageDraw, width: int, height: int, study_type: str):
        """Dibuja patrón moderno y elegante"""
        
        if study_type in ['sangre', 'orina']:
            # Burbujas con degradado
            for _ in range(20):
                x = random.randint(-50, width + 50)
                y = random.randint(-50, height + 50)
                r = random.randint(30, 100)
                
                # Círculo con borde suave
                for i in range(3):
                    opacity = 40 - (i * 10)
                    draw.ellipse(
                        [x-r+i*5, y-r+i*5, x+r-i*5, y+r-i*5],
                        fill=None,
                        outline=(255, 255, 255, opacity),
                        width=2
                    )
        
        elif study_type in ['radiologia', 'tomografia', 'resonancia']:
            # Ondas tecnológicas
            for i in range(8):
                y_pos = i * (height // 8)
                points = []
                for x in range(0, width, 20):
                    wave = math.sin((x + y_pos) / 30) * 15
                    points.append((x, y_pos + wave))
                
                if len(points) > 1:
                    draw.line(points, fill=(255, 255, 255, 25), width=2)
        
        elif study_type in ['genetica', 'microbiologia']:
            # Estructura molecular
            for _ in range(12):
                cx = random.randint(50, width-50)
                cy = random.randint(50, height-50)
                
                # Hexágono
                points = []
                for angle in range(0, 360, 60):
                    r = random.randint(25, 45)
                    px = cx + r * math.cos(math.radians(angle))
                    py = cy + r * math.sin(math.radians(angle))
                    points.append((px, py))
                
                draw.polygon(points, fill=None, outline=(255, 255, 255, 35))
                draw.ellipse([cx-5, cy-5, cx+5, cy+5], fill=(255, 255, 255, 80))
    
    def _draw_professional_icon(self, img: Image, study_type: str) -> Image:
        """Dibuja icono profesional con sombra"""
        draw = ImageDraw.Draw(img, 'RGBA')
        width, height = img.size
        cx, cy = width // 2, height // 2
        
        # Sombra del icono
        shadow_offset = 5
        
        if study_type == 'orina':
            # Tubo de ensayo moderno
            # Sombra
            draw.rounded_rectangle(
                [cx-45+shadow_offset, cy-65+shadow_offset, cx+45+shadow_offset, cy+65+shadow_offset],
                radius=10,
                fill=(0, 0, 0, 30)
            )
            # Tubo principal
            draw.rounded_rectangle(
                [cx-45, cy-65, cx+45, cy+65],
                radius=10,
                fill=(255, 255, 255, 200),
                outline=(255, 255, 255, 255),
                width=3
            )
            # Tapa
            draw.ellipse([cx-45, cy-70, cx+45, cy-60], fill=(255, 255, 255, 255))
            # Nivel de líquido
            draw.rectangle([cx-40, cy+20, cx+40, cy+60], fill=(255, 255, 255, 100))
        
        elif study_type == 'sangre':
            # Gota de sangre moderna
            # Sombra
            points_shadow = [
                (cx+shadow_offset, cy-50+shadow_offset),
                (cx-35+shadow_offset, cy+20+shadow_offset),
                (cx+shadow_offset, cy+60+shadow_offset),
                (cx+35+shadow_offset, cy+20+shadow_offset)
            ]
            draw.polygon(points_shadow, fill=(0, 0, 0, 30))
            
            # Gota principal
            points = [(cx, cy-50), (cx-35, cy+20), (cx, cy+60), (cx+35, cy+20)]
            draw.polygon(points, fill=(255, 255, 255, 220))
            
            # Brillo
            draw.ellipse([cx-10, cy-30, cx+10, cy-10], fill=(255, 255, 255, 150))
        
        elif study_type in ['radiologia', 'tomografia']:
            # Scanner moderno
            # Sombra
            draw.rounded_rectangle(
                [cx-55+shadow_offset, cy-40+shadow_offset, cx+55+shadow_offset, cy+40+shadow_offset],
                radius=8,
                fill=(0, 0, 0, 30)
            )
            # Marco
            draw.rounded_rectangle(
                [cx-55, cy-40, cx+55, cy+40],
                radius=8,
                fill=None,
                outline=(255, 255, 255, 255),
                width=4
            )
            # Líneas de escaneo
            for i in range(-3, 4):
                x_pos = cx + (i * 15)
                draw.line(
                    [(x_pos, cy-35), (x_pos, cy+35)],
                    fill=(255, 255, 255, 180),
                    width=2
                )
        
        else:
            # Cruz médica moderna
            # Sombra
            draw.rounded_rectangle(
                [cx-12+shadow_offset, cy-50+shadow_offset, cx+12+shadow_offset, cy+50+shadow_offset],
                radius=5,
                fill=(0, 0, 0, 30)
            )
            draw.rounded_rectangle(
                [cx-50+shadow_offset, cy-12+shadow_offset, cx+50+shadow_offset, cy+12+shadow_offset],
                radius=5,
                fill=(0, 0, 0, 30)
            )
            # Cruz principal
            draw.rounded_rectangle(
                [cx-12, cy-50, cx+12, cy+50],
                radius=5,
                fill=(255, 255, 255, 220)
            )
            draw.rounded_rectangle(
                [cx-50, cy-12, cx+50, cy+12],
                radius=5,
                fill=(255, 255, 255, 220)
            )
        
        return img
    
    def generate_premium_image(self, study_name: str, study_id: str = None) -> str:
        """Genera imagen premium para un estudio"""
        
        # Clasificar tipo
        study_type = self._classify_study_type(study_name)
        
        # Obtener colores
        colors = self.COLOR_PALETTES.get(study_type, self.COLOR_PALETTES['default'])
        
        # Crear imagen base con gradiente avanzado (600x600 para mejor calidad)
        width, height = 600, 600
        img = self._create_advanced_gradient(width, height, colors)
        
        # Aplicar blur suave para efecto profesional
        img = img.filter(ImageFilter.GaussianBlur(radius=2))
        
        # Dibujar patrón moderno
        draw = ImageDraw.Draw(img, 'RGBA')
        self._draw_modern_pattern(draw, width, height, study_type)
        
        # Dibujar icono profesional con sombra
        img = self._draw_professional_icon(img, study_type)
        
        # Barra inferior con degradado
        overlay = Image.new('RGBA', (width, height), (0, 0, 0, 0))
        overlay_draw = ImageDraw.Draw(overlay)
        
        # Gradiente en barra inferior
        for y in range(height-120, height):
            alpha = int(((y - (height-120)) / 120) * 180)
            overlay_draw.rectangle([0, y, width, y+1], fill=(0, 0, 0, alpha))
        
        img = Image.alpha_composite(img.convert('RGBA'), overlay)
        
        # Texto del estudio
        draw = ImageDraw.Draw(img)
        try:
            font_large = ImageFont.truetype("arial.ttf", 32)
            font_small = ImageFont.truetype("arial.ttf", 18)
        except:
            font_large = ImageFont.load_default()
            font_small = ImageFont.load_default()
        
        # Nombre del estudio (truncado)
        text = study_name[:35] + "..." if len(study_name) > 35 else study_name
        
        # Centrar texto
        bbox = draw.textbbox((0, 0), text, font=font_large)
        text_width = bbox[2] - bbox[0]
        text_x = (width - text_width) // 2
        
        # Sombra del texto
        draw.text((text_x+2, height-72), text, fill=(0, 0, 0, 100), font=font_large)
        # Texto principal
        draw.text((text_x, height-70), text, fill=(255, 255, 255, 255), font=font_large)
        
        # Subtítulo
        subtitle = study_type.upper().replace('_', ' ')
        bbox_sub = draw.textbbox((0, 0), subtitle, font=font_small)
        sub_width = bbox_sub[2] - bbox_sub[0]
        sub_x = (width - sub_width) // 2
        draw.text((sub_x, height-35), subtitle, fill=(255, 255, 255, 200), font=font_small)
        
        # Convertir a RGB y redimensionar a 512x512
        img = img.convert('RGB')
        img = img.resize((512, 512), Image.Resampling.LANCZOS)
        
        # Guardar
        filename = f"{study_id or study_name.lower().replace(' ', '_')}.png"
        output_path = self.output_dir / filename
        img.save(output_path, 'PNG', optimize=True, quality=95)
        
        print(f"✅ Imagen premium generada: {output_path}")
        return str(output_path)


if __name__ == '__main__':
    # Prueba mejorada
    generator = PremiumStudyImageGenerator()
    
    print("🎨 Generando imagen PREMIUM de prueba...")
    print()
    
    image_path = generator.generate_premium_image(
        study_name="EXAMEN GENERAL DE ORINA",
        study_id="examen-general-orina-premium"
    )
    
    print()
    print(f"📁 Imagen guardada en: {image_path}")
    print()
    print("💡 Mejoras implementadas:")
    print("   ✅ Gradiente radial de 3 colores")
    print("   ✅ Patrón moderno y elegante")
    print("   ✅ Iconos con sombras profesionales")
    print("   ✅ Barra inferior con degradado")
    print("   ✅ Texto con sombra y subtítulo")
    print("   ✅ Blur suave para efecto premium")
    print("   ✅ Optimización de calidad")
