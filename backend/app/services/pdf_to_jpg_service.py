"""
PDF转图片服务
"""
import fitz
from pathlib import Path
from typing import Dict, Any
import img2pdf
from PIL import Image
import io
from loguru import logger


async def convert_to_images(
    input_file: Path,
    options: Dict[str, Any],
    temp_dir: Path
) -> Path:
    """
    将PDF转换为图片
    
    Options:
        - dpi: 图片分辨率 (默认150)
        - format: 输出格式 'jpg' | 'png' (默认jpg)
        - pages: 要转换的页面，如 "all"
    
    Returns:
        转换后的图片文件（如果是多页，返回ZIP或单张图片）
    """
    logger.info(f"Converting PDF to images: {input_file}")
    
    doc = fitz.open(str(input_file))
    output_path = temp_dir / "converted"
    output_path.mkdir(exist_ok=True)
    
    dpi = int(options.get('dpi', 150))
    img_format = options.get('format', 'jpg').upper()
    pages_str = options.get('pages', 'all')
    
    # 解析页面
    if pages_str == 'all':
        page_indices = list(range(len(doc)))
    else:
        page_indices = [int(p.strip()) - 1 for p in pages_str.split(',')]
    
    saved_files = []
    
    for i, page_num in enumerate(page_indices):
        if 0 <= page_num < len(doc):
            page = doc[page_num]
            
            # 计算缩放
            zoom = dpi / 72
            mat = fitz.Matrix(zoom, zoom)
            
            # 渲染页面
            pix = page.get_pixmap(matrix=mat)
            
            # 保存图片
            if len(page_indices) == 1:
                # 单页直接返回
                output_file = temp_dir / f"page.{img_format.lower()}"
            else:
                output_file = output_path / f"page_{page_num + 1}.{img_format.lower()}"
            
            if img_format == 'PNG':
                pix.save(str(output_file), output='png')
            else:
                pix.save(str(output_file), output='jpeg', quality=95)
            
            saved_files.append(output_file)
            logger.info(f"Converted page {page_num + 1}")
    
    doc.close()
    
    # 如果是多页，打包成ZIP
    if len(saved_files) > 1:
        import zipfile
        zip_path = temp_dir / "converted_images.zip"
        
        with zipfile.ZipFile(str(zip_path), 'w', zipfile.ZIP_DEFLATED) as zipf:
            for f in saved_files:
                zipf.write(str(f), f.name)
        
        return zip_path
    
    return saved_files[0] if saved_files else output_path / f"page.{img_format.lower()}"
