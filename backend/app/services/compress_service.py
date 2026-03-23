"""
PDF压缩服务
"""
import fitz
from pathlib import Path
from typing import Dict, Any
from loguru import logger


async def compress_pdf(
    input_file: Path,
    options: Dict[str, Any],
    temp_dir: Path
) -> Path:
    """
    压缩PDF文件
    
    Options:
        - quality: 'low' | 'medium' | 'high'
    
    Returns:
        压缩后的PDF文件
    """
    logger.info(f"Compressing PDF: {input_file}")
    
    doc = fitz.open(str(input_file))
    output_path = temp_dir / "compressed.pdf"
    
    # 压缩级别
    quality_map = {
        'low': 20,      # 更大压缩，更低质量
        'medium': 50,   # 中等
        'high': 80,     # 高质量
    }
    quality = options.get('quality', 'medium')
    compression = quality_map.get(quality, 50)
    
    # 遍历所有页面进行压缩
    for page_num in range(len(doc)):
        page = doc[page_num]
        
        # 获取页面图像
        images = page.get_images(full=True)
        for img_index, img in enumerate(images):
            xref = img[0]
            
            # 获取图像信息
            base_image = doc.extract_image(xref)
            image_bytes = base_image["image"]
            
            # 重新压缩图像
            from PIL import Image
            import io
            
            img_obj = Image.open(io.BytesIO(image_bytes))
            
            # 转换为RGB（如果是RGBA）
            if img_obj.mode == 'RGBA':
                img_obj = img_obj.convert('RGB')
            
            # 调整大小以实现压缩
            width, height = img_obj.size
            if width > 2000 or height > 2000:
                ratio = min(2000 / width, 2000 / height)
                new_size = (int(width * ratio), int(height * ratio))
                img_obj = img_obj.resize(new_size, Image.Resampling.LANCZOS)
            
            # 保存压缩后的图像
            output_buffer = io.BytesIO()
            img_obj.save(output_buffer, format='JPEG', quality=compression, optimize=True)
            
            # 更新PDF中的图像
            img_rect = page.get_image_rects(xref)
            if img_rect:
                img_rect = img_rect[0]
                
                # 创建新的xref
                new_xref = doc.add_image(output_buffer.getvalue())
                
                # 替换图像
                page.add_image(new_xref, rect=img_rect)
    
    doc.save(
        str(output_path),
        garbage=4,           # 垃圾回收
        deflate=True,        # 压缩
        clean=True,          # 清理
    )
    doc.close()
    
    logger.info(f"Compressed PDF saved to: {output_path}")
    return output_path
