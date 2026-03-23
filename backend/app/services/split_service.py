"""
PDF分段服务
"""
import fitz
from pathlib import Path
from typing import Dict, Any
from loguru import logger


async def split_pdf(
    input_file: Path,
    options: Dict[str, Any],
    temp_dir: Path
) -> Path:
    """
    拆分PDF文件
    
    Options:
        - mode: 'ranges' | 'every' | 'single'
        - ranges: 页码范围，如 "1-3,5,7-10"
        - every: 每N页一份
        - single_page: 拆分为单页PDF
    
    Returns:
        拆分后的PDF文件
    """
    logger.info(f"Splitting PDF: {input_file}")
    
    doc = fitz.open(str(input_file))
    total_pages = len(doc)
    
    mode = options.get('mode', 'ranges')
    output_path = temp_dir / "split.pdf"
    
    output_doc = fitz.open()
    
    if mode == 'ranges':
        # 按范围拆分
        ranges = options.get('ranges', '1')
        pages_to_extract = parse_page_ranges(ranges, total_pages)
        
        for page_num in pages_to_extract:
            if 0 <= page_num < total_pages:
                output_doc.insert_pdf(doc, from_page=page_num, to_page=page_num)
    
    elif mode == 'every':
        # 每N页一份
        every = int(options.get('every', 1))
        for i in range(0, total_pages, every):
            output_doc.insert_pdf(doc, from_page=i, to_page=min(i + every - 1, total_pages - 1))
    
    elif mode == 'single':
        # 拆分为单页
        single_mode = options.get('single_page', 1)
        if 0 <= single_mode - 1 < total_pages:
            output_doc.insert_pdf(doc, from_page=single_mode - 1, to_page=single_mode - 1)
        else:
            raise ValueError(f"Page {single_mode} not found in document")
    
    doc.close()
    output_doc.save(str(output_path))
    output_doc.close()
    
    return output_path


def parse_page_ranges(ranges_str: str, total_pages: int) -> List[int]:
    """解析页码范围字符串"""
    pages = []
    for part in ranges_str.split(','):
        part = part.strip()
        if '-' in part:
            start, end = part.split('-')
            pages.extend(range(int(start) - 1, int(end)))
        else:
            pages.append(int(part) - 1)
    return pages
