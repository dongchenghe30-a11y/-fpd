'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FileUploader from '@/components/FileUploader';
import LoadingOverlay from '@/components/LoadingOverlay';
import Toast, { useToast } from '@/components/Toast';
import { processPdf } from '@/lib/api';
import { downloadBlob } from '@/lib/utils';
import {
  ArrowLeft,
  Settings,
  Download,
  FileText,
  FileDown,
} from 'lucide-react';

export default function ToolPage() {
  const t = useTranslations('tools');
  const tUpload = useTranslations('upload');
  const tToolPage = useTranslations('toolPage');
  const params = useParams();

  // [...slug] 是 catch-all 路由，params.slug 是 string[]，取第一段即为工具名
  const slugArr = params.slug as string[];
  const slug = Array.isArray(slugArr) ? slugArr[0] : slugArr;
  const locale = params.locale as string || 'en';

  // 状态
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast, showToast, hideToast } = useToast();

  // 根据 slug 映射到 i18n key（如 pdf-to-word → pdfToWord）
  const slugToToolId = (s: string): string => {
    const map: Record<string, string> = {
      'merge': 'merge',
      'split': 'split',
      'remove-pages': 'removePages',
      'extract-pages': 'extractPages',
      'organize': 'organize',
      'scan-to-pdf': 'scanToPdf',
      'compress': 'compress',
      'repair': 'repair',
      'ocr': 'ocr',
      'jpg-to-pdf': 'jpgToPdf',
      'word-to-pdf': 'wordToPdf',
      'ppt-to-pdf': 'pptToPdf',
      'excel-to-pdf': 'excelToPdf',
      'html-to-pdf': 'htmlToPdf',
      'pdf-to-jpg': 'pdfToJpg',
      'pdf-to-word': 'pdfToWord',
      'pdf-to-ppt': 'pdfToPpt',
      'pdf-to-excel': 'pdfToExcel',
      'pdf-to-pdfa': 'pdfToPdfa',
      'rotate': 'rotate',
      'page-numbers': 'pageNumbers',
      'watermark': 'watermark',
      'crop': 'crop',
      'edit': 'edit',
      'unlock': 'unlock',
      'protect': 'protect',
      'sign': 'sign',
      'redact': 'redact',
      'compare': 'compare',
    };
    return map[s] || s;
  };

  const toolId = slugToToolId(slug);
  const toolName = t(`${toolId}.name`);
  const toolDesc = t(`${toolId}.description`);
  
  // 文件大小限制
  const maxSize = 100; // MB
  const acceptTypes = getAcceptTypes(slug);

  // 处理文件上传
  const handleFilesSelected = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
  };

  // 处理PDF
  const handleProcess = async () => {
    if (files.length === 0) {
      showToast(tToolPage('selectFirst'), 'error');
      return;
    }

    setIsLoading(true);
    setProgress(0);

    try {
      // 模拟进度
      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 10, 90));
      }, 200);

      const result = await processPdf({
        action: slugToAction(slug),
        files: files,
        options: {},
      });

      clearInterval(progressInterval);
      setProgress(100);

      if (result.success && result.data) {
        // 生成输出文件名
        const outputName = generateOutputName(files[0].name, slug);
        downloadBlob(result.data, outputName);
        showToast(tUpload('success'), 'success');
      } else {
        showToast(result.error || tUpload('error'), 'error');
      }
    } catch (error) {
      showToast(tUpload('error'), 'error');
    } finally {
      setIsLoading(false);
      setProgress(0);
    }
  };

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-50 py-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <a
            href={`/${locale}#tools`}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            {tToolPage('backToTools')}
          </a>

          {/* Tool Header */}
          <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                <FileText className="w-7 h-7 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {toolName}
                </h1>
                <p className="text-gray-600">
                  {toolDesc}
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{tToolPage('free')}</p>
                <p className="text-sm text-gray-500">{tToolPage('freeDesc')}</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{tToolPage('secure')}</p>
                <p className="text-sm text-gray-500">{tToolPage('secureDesc')}</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{tToolPage('fast')}</p>
                <p className="text-sm text-gray-500">{tToolPage('fastDesc')}</p>
              </div>
            </div>
          </div>

          {/* File Upload Section */}
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              {tUpload('title')}
            </h2>

            <FileUploader
              onFilesSelected={handleFilesSelected}
              accept={acceptTypes}
              multiple={supportsMultiple(slug)}
              maxSize={maxSize}
            />

            {/* Process Button */}
            <div className="mt-8">
              <button
                onClick={handleProcess}
                disabled={files.length === 0 || isLoading}
                className={`
                  w-full py-4 rounded-xl font-semibold text-lg
                  flex items-center justify-center gap-2
                  transition-all duration-200
                  ${
                    files.length === 0 || isLoading
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                  }
                `}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {tUpload('processing')}
                  </>
                ) : (
                  <>
                    <Settings className="w-5 h-5" />
                    {files.length > 0 
                      ? tToolPage({ key: 'processBtnCount', count: files.length })
                      : tToolPage('processBtn')}
                  </>
                )}
              </button>
            </div>

            {/* Selected Files Info */}
            {files.length > 0 && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FileDown className="w-4 h-4" />
                  <span>
                    {tToolPage({ key: 'filesSelected', count: files.length, max: maxSize })}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8 mt-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              {tToolPage('howItWorks')}
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h3 className="font-medium text-gray-900 mb-2">{tToolPage('step1Title')}</h3>
                <p className="text-sm text-gray-600">
                  {tToolPage('step1Desc')}
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold">2</span>
                </div>
                <h3 className="font-medium text-gray-900 mb-2">{tToolPage('step2Title')}</h3>
                <p className="text-sm text-gray-600">
                  {tToolPage('step2Desc')}
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold">3</span>
                </div>
                <h3 className="font-medium text-gray-900 mb-2">{tToolPage('step3Title')}</h3>
                <p className="text-sm text-gray-600">
                  {tToolPage('step3Desc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <LoadingOverlay isLoading={isLoading} progress={progress} />
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />

      <Footer />
    </>
  );
}

// 工具函数
function slugToAction(slug: string): string {
  const actionMap: Record<string, string> = {
    'merge': 'merge',
    'split': 'split',
    'remove-pages': 'remove_pages',
    'extract-pages': 'extract_pages',
    'compress': 'compress',
    'rotate': 'rotate',
    'watermark': 'watermark',
    'ocr': 'ocr',
    'jpg-to-pdf': 'jpg_to_pdf',
    'pdf-to-jpg': 'pdf_to_jpg',
    'word-to-pdf': 'word_to_pdf',
    'pdf-to-word': 'pdf_to_word',
    'protect': 'protect',
    'unlock': 'unlock',
    'sign': 'sign',
    'compare': 'compare',
  };
  return actionMap[slug] || slug.replace(/-/g, '_');
}

function getAcceptTypes(slug: string): string {
  if (slug.includes('jpg-to-pdf') || slug.includes('image')) {
    return '.jpg,.jpeg,.png,.gif,.bmp,.webp';
  }
  if (slug.includes('word-to-pdf')) {
    return '.doc,.docx';
  }
  if (slug.includes('excel-to-pdf')) {
    return '.xls,.xlsx';
  }
  if (slug.includes('ppt-to-pdf')) {
    return '.ppt,.pptx';
  }
  return '.pdf';
}

function supportsMultiple(slug: string): boolean {
  const multipleTools = ['merge', 'jpg-to-pdf', 'word-to-pdf'];
  return multipleTools.includes(slug);
}

function generateOutputName(originalName: string, tool: string): string {
  const baseName = originalName.replace(/\.[^/.]+$/, '');
  const extensions: Record<string, string> = {
    'merge': '.pdf',
    'split': '.pdf',
    'compress': '_compressed.pdf',
    'rotate': '_rotated.pdf',
    'watermark': '_watermarked.pdf',
    'ocr': '_ocr.pdf',
    'jpg-to-pdf': '.pdf',
    'pdf-to-jpg': '.jpg',
    'pdf-to-word': '.docx',
  };
  const ext = extensions[tool] || '.pdf';
  return `${baseName}${ext}`;
}
