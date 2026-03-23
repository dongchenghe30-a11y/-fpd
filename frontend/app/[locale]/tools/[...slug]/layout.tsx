import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const toolSlug = Array.isArray(slug) ? slug[0] : slug;
  
  // 工具 slug 到名称的映射
  const toolNames: Record<string, Record<string, string>> = {
    en: {
      'merge': 'Merge PDF',
      'split': 'Split PDF',
      'remove-pages': 'Remove Pages',
      'extract-pages': 'Extract Pages',
      'organize': 'Organize PDF',
      'scan-to-pdf': 'Scan to PDF',
      'compress': 'Compress PDF',
      'repair': 'Repair PDF',
      'ocr': 'OCR PDF',
      'jpg-to-pdf': 'JPG to PDF',
      'word-to-pdf': 'Word to PDF',
      'ppt-to-pdf': 'PPT to PDF',
      'excel-to-pdf': 'Excel to PDF',
      'html-to-pdf': 'HTML to PDF',
      'pdf-to-jpg': 'PDF to JPG',
      'pdf-to-word': 'PDF to Word',
      'pdf-to-ppt': 'PDF to PPT',
      'pdf-to-excel': 'PDF to Excel',
      'pdf-to-pdfa': 'PDF/A Archive',
      'rotate': 'Rotate PDF',
      'page-numbers': 'Add Page Numbers',
      'watermark': 'Add Watermark',
      'crop': 'Crop PDF',
      'edit': 'Edit PDF',
      'unlock': 'Unlock PDF',
      'protect': 'Protect PDF',
      'sign': 'Sign PDF',
      'redact': 'Redact PDF',
      'compare': 'Compare PDF',
    },
    zh: {
      'merge': '合并 PDF',
      'split': '分割 PDF',
      'remove-pages': '删除页面',
      'extract-pages': '提取页面',
      'organize': '整理 PDF',
      'scan-to-pdf': '扫描为 PDF',
      'compress': '压缩 PDF',
      'repair': '修复 PDF',
      'ocr': 'PDF OCR 识别',
      'jpg-to-pdf': 'JPG 转 PDF',
      'word-to-pdf': 'Word 转 PDF',
      'ppt-to-pdf': 'PPT 转 PDF',
      'excel-to-pdf': 'Excel 转 PDF',
      'html-to-pdf': 'HTML 转 PDF',
      'pdf-to-jpg': 'PDF 转 JPG',
      'pdf-to-word': 'PDF 转 Word',
      'pdf-to-ppt': 'PDF 转 PPT',
      'pdf-to-excel': 'PDF 转 Excel',
      'pdf-to-pdfa': 'PDF/A 归档',
      'rotate': '旋转 PDF',
      'page-numbers': '添加页码',
      'watermark': '添加水印',
      'crop': '裁剪 PDF',
      'edit': '编辑 PDF',
      'unlock': '解锁 PDF',
      'protect': '保护 PDF',
      'sign': '签名 PDF',
      'redact': '涂黑 PDF',
      'compare': '比较 PDF',
    },
  };

  const toolName = toolNames[locale]?.[toolSlug] || toolNames.en[toolSlug] || 'PDF Tool';
  
  const titles: Record<string, string> = {
    en: `${toolName} - Free PDF Tools Online`,
    zh: `${toolName} - 免费 PDF 工具在线`,
  };
  
  const descriptions: Record<string, string> = {
    en: `Use our free ${toolName.toLowerCase()} tool. No registration required. Fast, secure, and completely free.`,
    zh: `使用我们的免费 ${toolName} 工具。无需注册。快速、安全、完全免费。`,
  };
  
  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
  };
}

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
