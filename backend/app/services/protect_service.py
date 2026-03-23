"""
PDF加密/保护服务
"""
import fitz
from pathlib import Path
from typing import Dict, Any
from loguru import logger


async def protect_pdf(
    input_file: Path,
    options: Dict[str, Any],
    temp_dir: Path
) -> Path:
    """
    保护/加密PDF
    
    Options:
        - password: 密码
        - permissions: 权限 (print, copy, modify, annotate)
    
    Returns:
        加密后的PDF文件
    """
    logger.info(f"Protecting PDF: {input_file}")
    
    doc = fitz.open(str(input_file))
    output_path = temp_dir / "protected.pdf"
    
    password = options.get('password', '')
    
    if not password:
        raise ValueError("Password is required for protection")
    
    # 设置权限
    permissions = fitz.PDF_PERM_PRINT | fitz.PDF_PERM_MODIFY | fitz.PDF_PERM_COPY
    
    # 加密并保存
    doc.save(
        str(output_path),
        encryption=fitz.PDF_ENCRYPT_AES_256,  # AES-256加密
        user_password=password,
        owner_password=password,
        permissions=permissions,
    )
    doc.close()
    
    logger.info(f"Protected PDF saved to: {output_path}")
    return output_path
