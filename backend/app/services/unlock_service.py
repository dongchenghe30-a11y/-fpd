"""
PDF解锁/解密服务
"""
import fitz
from pathlib import Path
from typing import Dict, Any
from loguru import logger


async def unlock_pdf(
    input_file: Path,
    options: Dict[str, Any],
    temp_dir: Path
) -> Path:
    """
    解锁/解密PDF
    
    Options:
        - password: 密码（如果有）
    
    Returns:
        解锁后的PDF文件
    """
    logger.info(f"Unlocking PDF: {input_file}")
    
    doc = fitz.open(str(input_file), password=options.get('password', ''))
    output_path = temp_dir / "unlocked.pdf"
    
    # 检查是否需要密码
    if doc.is_encrypted:
        if not doc.authenticate(options.get('password', '')):
            doc.close()
            raise ValueError("Invalid password")
    
    # 保存为无加密版本
    doc.save(str(output_path), encryption=fitz.PDF_ENCRYPT_NONE)
    doc.close()
    
    logger.info(f"Unlocked PDF saved to: {output_path}")
    return output_path
