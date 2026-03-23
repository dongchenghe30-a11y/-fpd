"""
PDF合并服务
"""
import fitz  # PyMuPDF
from pathlib import Path
from typing import List
from loguru import logger


async def merge_pdfs(
    input_files: List[Path],
    temp_dir: Path
) -> Path:
    """
    合并多个PDF文件
    
    Args:
        input_files: PDF文件路径列表
        temp_dir: 临时目录
    
    Returns:
        合并后的PDF文件路径
    """
    logger.info(f"Merging {len(input_files)} PDF files")
    
    # 创建输出文件
    output_path = temp_dir / "merged.pdf"
    
    # 创建新的PDF文档
    output_doc = fitz.open()
    
    for file_path in input_files:
        try:
            # 打开源PDF
            src_doc = fitz.open(str(file_path))
            
            # 插入所有页面
            output_doc.insert_pdf(src_doc)
            
            src_doc.close()
            logger.info(f"Added: {file_path.name}")
        except Exception as e:
            logger.error(f"Failed to merge {file_path}: {e}")
            raise
    
    # 保存合并后的PDF
    output_doc.save(str(output_path))
    output_doc.close()
    
    logger.info(f"Merged PDF saved to: {output_path}")
    return output_path
