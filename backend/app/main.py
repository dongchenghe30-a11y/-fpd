"""
PDF Tools Global - FastAPI Backend
高性能PDF处理后端
"""

import os
import tempfile
import shutil
from contextlib import asynccontextmanager
from pathlib import Path
from typing import Dict, Any, Optional
import asyncio

from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from loguru import logger
import nest_asyncio

# 允许 asyncio 在 Jupyter/某些环境中运行
nest_asyncio.apply()

# 导入服务
from app.services import (
    merge_service,
    split_service,
    compress_service,
    rotate_service,
    watermark_service,
    protect_service,
    unlock_service,
    extract_service,
    pdf_to_jpg_service,
    pdf_to_word_service,
    jpg_to_pdf_service,
    ocr_service,
    compare_service,
)

# 配置日志
log_level = os.getenv("LOG_LEVEL", "INFO")
logger.add(
    sink=sys.stderr,
    level=log_level,
    format="<green>{time:YYYY-MM-DD HH:mm:ss}</green> | <level>{level: <8}</level> | <cyan>{name}</cyan>:<cyan>{function}</cyan> - <level>{message}</level>",
)

# 临时文件清理配置
TEMP_DIR = tempfile.gettempdir()
MAX_FILE_SIZE = 100 * 1024 * 1024  # 100MB


@asynccontextmanager
async def lifespan(app: FastAPI):
    """应用生命周期管理"""
    logger.info("🚀 PDF Tools Global Backend Starting...")
    logger.info(f"📁 Temp directory: {TEMP_DIR}")
    yield
    logger.info("🛑 PDF Tools Global Backend Shutting Down...")


# 创建FastAPI应用
app = FastAPI(
    title="PDF Tools Global API",
    description="""
    全球免费PDF工具站后端API
    
    ## 功能
    - 29个PDF处理功能
    - 自动清理临时文件
    - 支持大文件处理
    
    ## 安全
    - 文件不上传服务器
    - 临时文件自动清理
    - 无日志记录
    """,
    version="1.0.0",
    lifespan=lifespan,
)

# CORS配置
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 生产环境应该限制具体域名
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# 健康检查
@app.get("/health")
async def health_check():
    """健康检查端点"""
    return {
        "status": "healthy",
        "service": "pdf-tools-global",
        "version": "1.0.0",
    }


# 主处理端点
@app.post("/api/v1/process")
async def process_pdf(
    action: str = Form(...),
    file_0: Optional[UploadFile] = File(None),
    file_1: Optional[UploadFile] = File(None),
    file_2: Optional[UploadFile] = File(None),
    file_3: Optional[UploadFile] = File(None),
    file_4: Optional[UploadFile] = File(None),
    options: Optional[str] = Form(None),
):
    """
    统一PDF处理入口
    
    Args:
        action: 操作类型 (merge, split, compress, etc.)
        file_0 ~ file_4: 上传的文件 (最多5个)
        options: JSON格式的额外选项
    """
    try:
        # 收集上传的文件
        files = [f for f in [file_0, file_1, file_2, file_3, file_4] if f is not None]
        
        if not files:
            raise HTTPException(status_code=400, detail="No files uploaded")
        
        # 验证文件大小
        for file in files:
            if file.size and file.size > MAX_FILE_SIZE:
                raise HTTPException(
                    status_code=413,
                    detail=f"File {file.filename} exceeds maximum size of 100MB"
                )
        
        # 解析选项
        import json
        opt_dict = {}
        if options:
            try:
                opt_dict = json.loads(options)
            except json.JSONDecodeError:
                logger.warning(f"Invalid options format: {options}")
        
        # 创建临时工作目录
        with tempfile.TemporaryDirectory(prefix="pdf_tools_") as temp_dir:
            temp_path = Path(temp_dir)
            saved_files = []
            
            # 保存上传的文件
            for i, file in enumerate(files):
                file_path = temp_path / f"input_{i}_{file.filename}"
                with open(file_path, "wb") as buffer:
                    shutil.copyfileobj(file.file, buffer)
                saved_files.append(file_path)
                logger.info(f"Saved: {file_path}")
            
            # 根据action执行对应服务
            output_path = await execute_action(action, saved_files, opt_dict, temp_path)
            
            if output_path is None:
                raise HTTPException(status_code=500, detail="Processing failed")
            
            # 返回文件
            return FileResponse(
                path=output_path,
                filename=output_path.name,
                media_type="application/pdf",
            )
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Processing error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


async def execute_action(
    action: str,
    input_files: list[Path],
    options: Dict[str, Any],
    temp_dir: Path,
) -> Optional[Path]:
    """
    根据action执行对应的PDF处理服务
    """
    logger.info(f"Executing action: {action} with {len(input_files)} files")
    
    try:
        # 组织PDF
        if action == "merge":
            return await merge_service.merge_pdfs(input_files, temp_dir)
        
        elif action == "split":
            return await split_service.split_pdf(input_files[0], options, temp_dir)
        
        elif action == "remove_pages":
            return await extract_service.remove_pages(input_files[0], options, temp_dir)
        
        elif action == "extract_pages":
            return await extract_service.extract_pages(input_files[0], options, temp_dir)
        
        # 优化PDF
        elif action == "compress":
            return await compress_service.compress_pdf(input_files[0], options, temp_dir)
        
        elif action == "ocr":
            return await ocr_service.ocr_pdf(input_files[0], options, temp_dir)
        
        # 转换到PDF
        elif action == "jpg_to_pdf":
            return await jpg_to_pdf_service.convert_to_pdf(input_files, temp_dir)
        
        # 从PDF转换
        elif action == "pdf_to_jpg":
            return await pdf_to_jpg_service.convert_to_images(input_files[0], options, temp_dir)
        
        elif action == "pdf_to_word":
            return await pdf_to_word_service.convert_to_docx(input_files[0], temp_dir)
        
        # 编辑PDF
        elif action == "rotate":
            return await rotate_service.rotate_pdf(input_files[0], options, temp_dir)
        
        elif action == "watermark":
            return await watermark_service.add_watermark(input_files[0], options, temp_dir)
        
        # 安全
        elif action == "protect":
            return await protect_service.protect_pdf(input_files[0], options, temp_dir)
        
        elif action == "unlock":
            return await unlock_service.unlock_pdf(input_files[0], options, temp_dir)
        
        elif action == "compare":
            return await compare_service.compare_pdfs(input_files, temp_dir)
        
        else:
            logger.error(f"Unknown action: {action}")
            return None
    
    except Exception as e:
        logger.error(f"Action {action} failed: {e}")
        raise


# 直接运行
if __name__ == "__main__":
    import sys
    logger.info("Starting PDF Tools Global Backend...")
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info",
    )
