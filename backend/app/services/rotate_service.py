"""
PDF旋转服务
"""
import fitz
from pathlib import Path
from typing import Dict, Any
from loguru import logger


async def rotate_pdf(
    input_file: Path,
    options: Dict[str, Any],
    temp_dir: Path
) -> Path:
    """
    旋转PDF页面
    
    Options:
        - angle: 旋转角度 (90, 180, 270)
        - pages: 要旋转的页面，如 "1,2,3" 或 "all"
    
    Returns:
        旋转后的PDF文件
    """
    logger.info(f"Rotating PDF: {input_file}")
    
    doc = fitz.open(str(input_file))
    output_path = temp_dir / "rotated.pdf"
    
    angle = int(options.get('angle', 90))
    pages_str = options.get('pages', 'all')
    
    # 解析页面
    if pages_str == 'all':
        page_indices = list(range(len(doc)))
    else:
        page_indices = [int(p.strip()) - 1 for p in pages_str.split(',')]
    
    # 旋转指定页面
    for page_num in page_indices:
        if 0 <= page_num < len(doc):
            page = doc[page_num]
            # 设置旋转（+angle是顺时针）
            page.set_rotation(page.rotation + angle)
            logger.info(f"Rotated page {page_num + 1} by {angle} degrees")
    
    doc.save(str(output_path))
    doc.close()
    
    return output_path
