"""
PDF页面提取/删除服务
"""
import fitz
from pathlib import Path
from typing import Dict, Any, List
from loguru import logger


async def extract_pages(
    input_file: Path,
    options: Dict[str, Any],
    temp_dir: Path
) -> Path:
    """
    提取PDF页面
    
    Options:
        - pages: 要提取的页面，如 "1,3,5-7"
    
    Returns:
        提取页面后的PDF文件
    """
    logger.info(f"Extracting pages from: {input_file}")
    
    doc = fitz.open(str(input_file))
    output_path = temp_dir / "extracted.pdf"
    
    pages_str = options.get('pages', '1')
    pages = parse_page_ranges(pages_str, len(doc))
    
    output_doc = fitz.open()
    
    for page_num in pages:
        if 0 <= page_num < len(doc):
            output_doc.insert_pdf(doc, from_page=page_num, to_page=page_num)
    
    doc.close()
    output_doc.save(str(output_path))
    output_doc.close()
    
    return output_path


async def remove_pages(
    input_file: Path,
    options: Dict[str, Any],
    temp_dir: Path
) -> Path:
    """
    删除PDF页面
    
    Options:
        - pages: 要删除的页面，如 "2,4,6"
    
    Returns:
        删除页面后的PDF文件
    """
    logger.info(f"Removing pages from: {input_file}")
    
    doc = fitz.open(str(input_file))
    output_path = temp_dir / "removed.pdf"
    
    pages_str = options.get('pages', '')
    pages_to_remove = parse_page_ranges(pages_str, len(doc))
    
    # 从后往前删除（避免索引变化）
    for page_num in sorted(pages_to_remove, reverse=True):
        if 0 <= page_num < len(doc):
            doc.delete_page(page_num)
    
    doc.save(str(output_path))
    doc.close()
    
    return output_path


def parse_page_ranges(ranges_str: str, total_pages: int) -> List[int]:
    """解析页码范围字符串"""
    pages = []
    for part in ranges_str.split(','):
        part = part.strip()
        if not part:
            continue
        if '-' in part:
            start, end = part.split('-')
            pages.extend(range(int(start) - 1, int(end)))
        else:
            pages.append(int(part) - 1)
    return pages
