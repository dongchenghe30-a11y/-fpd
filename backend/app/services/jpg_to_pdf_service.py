"""
图片转PDF服务
"""
import img2pdf
from pathlib import Path
from typing import List
from PIL import Image
import io
from loguru import logger


async def convert_to_pdf(
    input_files: List[Path],
    temp_dir: Path
) -> Path:
    """
    将图片转换为PDF
    
    Args:
        input_files: 图片文件路径列表
        temp_dir: 临时目录
    
    Returns:
        转换后的PDF文件
    """
    logger.info(f"Converting {len(input_files)} images to PDF")
    
    output_path = temp_dir / "converted.pdf"
    
    # 收集所有图片数据
    image_data_list = []
    
    for img_path in input_files:
        try:
            # 打开图片
            with Image.open(str(img_path)) as img:
                # 转换为RGB（如果是RGBA或灰度）
                if img.mode not in ('RGB', 'L'):
                    img = img.convert('RGB')
                
                # 保存到字节缓冲区
                buffer = io.BytesIO()
                img.save(buffer, format='JPEG')
                image_data_list.append(buffer.getvalue())
                
                logger.info(f"Processed: {img_path.name}")
        except Exception as e:
            logger.error(f"Failed to process {img_path}: {e}")
            raise
    
    # 转换为PDF
    with open(str(output_path), 'wb') as f:
        f.write(img2pdf.convert(image_data_list))
    
    logger.info(f"PDF saved to: {output_path}")
    return output_path
