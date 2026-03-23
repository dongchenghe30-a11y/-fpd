// API 基础配置
const API_BASE_URL = '/api/v1';

export interface ProcessOptions {
  action: string;
  files: File[];
  options?: Record<string, any>;
}

export interface ApiResponse {
  success: boolean;
  data?: Blob;
  error?: string;
}

/**
 * 上传文件并处理
 */
export async function processPdf({
  action,
  files,
  options = {},
}: ProcessOptions): Promise<ApiResponse> {
  try {
    const formData = new FormData();
    formData.append('action', action);
    
    // 添加所有文件
    files.forEach((file, index) => {
      formData.append(`file_${index}`, file);
    });
    
    // 添加选项
    Object.entries(options).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    const response = await fetch(`${API_BASE_URL}/process`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errorData.detail || `HTTP ${response.status}: ${response.statusText}`,
      };
    }

    // 返回二进制流
    const blob = await response.blob();
    return {
      success: true,
      data: blob,
    };
  } catch (error) {
    console.error('PDF processing error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error',
    };
  }
}

/**
 * 带进度回调的文件处理
 */
export async function processPdfWithProgress(
  { action, files, options = {} }: ProcessOptions,
  onProgress?: (progress: number) => void
): Promise<ApiResponse> {
  return new Promise((resolve) => {
    // 模拟进度（实际进度需要后端支持）
    let progress = 0;
    const interval = setInterval(() => {
      progress = Math.min(progress + 10, 90);
      onProgress?.(progress);
    }, 200);

    processPdf({ action, files, options }).then((result) => {
      clearInterval(interval);
      onProgress?.(100);
      resolve(result);
    });
  });
}

// 导出所有支持的操作
export const PDF_ACTIONS = {
  // 组织
  MERGE: 'merge',
  SPLIT: 'split',
  REMOVE_PAGES: 'remove_pages',
  EXTRACT_PAGES: 'extract_pages',
  ORGANIZE: 'organize',
  SCAN_TO_PDF: 'scan_to_pdf',
  
  // 优化
  COMPRESS: 'compress',
  REPAIR: 'repair',
  OCR: 'ocr',
  
  // 转换到PDF
  JPG_TO_PDF: 'jpg_to_pdf',
  WORD_TO_PDF: 'word_to_pdf',
  PPT_TO_PDF: 'ppt_to_pdf',
  EXCEL_TO_PDF: 'excel_to_pdf',
  HTML_TO_PDF: 'html_to_pdf',
  
  // 从PDF转换
  PDF_TO_JPG: 'pdf_to_jpg',
  PDF_TO_WORD: 'pdf_to_word',
  PDF_TO_PPT: 'pdf_to_ppt',
  PDF_TO_EXCEL: 'pdf_to_excel',
  PDF_TO_PDFA: 'pdf_to_pdfa',
  
  // 编辑
  ROTATE: 'rotate',
  PAGE_NUMBERS: 'page_numbers',
  WATERMARK: 'watermark',
  CROP: 'crop',
  EDIT: 'edit',
  
  // 安全
  UNLOCK: 'unlock',
  PROTECT: 'protect',
  SIGN: 'sign',
  REDACT: 'redact',
  COMPARE: 'compare',
} as const;

export type PdfAction = typeof PDF_ACTIONS[keyof typeof PDF_ACTIONS];
