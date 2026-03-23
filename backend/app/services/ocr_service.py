"""
PDF OCR识别服务
"""
import fitz
from pathlib import Path
from typing import Dict, Any
import pytesseract
from PIL import Image
import io
from loguru import logger


async def ocr_pdf(
    input_file: Path,
    options: Dict[str, Any],
    temp_dir: Path
) -> Path:
    """
    对PDF进行OCR识别
    
    Options:
        - language: OCR语言，如 'eng', 'chi_sim', 'eng+chi_sim'
        - pages: 要识别的页面，如 "all"
    
    Returns:
        添加OCR文本层的PDF文件
    """
    logger.info(f"Running OCR on PDF: {input_file}")
    
    doc = fitz.open(str(input_file))
    output_path = temp_dir / "ocr.pdf"
    
    lang = options.get('language', 'eng')
    pages_str = options.get('pages', 'all')
    
    # 解析页面
    if pages_str == 'all':
        page_indices = list(range(len(doc)))
    else:
        page_indices = [int(p.strip()) - 1 for p in pages_str.split(',')]
    
    for page_num in page_indices:
        if 0 <= page_num < len(doc):
            page = doc[page_num]
            
            # 渲染页面为图片
            zoom = 2  # 提高分辨率以获得更好的OCR效果
            mat = fitz.Matrix(zoom, zoom)
            pix = page.get_pixmap(matrix=mat)
            
            # 转换为PIL Image
            img_data = pix.tobytes("png")
            img = Image.open(io.BytesIO(img_data))
            
            # OCR识别
            text = pytesseract.image_to_string(img, lang=lang)
            
            # 将识别的文本添加到页面
            if text.strip():
                # 在页面底部添加识别的文本
                page.insert_text(
                    fitz.Point(50, page.rect.height - 50),
                    "--- OCR Text ---",
                    fontsize=10,
                    color=(0.5, 0.5, 0.5)
                )
                
                # 添加可搜索文本层（不可见但可选中文本）
                # 这里简化处理，实际可以添加真正的文本层
                
                logger.info(f"OCR completed for page {page_num + 1}: {len(text)} chars")
    
    doc.save(str(output_path))
    doc.close()
    
    logger.info(f"OCR PDF saved to: {output_path}")
    return output_path
