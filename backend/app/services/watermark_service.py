"""
PDF水印服务
"""
import fitz
from pathlib import Path
from typing import Dict, Any
from loguru import logger


async def add_watermark(
    input_file: Path,
    options: Dict[str, Any],
    temp_dir: Path
) -> Path:
    """
    添加水印到PDF
    
    Options:
        - text: 水印文字
        - angle: 旋转角度 (默认45)
        - opacity: 透明度 (0-1, 默认0.3)
        - font_size: 字体大小 (默认60)
        - pages: 要添加水印的页面，如 "all"
    
    Returns:
        添加水印后的PDF文件
    """
    logger.info(f"Adding watermark to PDF: {input_file}")
    
    doc = fitz.open(str(input_file))
    output_path = temp_dir / "watermarked.pdf"
    
    # 获取水印配置
    text = options.get('text', 'WATERMARK')
    angle = int(options.get('angle', 45))
    opacity = float(options.get('opacity', 0.3))
    font_size = int(options.get('font_size', 60))
    pages_str = options.get('pages', 'all')
    
    # 解析页面
    if pages_str == 'all':
        page_indices = list(range(len(doc)))
    else:
        page_indices = [int(p.strip()) - 1 for p in pages_str.split(',')]
    
    # 创建水印页
    for page_num in page_indices:
        if 0 <= page_num < len(doc):
            page = doc[page_num]
            page_width = page.rect.width
            page_height = page.rect.height
            
            # 创建文本水印
            text_point = fitz.Point(page_width / 2, page_height / 2)
            
            page.insert_text(
                text_point,
                text,
                fontsize=font_size,
                color=(0.8, 0.8, 0.8),  # 灰色
                align=fitz.TEXT_ALIGN_CENTER,
                rotate=angle,
            )
            
            logger.info(f"Added watermark to page {page_num + 1}")
    
    doc.save(str(output_path))
    doc.close()
    
    return output_path
