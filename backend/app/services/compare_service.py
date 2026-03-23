"""
PDF比较服务
"""
import fitz
from pathlib import Path
import zipfile
from typing import List
from loguru import logger


async def compare_pdfs(
    input_files: List[Path],
    temp_dir: Path
) -> Path:
    """
    比较两个PDF文件
    
    Args:
        input_files: 两个PDF文件
    
    Returns:
        比较结果文件（ZIP包）
    """
    if len(input_files) < 2:
        raise ValueError("Two PDF files required for comparison")
    
    logger.info(f"Comparing PDFs: {input_files[0].name} and {input_files[1].name}")
    
    doc1 = fitz.open(str(input_files[0]))
    doc2 = fitz.open(str(input_files[1]))
    
    # 创建比较结果
    output_path = temp_dir / "comparison"
    output_path.mkdir(exist_ok=True)
    
    report_file = output_path / "comparison_report.txt"
    
    with open(str(report_file), 'w', encoding='utf-8') as f:
        f.write("PDF Comparison Report\n")
        f.write("=" * 50 + "\n\n")
        
        # 基本信息
        f.write(f"File 1: {input_files[0].name}\n")
        f.write(f"  Pages: {len(doc1)}\n")
        f.write(f"\nFile 2: {input_files[1].name}\n")
        f.write(f"  Pages: {len(doc2)}\n")
        
        # 页面比较
        f.write("\n" + "=" * 50 + "\n")
        f.write("Page-by-Page Comparison:\n")
        f.write("=" * 50 + "\n\n")
        
        max_pages = max(len(doc1), len(doc2))
        
        for i in range(max_pages):
            f.write(f"--- Page {i + 1} ---\n")
            
            text1 = ""
            text2 = ""
            
            if i < len(doc1):
                text1 = doc1[i].get_text()
            else:
                f.write("File 1: [Page does not exist]\n")
                
            if i < len(doc2):
                text2 = doc2[i].get_text()
            else:
                f.write("File 2: [Page does not exist]\n")
            
            if text1 and text2:
                if text1 == text2:
                    f.write("Status: Identical\n")
                else:
                    # 简单比较 - 词数
                    words1 = set(text1.split())
                    words2 = set(text2.split())
                    
                    common = len(words1 & words2)
                    only1 = len(words1 - words2)
                    only2 = len(words2 - words1)
                    
                    similarity = common / max(len(words1), len(words2)) * 100
                    
                    f.write(f"Status: Different\n")
                    f.write(f"Similarity: {similarity:.1f}%\n")
                    f.write(f"Common words: {common}\n")
                    f.write(f"Only in File 1: {only1}\n")
                    f.write(f"Only in File 2: {only2}\n")
            
            f.write("\n")
    
    doc1.close()
    doc2.close()
    
    # 打包结果
    zip_path = temp_dir / "comparison_result.zip"
    
    with zipfile.ZipFile(str(zip_path), 'w', zipfile.ZIP_DEFLATED) as zipf:
        zipf.write(str(report_file), "comparison_report.txt")
    
    logger.info(f"Comparison saved to: {zip_path}")
    return zip_path
