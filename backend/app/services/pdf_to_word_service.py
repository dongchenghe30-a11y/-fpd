"""
PDF转Word服务
"""
import fitz
from pathlib import Path
from docx import Document
from loguru import logger


async def convert_to_docx(
    input_file: Path,
    temp_dir: Path
) -> Path:
    """
    将PDF转换为Word文档
    
    Returns:
        转换后的DOCX文件
    """
    logger.info(f"Converting PDF to Word: {input_file}")
    
    doc = fitz.open(str(input_file))
    output_path = temp_dir / "converted.docx"
    
    # 创建Word文档
    word_doc = Document()
    
    for page_num in range(len(doc)):
        page = doc[page_num]
        
        # 获取文本
        text = page.get_text()
        
        if text.strip():
            # 添加段落
            for paragraph_text in text.split('\n'):
                if paragraph_text.strip():
                    p = word_doc.add_paragraph(paragraph_text.strip())
        
        # 如果是最后一页，可能需要分节符
        if page_num < len(doc) - 1:
            word_doc.add_page_break()
    
    doc.close()
    word_doc.save(str(output_path))
    
    logger.info(f"Converted DOCX saved to: {output_path}")
    return output_path
